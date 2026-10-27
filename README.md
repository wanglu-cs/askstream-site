# AskStream

Official project page for **When and What to Ask Proactively under Uncertainty in Streaming Video Understanding**.

This repository currently contains a deployment test page. The full paper website will be added later.

## Local preview

Run from the project directory:

```sh
python3 -m http.server 8000
```

On Windows, use `py -m http.server 8000` if `python3` is unavailable.

Open <http://localhost:8000/>. Press `Ctrl+C` to stop the server.

## Files

- `index.html`: project landing page.
- `.nojekyll`: empty file that disables Jekyll processing on GitHub Pages.
- `assets/`: optional public images, such as `overview.png`.

## GitHub Pages

In the repository's **Settings → Pages**, choose **Deploy from a branch**, then select **main** and **/ (root)** and save.

The site will be available at <https://wanglu-cs.github.io/askstream-site/> after GitHub Pages finishes deploying.
