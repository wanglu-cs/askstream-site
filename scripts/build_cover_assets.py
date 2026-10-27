"""Build the animated cover from every supplied screenshot. Requires Pillow."""
from html import escape
from itertools import zip_longest
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'assets' / 'video'
OUT = ROOT / 'assets' / 'cover'
OUT.mkdir(exist_ok=True)

# Interleave case categories so nearby frames show different uncertainty sources.
folders = sorted(path for path in SOURCE.iterdir() if path.is_dir())
groups = [sorted(path for path in folder.rglob('*')
                 if path.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp'})
          for folder in folders]
sources = [path for batch in zip_longest(*groups) for path in batch if path]
manifest = []
for source in sources:
    name = '-'.join(source.relative_to(SOURCE).with_suffix('.webp').parts)
    with Image.open(source) as image:
        # Preserve the complete visual evidence, including portrait screenshots.
        frame = ImageOps.pad(image.convert('RGB'), (480, 270), color='#17151e')
        frame.save(OUT / name, quality=78, method=6)
    manifest.append({'source': source.relative_to(ROOT).as_posix(),
                     'cover': 'assets/cover/' + name})

rows = [manifest[index::3] for index in range(3)]
markup = '    <div class="cover-filmstrips" aria-hidden="true">\n'
for index, row in enumerate(rows, start=1):
    markup += f'      <div class="filmstrip filmstrip-{index}"><div class="filmstrip-track" style="--film-count:{len(row)}">\n'
    for _ in range(2):
        markup += '        <div class="filmstrip-group">\n'
        for item in row:
            markup += ('          <div class="film-frame"><img '
                       f'src="{escape(item["cover"])}" '
                       f'data-source="{escape(item["source"])}" '
                       'width="480" height="270" alt="" decoding="async"></div>\n')
        markup += '        </div>\n'
    markup += '      </div></div>\n'
markup += '    </div>\n'
page = ROOT / 'index.html'
html = page.read_text()
start = html.index('    <div class="cover-filmstrips"')
end = html.index('    <div class="cover-shade"', start)
page.write_text(html[:start] + markup + html[end:])
(OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Included all {len(sources)} screenshots across {len(rows)} filmstrips.')
