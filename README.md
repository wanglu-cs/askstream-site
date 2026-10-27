# AskStream

Project page for **AskStream: When and What to Ask Proactively under Uncertainty in Streaming Video Understanding**.

The design follows [MMR-V](https://mmr-v.github.io/): a dark, full-screen cover with a handwritten project name, followed by the paper information, abstract, leaderboard, benchmark introduction, construction pipeline, statistics, examples, analyses, and BibTeX.

## Local preview

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/>. No build step or JavaScript dependencies are required. Styles, scripts, figures, and fonts are served locally.

## Content and assets

- `index.html`: paper title, authors, affiliations, abstract, section content, resource links, and citation.
- `assets/style.css`: layout, responsive styles, and fonts.
- `assets/site.js`: results from paper Tables 2 and 6, evaluation setting switch, model filters, column sorting, and citation copying.
- `assets/examples-data.js`: eight editable example cases with three simulated interaction turns per case.
- `assets/examples.js`: case/turn selection, annotated timeline, action and answer choices, and reference interactions.
- `assets/*.png`: figures cropped directly from `ICLR2027.pdf`.
- `ICLR2027.pdf`: downloadable paper.
- `assets/fonts/`: Dancing Script and Noto Sans with their SIL Open Font Licenses.
- `.nojekyll`: disables Jekyll processing on GitHub Pages.

The cover displays animated filmstrips made from all 92 supplied real screenshots in `assets/video/`, corresponding to the paper's A.9 study cases. The frames are optimized WebP assets in `assets/cover/`; originals remain unchanged. `assets/cover/manifest.json` records every original-to-cover mapping. All three filmstrips are visible on both desktop and mobile. No image-generation API is used. Visitors can pause the motion; reduced-motion preferences disable it, and animation pauses when the cover is offscreen.

The supplied `assets/icon.png` remains as source material; the page uses a text wordmark and the simple letter favicon. To rebuild cover frames after changing source materials, install Pillow and run `python3 scripts/build_cover_assets.py`.

Paper figures use transparent CSS backgrounds so their existing PNG transparency is preserved. Styles and scripts include a version query to refresh cached copies after this update.

The Examples section has eight tasks (KVEM, VIM, ICM, PACM, AUQ, WUQ, UPM, UPC), each with three illustrative turns. Timings, choices, and multi-turn continuations are simulated and labeled as such. All eight videos are intentionally blank. Visitors can click a turn, an action window, or a Query/Ask/Answer timestamp, or scrub the progress bar; the active query and choices update together. Action and answer choices are separate tabs, with an optional reference reveal.

To add real cases, edit `assets/examples-data.js`. Set each case's `videoSrc` from `null` to a local video path (for example, `assets/video/kvem.mp4`), set `duration` in seconds, and replace its `turns` array. Every turn has a unique `id`, a `query`, `actionOptions` and `answerOptions` arrays, zero-based `correctAction` and `correctAnswer` indices, and a `userReply`. The timestamps are seconds from the beginning of the video, ordered `start < ask < askEnd <= answer < end <= duration`; list turns chronologically without overlap. The timeline renders WAIT before/after the ASK window, then ANSWER. The same player and annotations synchronize automatically when a video is supplied. Update the demo label and summary once real annotations replace the simulated examples. Do not reuse demo media from the reference website.

The Paper button opens the local PDF. Code and Benchmark URLs are taken from the links embedded in the PDF. The citation uses a provisional `@misc` entry; update its bibliographic metadata when an official publication or preprint identifier is available.

## GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, select the branch containing the site and **/ (root)**, then save. Include the PDF and `assets/` when publishing.

This repository's project URL is <https://wanglu-cs.github.io/askstream-site/>.
