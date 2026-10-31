# CLAUDE.md

Keep this file current. When the workflow, the structure or a standing preference changes, update it in the same change.

## Workflow

- The app is served by GitHub Pages from `main`. Finish changes in the session and merge them to `main` right away, so the app updates.
- Check changes in a phone-width browser (390 px) with Playwright before merging.
- Talk to Simon in Swedish. The app's text is Swedish.
- Same look as the RECIPES app (simonjsv98/recipes): Google Sans, #F3F2EF background, colour tile on the start page, tappable steps, sheets that slide up from the bottom. KNIT's colours are brown #4A2212 with yellow #F9E27D (dots #F2C94C, note boxes #FBF1C9). The illustration is the filled ball of yarn with two needles, drawn by `build/make-art.js` (run it after changing the art or the colours; it updates `index.html` and the icons).

## Structure of the guide

- The guide is one page per stage, not one long scroll: start (size, overview, what you need), cast on, mark the centre, row 1, row 2 in two halves (up to and after the centre stitch), repeat (stitch counts), bind off. `PAGES` and `PAGE_VIEWS` in `index.html`.
- The fixed bottom bar has a back button and the next action. "Varv 1 klart" and "Varv 2 klart" move the row counter on, but only when the counter is on that row, so going back and forward never counts twice.
- On the knitting pages a status box shows the repeat, the row and the stitch count, and opens the row counter. The glossary, all "Bra att veta" notes and the original pattern are in the Ordlista sheet (top right). Each page also shows the notes that belong to it.
- The open page is saved, so the guide reopens where you left off.

## Content

- The guide is built only from the pattern text in `PATTERN` in `index.html`. Anything the guide adds that the pattern does not say is marked "Står inte i mönstret" and explained under "Bra att veta". Never invent pattern details.
