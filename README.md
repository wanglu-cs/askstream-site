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
- `assets/site.js`: results from paper Tables 2 and 6, evaluation setting switch, model filters, column sorting, example switch, and citation copying.
- `assets/*.png`: figures cropped directly from `ICLR2027.pdf`.
- `ICLR2027.pdf`: downloadable paper.
- `assets/fonts/`: Dancing Script and Noto Sans with their SIL Open Font Licenses.
- `.nojekyll`: disables Jekyll processing on GitHub Pages.

The cover intentionally has a plain dark background until a project background image is available. To add one, set `background-image` on `.cover` in `assets/style.css`.

Example videos are intentionally left as labeled placeholders in `#example-video` and `#example-user`. Replace each `.media-placeholder` with a `<video controls playsinline preload="metadata">` element when the corresponding video is ready. Do not reuse demo media from the reference website.

The Paper button opens the local PDF. Code and Benchmark URLs are taken from the links embedded in the PDF. The citation uses a provisional `@misc` entry; update its bibliographic metadata when an official publication or preprint identifier is available.

## GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, select the branch containing the site and **/ (root)**, then save. Include the PDF and `assets/` when publishing.

This repository's project URL is <https://wanglu-cs.github.io/askstream-site/>.
