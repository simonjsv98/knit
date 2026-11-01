# CLAUDE.md

Keep this file current. When the workflow, the structure or a standing preference changes, update it in the same change.

## Workflow

- The app is served by GitHub Pages from `main`. Finish changes in the session and merge them to `main` right away, so the app updates.
- Check changes in a phone-width browser (390 px) with Playwright before merging, and on iPad Air sizes (820×1180, 1180×820) when the layout changes.
- Talk to Simon in Swedish. The app's text is Swedish.
- Same look, feel and motion as the RECIPES app (simonjsv98/recipes): Google Sans, #F3F2EF background, fixed top bar with the update button in the middle on the start page, colour tile, a list page with a coloured title and dot, tappable steps, short fades between pages, swipe right to go back, sheets that slide up and down, a fixed button at the bottom. The motion code is copied from `build/kokslaget.html` in RECIPES; keep the two in step. KNIT's colours are brown #4A2212 with yellow #F9E27D (dots #F2C94C, note boxes #FBF1C9). The illustration is the filled ball of yarn with two needles, drawn by `build/make-art.js` (run it after changing the art or the colours; it updates `index.html` and the icons).

## Structure

- Start page (tile) → pattern list (`PATTERNS`) → a pattern's guide. Each pattern saves its progress under its own id (`knit-<id>-…` in localStorage). The first pattern is Ingrid Scarf (id `monster-1`, kept so saved progress stays). Only it has a guide so far; a new pattern gets an entry in `PATTERNS` and its own pages.
- The guide is one page per stage, not one long scroll: start (size, overview, what you need, colours), swatch, cast on, mark the centre, row 1, row 2 in two halves (up to and after the centre stitch), repeat (stitch counts), bind off, weave in ends and block. `PAGES` and `PAGE_VIEWS` in `index.html`.
- Colour stripes (`STRIPES`): rows 1–5 main colour, 6–8 F1, 9–10 main, 11–15 F2, 16–17 main, 18–20 F1, then main. Rows count from the first row after casting on, the same as the row counter (the pattern does not say; marked). The status box and the row counter show the colour of the row, and the first row of a new colour gets a notice to change colour and cut the yarn.
- Sizes are `SIZES` = 116 and 317. Simon replaced the pattern's 316 with 317 (one stitch more, so the centre stitch has 158 stitches on each side); 317 is the default and he is knitting it. `OWN_SIZE` marks sizes that differ from the pattern, and the guide marks them "Står inte i mönstret" with a note. Rows counted on 316 carried over to 317. (Simon tried 411 for a moment and went back to 317; a saved 411 moves back to 317 and the 317 row count is kept.) The size can still be changed on the overview.
- On a step page the top-left link goes to the pattern's overview ("← Översikt"); on the overview it goes to the pattern list. The overview's big button continues from the last step page ("Fortsätt: …").
- The fixed bottom bar has a back button and the next action. "Varv 1 klart" and "Varv 2 klart" move the row counter on, but only when the counter is on that row, so going back and forward never counts twice. The back arrow goes one page back in the fixed order (never round in a loop), so it always reaches the overview. Swiping right does what the top-left link does, as in RECIPES: step → overview → pattern list → start page.
- On the knitting pages a status box shows the repeat, the row and the stitch count, and opens the row counter. The glossary, all "Bra att veta" notes and the original pattern are in the Ordlista sheet (top right). Each page also shows the notes that belong to it.
- Row diagrams (`ROW1`, `ROW2`) show every part of the row in the order you knit it, numbered like the steps, with done steps faded and the next one marked. They must match the pattern exactly. They show order, not left and right on the needle.
- The end is exact, not just "about 6": as written, row 1 needs 4 stitches on each side of the centre stitch and row 2 needs 6, so a row only counts if it fits (`minSide`, `canKnit`, `rowsLeft`). With 116 the last row is row 35 at 12 stitches; with 317 it is row 103 at 9 (with the pattern's 316 it would be 8). The guide then says to bind off.
- iPad is handled by the same page with media queries, no separate version. From 700 px (iPad Air portrait, 820 px): one column, larger text and row diagrams. From 1000 px (iPad Air landscape, 1180 px, large iPads in portrait): two columns. `panes()` splits each guide page into a left part (heading, status, diagram), which stays in view, and a right part (the steps), at `SPLIT` or where the steps start. The bottom buttons sit under the right column. Check changes at 820×1180 and 1180×820 as well as 390 px.
- The open page and ticked steps are saved, so the guide reopens where you left off. The screen stays on while a guide is open.

## Content

- The pattern is Ingrid Scarf (1837) from Yllotyll. Simon sent the PDF; materials, abbreviations and swatch are in `PATTERN_INFO`, the description, colour changes and blocking in `PATTERN`. The parts about fringes are left out on purpose: Simon is not making them.
- English: every Swedish abbreviation has the English abbreviation and words beside it (`GLOSSARY`, `TERMS[...].en`): k2tog, ssk, p2tog, p2tog tbl, k, p, st, sm, MC/CC, CO, BO. The English words (and the English abbreviation after a decrease in the steps) link to a YouTube search for "how to <words>"; words that would find something else on their own get "knitting" added.
- The decreases are defined by the pattern's abbreviation list (`TERMS[...].what`, quoted as written); the step-by-step text under it follows that definition.
- The guide is built only from the pattern text in `PATTERN_INFO` and `PATTERN` in `index.html`. Anything the guide adds that the pattern does not say is marked "Står inte i mönstret" and explained under "Bra att veta". Never invent pattern details.
