# Portfolio PDF

`yael-kempf-portfolio.pdf` is the file served by the book in the bottom-left
corner of the homepage. Source file: `Yael_Kempf_Portfolio_SITEWEB.pdf`
(83 pages, ~22 MB).

The link lives on the `.books__item` anchor in `index.html`:

    href="portfolio/yael-kempf-portfolio.pdf"
    download="Yael-Kempf-Portfolio.pdf"

`href` is the path on the server, `download` is the filename the visitor's
browser saves it as. To publish a new version, overwrite this file keeping the
same name — no code change needed.

## Why the PDF is hosted here and not on Google Drive

The `download` attribute is what forces a real download instead of opening a
viewer, and browsers ignore it on cross-origin links. A Drive URL would simply
open the Drive viewer in a new tab. Same-origin file = real download.
