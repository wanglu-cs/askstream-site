"""Export the eight visually reviewed benchmark examples. Requires FFmpeg and Pillow.

Usage: python scripts/build_examples.py /path/to/ProactiveBenchmark
Video excerpts start at source time zero; no internal cuts or invented annotations.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import subprocess
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/examples'
SELECTION = [
    ('KVEM', 18, 2, 'Key Visual Evidence Missing', 'Video uncertainty', 'Explicit information', 'Burrito ingredients behind visual masks'),
    ('VIM', 22, 2, 'Viewpoint Information Missing', 'Video uncertainty', 'Explicit information', 'A bicycle workshop from multiple cameras'),
    ('ICM', 6, 1, 'Individual Concept Missing', 'Video uncertainty', 'Implicit information', 'Recognizing a user-defined character'),
    ('PACM', 1, 1, 'Personalized Action Concept Missing', 'Video uncertainty', 'Implicit information', 'Matching a personalized movement definition'),
    ('AUQ', 14, 2, 'Ambiguous User Question', 'User uncertainty', 'User intent', 'Identifying the intended conference speaker'),
    ('WUQ', 26, 1, 'Wrong User Question', 'User uncertainty', 'User intent', 'Correcting a false premise in a cooking video'),
    ('UPM', 20, 3, 'User Preference Missing', 'User uncertainty', 'User preference', 'Choosing outfits after asking about preferences'),
    ('UPC', 47, 3, 'User Preference Conflict', 'User uncertainty', 'User preference', 'Updating dining-chair preferences after moving'),
]


def run(args):
    subprocess.run(args, check=True, stdout=subprocess.DEVNULL)


def export(dataset):
    OUT.mkdir(parents=True, exist_ok=True)
    media_jobs, mappings, examples, annotations = {}, [], [], []

    def video(code, source, duration):
        key = (code, source, duration)
        if key not in media_jobs:
            folder = OUT / code.lower()
            folder.mkdir(exist_ok=True)
            name = '-'.join(Path(source).parts[2:])
            target = folder / name
            media_jobs[key] = (dataset/code/source, target, duration)
            mappings.append({'source': f'{code}/{source}', 'asset': target.relative_to(ROOT).as_posix(), 'start_s': 0, 'end_s': duration})
        return media_jobs[key][1].relative_to(ROOT).as_posix()

    def picture(code, source):
        target = OUT/code.lower()/('-'.join(Path(source).parts[2:]) + '.webp')
        with Image.open(dataset/code/source) as im:
            im = im.convert('RGB')
            im.thumbnail((800, 800))
            im.save(target, quality=86, method=6)
        mappings.append({'source': f'{code}/{source}', 'asset': target.relative_to(ROOT).as_posix()})
        return target.relative_to(ROOT).as_posix()

    for code, number, count, title, group, category, scene in SELECTION:
        annotation_path = dataset/code/f'{code}.json'
        source = json.loads(annotation_path.read_text())
        case = next(c for c in source['cases'] if c['video_id'] == f'{code}_{number:06}')
        turns = case['turns'][:count]
        duration = max((t['windows']['answering'] or t['windows']['asking'])['end_s'] for t in turns)
        views = {v['view_id']: v['uri'] for v in case['media']['views']}
        first_uri = views.get(turns[0]['metadata']['evaluation']['initial_view_id'], case['media']['uri'])
        main = video(code, first_uri, duration)
        item = dict(id=code.lower(), code=code, title=title, group=group, category=category,
                    scene=scene, sourceId=case['video_id'], sourceDataset=case['source']['dataset'],
                    sourceUrl=case['source'].get('url'), videoSrc=main, duration=duration,
                    sourceDuration=case['media']['duration_s'], simulated=False, turns=[])
        for t in turns:
            windows = t['windows']
            if code == 'ICM':
                # EventSpec.effective_asking uses a zero-length initial WAIT for
                # open ASK: aliases in the question can be requested immediately.
                start = t['query_time_s']
                frame = (windows['waiting'] or windows['asking'])['start_frame']
                windows = {**windows,
                           'waiting': {'start_s':start, 'end_s':start, 'start_frame':frame, 'end_frame':frame},
                           'asking': {**windows['asking'], 'start_s':start, 'start_frame':frame}}
            ask, answer = windows['asking'], windows['answering']
            correct_actions = [i for i,o in enumerate(t['ask']['options']) if o['option_id'] in t['ask']['correct_option_ids']]
            correct_answer = next((i for i,o in enumerate(t['answer']['options']) if o['option_id'] == t['answer']['correct_option_id']), None)
            initial = views.get(t['metadata']['evaluation']['initial_view_id'], case['media']['uri'])
            turn = dict(id=t['turn_id'], start=t['query_time_s'], end=min(t['time_range']['end_s'],duration),
                        ask=ask['start_s'], askEnd=ask['end_s'], answer=answer['start_s'] if answer else None,
                        answerEnd=answer['end_s'] if answer else None, windows=windows, query=t['query']['text'],
                        actionOptions=[o['text'] for o in t['ask']['options']],
                        answerOptions=[o['text'] for o in t['answer']['options']],
                        correctAction=correct_actions[0], correctActions=correct_actions, correctAnswer=correct_answer,
                        answerMode=t['answer']['mode'], referenceAnswer=t['answer']['reference_text'],
                        userReply='\n\n'.join(e['content'] for e in t['evidence']['text']),
                        historicalPreference=t['metadata']['evaluation'].get('historical_preference'),
                        videoSrc=video(code, initial, duration), evidence=[])
            if code == 'ICM':
                turn.update(actionMode='open', referenceAsk=t['ask']['reference_text'],
                            actionOptions=[], correctActions=[], correctAction=None,
                            sourceWindows=t['windows'])
            for e in t['evidence']['visual']:
                paths = e['uris']
                if e['kind'] == 'synchronized_view':
                    # Include every annotated valid camera, not only the first one.
                    paths = [views[o['target_view_id']] for o in t['ask']['options'] if o['option_id'] in t['ask']['correct_option_ids']]
                for uri in paths:
                    is_image = e['kind'] == 'image'
                    sync = e['timebase'] == 'absolute'
                    media_duration = duration if sync else None
                    asset = picture(code,uri) if is_image else video(code,uri,media_duration)
                    if code == 'VIM':
                        view_id = next(view_id for view_id,path in views.items() if path == uri)
                        label = f'Gold view · {view_id}'
                    else:
                        label = {'KVEM':'Revealed video', 'ICM':'Concept definition image',
                                 'PACM':'Action definition video'}[code]
                    turn['evidence'].append({'kind': 'image' if is_image else 'video', 'src':asset,
                                             'synchronized':sync, 'label':label})
            turn['answerImages'] = [picture(code,p) for p in t['metadata']['source_metadata'].get('option_images',[])]
            item['turns'].append(turn)
        poster = OUT/code.lower()/'poster.jpg'
        item['poster'] = poster.relative_to(ROOT).as_posix()
        examples.append(item)
        # Export only selected public annotation fields; omit runtime and judge configuration.
        annotations.append({'case_id':case['video_id'], 'source':case['source'],
                            'annotation_file':f'{code}/{code}.json',
                            'annotation_sha256':hashlib.sha256(annotation_path.read_bytes()).hexdigest(),
                            'source_duration_s':case['media']['duration_s'], 'excerpt_duration_s':duration,
                            'turns':[{**{k:t[k] for k in ['turn_id','query','query_time_s','time_range','windows','evidence']},
                                      **{k:{field:value for field,value in t[k].items() if field != 'judge'} for k in ['ask','answer']},
                                      'historical_preference':t['metadata']['evaluation'].get('historical_preference')}
                                     for t in turns]})
        if code == 'ICM':
            annotations[-1]['website_protocol'] = {
                'ask_mode':'open',
                'rule':'ICM open ASK is available at query activation, using zero-length initial WAIT. Answer windows are unchanged.',
                'turns':[{'turn_id':t['id'], 'windows':t['windows'], 'reference_ask':t['referenceAsk']} for t in item['turns']]}

    def encode(job):
        source, target, duration = job
        if target.exists():
            return
        cmd = ['ffmpeg','-v','error','-nostdin','-threads','2','-i',str(source)]
        if duration is not None:
            cmd += ['-t',str(duration)]
        cmd += ['-map','0:v:0','-map','0:a:0?','-vf',"scale=w='min(960,iw)':h='min(540,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,setsar=1",
                '-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-threads','2',
                '-c:a','aac','-b:a','80k','-movflags','+faststart','-map_metadata','-1',str(target)]
        run(cmd)
        print(f'Encoded {target.name}: {target.stat().st_size/1048576:.1f} MiB',flush=True)

    with ThreadPoolExecutor(max_workers=3) as pool:
        list(pool.map(encode, media_jobs.values()))
    for item in examples:
        first_turn = item['turns'][0]
        poster_time = first_turn.get('sourceWindows', first_turn['windows'])['asking']['start_s'] + 0.5
        run(['ffmpeg','-v','error','-y','-ss',str(poster_time),'-i',str(ROOT/item['videoSrc']),
             '-frames:v','1','-threads','1',str(ROOT/item['poster'])])
    (ROOT/'assets/examples-data.js').write_text('// Generated from reviewed benchmark annotations by scripts/build_examples.py.\nwindow.ASKSTREAM_EXAMPLES = '+json.dumps(examples,ensure_ascii=False,indent=2)+';\n')
    (OUT/'annotations.json').write_text(json.dumps(annotations,ensure_ascii=False,indent=2)+'\n')
    (OUT/'manifest.json').write_text(json.dumps({'timebase':'Original video seconds; excerpts start at zero and contain no internal cuts.',
        'media':mappings,'cases':[{'id':c['sourceId'],'turns':len(c['turns']),'duration_s':c['duration']} for c in examples]},indent=2)+'\n')
    print(f'Exported {len(examples)} cases, {sum(len(c["turns"]) for c in examples)} real turns.')


if __name__ == '__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('dataset',type=Path)
    export(parser.parse_args().dataset)
