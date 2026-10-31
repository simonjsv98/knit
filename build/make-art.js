// Draws KNIT's illustration (a ball of yarn with two needles, as plain lines) and the app icon.
// Run from the repo root: node build/make-art.js
// It writes the tile art into YARN in index.html, build/icon.svg, apple-touch-icon.png (180 px) and knit-icon-1024.png.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const BG = '#2B3A5C', FG = '#ECE8E1';

const C = [960, 1230], R = 440;
const f = Math.round;
const pt = (deg, r = R) => [C[0] + r * Math.cos(deg * Math.PI / 180), C[1] + r * Math.sin(deg * Math.PI / 180)];

function art(fg, sw) {
  const L = [`<circle cx="${C[0]}" cy="${C[1]}" r="${R}"/>`];
  // Strands across the ball, all bowing the same way.
  const strand = (a1, a2, bow) => {
    const p = pt(a1), q = pt(a2), dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy);
    const c = [(p[0] + q[0]) / 2 + dy / l * bow, (p[1] + q[1]) / 2 - dx / l * bow];
    L.push(`<path d="M${f(p[0])} ${f(p[1])}Q${f(c[0])} ${f(c[1])} ${f(q[0])} ${f(q[1])}"/>`);
  };
  strand(235, 345, -90); strand(195, 25, -130); strand(160, 60, -110);
  // Needles leave the ball's upper right and end in a knob.
  const needle = (at, angle, len) => {
    const p = pt(at, R + sw * 1.6), t = angle * Math.PI / 180, q = [p[0] + len * Math.cos(t), p[1] + len * Math.sin(t)];
    L.push(`<path d="M${f(p[0])} ${f(p[1])}L${f(q[0])} ${f(q[1])}"/>`, `<circle cx="${f(q[0])}" cy="${f(q[1])}" r="${f(sw * 1.5)}" fill="${fg}" stroke="none"/>`);
  };
  needle(-80, -66, 560); needle(-38, -45, 560);
  // The loose end of the yarn.
  const s = pt(150, R + sw * 1.6);
  L.push(`<path d="M${f(s[0])} ${f(s[1])}Q${f(s[0] - 90)} ${f(s[1] + 200)} ${f(s[0] - 330)} ${f(s[1] + 200)}"/>`);
  return `<g fill="none" stroke="${fg}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${L.join('')}</g>`;
}

// Tile on the start page: thinner line, since it is drawn large.
const tile = `<svg viewBox="0 0 2048 2048" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">${art(FG, 34)}</svg>`;
const indexPath = path.join(ROOT, 'index.html');
const index = fs.readFileSync(indexPath, 'utf8');
const updated = index.replace(/const YARN = `[^`]*`;/, 'const YARN = `' + tile + '`;');
if (updated === index && !index.includes(tile)) throw new Error('YARN not found in index.html');
fs.writeFileSync(indexPath, updated);

// Icon: same motif, centred and smaller, with a thicker line so it holds up at 180 px.
const icon = s => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 2048 2048"><rect width="2048" height="2048" fill="${BG}"/><g transform="translate(1024 1024) scale(.72) translate(-1010 -1090)">${art(FG, 60)}</g></svg>`;
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
