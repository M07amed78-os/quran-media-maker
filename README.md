# Quran Media Maker

A browser-only Quran media maker inspired by Quran.com's Media Maker. Upload your own image (including photos containing people), choose a Surah and verse range, Arabic font/color, optional translation, reciter, drag text into position, preview, and export a WebM video.

## Run locally
Serve the folder over HTTP. Example:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## GitHub Pages
Upload the files to a repository with this structure:

```text
index.html
css/styles.css
js/api.js
js/canvasRenderer.js
js/export.js
js/main.js
```

Enable GitHub Pages from **Settings → Pages → Deploy from a branch → main / root**.

## Data
Quran text, translations and ayah audio are loaded from Al Quran Cloud's public API/CDN. See https://alquran.cloud/api and https://alquran.cloud/cdn.

## Export
The browser records the canvas + Web Audio stream to WebM using `MediaRecorder`. MP4 conversion is not included in this first version.
