# CLAUDE.md

Keep this file current. When the workflow, the structure or a standing preference changes, update it in the same change.

## Workflow

- The app is served by GitHub Pages from `main`. Finish changes in the session and merge them to `main` right away, so the app updates.
- Check changes in a phone-width browser (390 px) with Playwright before merging.
- Talk to Simon in Swedish. The app's text is Swedish.
- Same look as the RECIPES app (simonjsv98/recipes): Google Sans, #F3F2EF background, colour tile on the start page, tappable steps, a fixed button at the bottom that opens a sheet. KNIT's colours are a muted navy #2B3A5C with off-white #ECE8E1 (dots #8E9BB5, note boxes #E4E7EE): calm and clean, not playful. The illustration is plain line art of even width, drawn by `build/make-art.js`.

## Content

- The guide is built only from the pattern text in `PATTERN` in `index.html`. Anything the guide adds that the pattern does not say is marked "Står inte i mönstret" and explained under "Bra att veta". Never invent pattern details.
