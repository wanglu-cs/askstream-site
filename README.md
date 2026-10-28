# AskStream

Project page for **AskStream: When and What to Ask Proactively under Uncertainty in Streaming Video Understanding**.

The design follows [MMR-V](https://mmr-v.github.io/): a dark, full-screen cover with a handwritten project name, followed by the paper information, abstract, leaderboard, benchmark introduction, construction pipeline, statistics, examples, analyses, and BibTeX.

## Local preview

```sh
python3 -m pip install RangeHTTPServer
python3 -m RangeHTTPServer 8000
```

Open <http://localhost:8000/>. HTTP byte-range support is needed for reliable video seeking; GitHub Pages provides it in production. No build step or JavaScript dependencies are required. Styles, scripts, figures, fonts, and example videos are served locally.

## Content and assets

- `index.html`: paper title, authors, affiliations, abstract, section content, resource links, and citation.
- `assets/style.css`: layout, responsive styles, and fonts.
- `assets/site.js`: results from paper Tables 2 and 6, evaluation setting switch, model filters, column sorting, and citation copying.
- `assets/examples-data.js`: eight real benchmark cases with 15 original interaction turns.
- `assets/examples/`: browser-ready video excerpts, reference evidence, option images, source annotations, and a provenance manifest.
- `assets/examples.js`: case/turn selection, annotated timeline, action and answer choices, and reference interactions.
- `assets/*.png`: figures cropped directly from `ICLR2027.pdf`.
- `ICLR2027.pdf`: downloadable paper.
- `assets/fonts/`: Dancing Script and Noto Sans with their SIL Open Font Licenses.
- `.nojekyll`: disables Jekyll processing on GitHub Pages.

The cover displays animated filmstrips made from all 92 supplied real screenshots in `assets/video/`, corresponding to the paper's A.9 study cases. The frames are optimized WebP assets in `assets/cover/`; originals remain unchanged. `assets/cover/manifest.json` records every original-to-cover mapping. All three filmstrips are visible on both desktop and mobile. No image-generation API is used. Visitors can pause the motion; reduced-motion preferences disable it, and animation pauses when the cover is offscreen.

The supplied `assets/icon.png` remains as source material; the page uses a text wordmark and the simple letter favicon. To rebuild cover frames after changing source materials, install Pillow and run `python3 scripts/build_cover_assets.py`.

Paper figures use transparent CSS backgrounds so their existing PNG transparency is preserved. Styles and scripts include a version query to refresh cached copies after this update.

The Examples section covers eight tasks with visually reviewed benchmark cases: KVEM_000018 (2 turns), VIM_000022 (2), ICM_000006 (1), PACM_000001 (1), AUQ_000014 (2), WUQ_000026 (1), UPM_000020 (3), and UPC_000047 (3). Excerpts start at original time zero and stop after the selected answer/ask window; no internal cuts or playback speed changes are applied. PACM uses the benchmark's original Blender animation. All other media comes from the corresponding benchmark cases.

Queries, options, correct option IDs, replies, and time windows are imported from the dataset without rewriting. Every task has a visible Evidence section below the main video and timeline, updated with the active turn independently of the reference-answer toggle. KVEM includes the annotated reveal stream; VIM uses each turn's initial camera and displays every valid gold camera with its camera ID; ICM includes its concept image and definition; PACM includes its motion-definition video. AUQ, WUQ, UPM, and UPC display the original user reply as their evidence. Preference examples include all answer images and UPC's historical preferences. AUQ retains open answers rather than invented multiple-choice options. For KVEM, VIM, and WUQ, the answer window depends on the correct ASK and evidence arrival (one evaluation tick later); the UI explicitly describes this instead of inventing fixed answer timestamps. Unannotated gaps are not labeled WAIT or ANSWER.

ICM is presented using the evaluator's open-ASK protocol: ASK starts at query activation (00:00 for this case), instead of the choice-mode visual identity matching boundary at 01:31. The question field requests the named concept definition; the original ANSWER window still starts at 01:40.50. The raw choice-mode annotations are preserved in the download alongside an explicit `website_protocol` record of the effective open-ASK windows.

Rebuild with `python scripts/build_examples.py /path/to/ProactiveBenchmark` (requires FFmpeg and Pillow). The script exports H.264/AAC MP4s with fast-start metadata, preserving aspect ratios and source timestamps. `assets/examples/annotations.json` holds selected source annotation fields; `manifest.json` maps source media to site assets. See `docs/example-review.md` for the visual review. Existing video exports are reused; remove only the specific generated asset you intend to regenerate when changing encoding settings.

The Paper button opens the local PDF. Code and Benchmark URLs are taken from the links embedded in the PDF. The citation uses a provisional `@misc` entry; update its bibliographic metadata when an official publication or preprint identifier is available.

## Waiting list

- [x] Eight study cases: real video excerpts, original annotations, and reference evidence for all eight tasks.
- [ ] Paper link: add the final public paper URL.
- [ ] Code link: add or confirm the released code repository URL.
- [ ] Data link: add or confirm the released dataset URL.
- [ ] BibTeX: replace the provisional citation with the final bibliographic entry.

## GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, select the branch containing the site and **/ (root)**, then save. Include the PDF and `assets/` when publishing.

This repository's project URL is <https://wanglu-cs.github.io/askstream-site/>.
