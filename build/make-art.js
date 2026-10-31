// Draws KNIT's illustration (a ball of yarn with two needles) and the app icon.
// Run from the repo root: node build/make-art.js
// It writes the tile art into YARN in index.html, build/icon.svg, apple-touch-icon.png (180 px) and knit-icon-1024.png.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const BG = '#4A2212', FG = '#F9E27D';

// The strands are cut out of the ball in the background colour.
const art = (bg, fg) => `<path d="M1120 1000L1640 480" stroke="${fg}" stroke-width="88" stroke-linecap="round" fill="none"/><circle cx="1665" cy="455" r="108" fill="${fg}"/><path d="M1010 960L1290 350" stroke="${fg}" stroke-width="88" stroke-linecap="round" fill="none"/><circle cx="1305" cy="315" r="108" fill="${fg}"/><path d="M660 1520C540 1640 380 1600 345 1740C315 1860 430 1920 560 1880" stroke="${fg}" stroke-width="80" stroke-linecap="round" fill="none"/><path fill="${fg}" d="M500 1250C470 1000 640 790 900 760C1160 730 1400 880 1440 1140C1480 1390 1340 1620 1100 1690C860 1760 620 1650 545 1460C520 1395 505 1320 500 1250Z"/><path fill="${bg}" d="M760 900C940 905 1130 1020 1230 1230C1250 1272 1196 1300 1172 1262C1080 1110 930 1000 760 970C718 962 718 899 760 900Z"/><path fill="${bg}" d="M640 1110C850 1105 1050 1220 1150 1440C1168 1482 1115 1508 1092 1470C990 1300 830 1200 640 1180C598 1176 598 1111 640 1110Z"/><path fill="${bg}" d="M680 1370C820 1375 950 1450 1020 1570C1042 1608 990 1636 966 1600C905 1510 800 1450 680 1440C638 1436 638 1369 680 1370Z"/>`;

// Tile on the start page.
const tile = `<svg viewBox="0 0 2048 2048" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">${art(BG, FG)}</svg>`;
const indexPath = path.join(ROOT, 'index.html');
const index = fs.readFileSync(indexPath, 'utf8');
if (!/const YARN = `[^`]*`;/.test(index)) throw new Error('YARN not found in index.html');
fs.writeFileSync(indexPath, index.replace(/const YARN = `[^`]*`;/, () => 'const YARN = `' + tile + '`;'));

// Icon: same motif, centred and a little smaller.
const icon = s => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 2048 2048"><rect width="2048" height="2048" fill="${BG}"/><g transform="translate(1024 1024) scale(.72) translate(-1000 -1110)">${art(BG, FG)}</g></svg>`;
fs.writeFileSync(path.join(__dirname, 'icon.svg'), icon(1024));

// PNG icons, rendered with Playwright.
(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  for (const [size, file] of [[180, 'apple-touch-icon.png'], [1024, 'knit-icon-1024.png']]) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(`<body style="margin:0">${icon(size)}</body>`);
    await page.screenshot({ path: path.join(ROOT, file) });
  }
  await browser.close();
})();
