"""Create small website assets from the supplied A.9 screenshots. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'cover'
OUT.mkdir(exist_ok=True)
SOURCES = {
    'visual-masked': 'MCVI/mask_all_asking_frame01.jpg',
    'visual-revealed': 'MCVI/correct_entity_asking_frame01.jpg',
    'view-initial': 'EgoExo/cam01_initial_162-174_frame01.jpg',
    'view-switched': 'EgoExo/cam02_gold_162-174_frame01.jpg',
    'concept-ask': 'PEARL/asking_frame01.jpg',
    'concept-evidence': 'PEARL/evidence_215s_frame01.jpg',
    'action-observe': 'blender/case_006_50s.jpg',
    'action-evidence': 'blender/case_006_evidence_frame_04.jpg',
    'intent-ask': 'QU/ask_frame01.png',
    'intent-answer': 'QU/answering_frame01.png',
    'premise-observe': 'FPV/wait_frame01.jpg',
    'premise-answer': 'FPV/answer_frame01.jpg',
    'preference-ask': 'preference_miss/asking_frame01.jpg',
    'preference-answer': 'preference_miss/answering_frame01.jpg',
    'preference-old': 'preference_pass/asking_frame01.png',
    'preference-updated': 'preference_pass/answering_frame01.png',
}
for name, source in SOURCES.items():
    with Image.open(ROOT / 'assets' / 'video' / source) as im:
        # Letterbox portrait sources to preserve their complete visual evidence.
        frame = ImageOps.pad(im.convert('RGB'), (480, 270), color='#17151e')
        frame.save(OUT / f'{name}.webp', quality=78, method=6)
print(f'Created {len(SOURCES)} cover frames')
