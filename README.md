# Quran Media Maker

A single-file Quran verse video maker for GitHub Pages. Upload your own photo (including photos with people), choose a Surah and verse range, customize Arabic text, optionally add a translation, select a reciter, drag the text on the preview, and export a WebM video entirely in the browser.

## Deploy

Upload `index.html` to the root of a public GitHub repository and enable **Settings → Pages → Deploy from a branch → main → /(root)**.

## Notes

The app uses the Al Quran Cloud API for Quran text and translations and its CDN for ayah audio. Current documentation is available at https://alquran.cloud/api and https://alquran.cloud/cdn.

Export is WebM because browser MediaRecorder support is widely available for WebM but not consistent for MP4. No backend is required.
