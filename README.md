# Chad LaFarge — Resume / CV

A single-page, professional resume site that works on **GitHub Pages** and when opened locally on a **Windows desktop** (e.g. double-click `index.html` or open via `file://`).

## Contents

- **index.html** — Main resume content (experience, certifications, skills, AI experience, publications).
- **styles.css** — Layout and styling; print-friendly.
- **script.js** — Loads your photo from `assets/photo.jpg` (or similar) when available.
- **assets/** — Add `photo.jpg` or `photo.png` here for your profile image.

## Hosting on GitHub Pages

### Option A: Using GitHub CLI

If you have [GitHub CLI](https://cli.github.com/) (`gh`) installed and authenticated:

```bash
cd c:\Cursor\ChadCV
git init
git add index.html styles.css script.js assets README.md
git commit -m "Initial resume/CV site"
gh repo create ChadCV --public --source=. --remote=origin --push
gh repo edit --enable-pages
```

Then in the repo on GitHub: **Settings → Pages** → set source to **Deploy from branch** → branch `main`, folder **/ (root)** → Save. Your site will be at `https://<username>.github.io/ChadCV/` (or enable Pages from the CLI with a follow-up step).

### Option B: Manual

1. Create a new repository (e.g. `clafarge.github.io` for a user site, or any repo for a project site).
2. Push this folder to the repo (e.g. push `index.html`, `styles.css`, `script.js`, and `assets/`).
3. In the repo: **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` (or `master`) → folder: **/ (root)** → Save.
4. Your site will be at `https://<username>.github.io/<repo>/` (or `https://<username>.github.io/` for a user site).

## Running locally (Windows)

- Double-click **index.html**, or  
- Right-click → Open with → your browser.

The page works fully offline. The script will look for `assets/photo.jpg` (or `photo.png`) next to `index.html` and display it in the hero if found.

## Adding your photo

- **Option A:** Put `photo.jpg` or `photo.png` in the **assets** folder. The script will load it automatically.
- **Option B:** Set a custom URL on the placeholder:  
  `<div class="photo-placeholder" id="photoPlaceholder" data-photo="https://…">`  
  Use a full URL (e.g. from Google Photos “Share link” → get a direct image URL if you host the image elsewhere).

## Google Photos

Google Photos share links are not direct image URLs, so they can’t be used as `data-photo` as-is. To use a photo from Google Photos:

1. Download the image and place it in **assets/** as `photo.jpg` or `photo.png`, or  
2. Upload the image to your GitHub repo (e.g. in `assets/`) and use the raw URL as `data-photo`, or  
3. Host the image on another service that gives a direct image URL.

## Print / PDF

Use the browser’s **Print** (Ctrl+P) and “Save as PDF” for a clean, print-optimized version.
