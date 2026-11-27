// Walking Trophy tee - back (title + woman-shaped trophy) and front left-chest mark.
const fs = require('fs'); const { chromium } = require('playwright');
const F = process.env.FONTS_DIR || __dirname + '/fonts', OUT = process.env.OUT || '/home/user/Falasha/walking-trophy-tee';
const b64 = f => fs.readFileSync(f).toString('base64');
const css = `@font-face{font-family:PF;font-weight:900;src:url(data:font/woff2;base64,${b64(`${F}/fontsource-playfair-display-5.3.0/package/files/playfair-display-latin-900-normal.woff2`)})}
@font-face{font-family:PF;font-weight:700;src:url(data:font/woff2;base64,${b64(`${F}/fontsource-playfair-display-5.3.0/package/files/playfair-display-latin-700-normal.woff2`)})}`;
const GOLD = `<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#FFF1B8"/><stop offset=".28" stop-color="#F6C94C"/><stop offset=".6" stop-color="#D49B1E"/><stop offset="1" stop-color="#8F6410"/></linearGradient>
 <linearGradient id="goldV" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#FFE48A"/><stop offset=".5" stop-color="#E2AE2E"/><stop offset="1" stop-color="#A8770F"/></linearGradient>
 <linearGradient id="goldDeep" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#E0A82A"/><stop offset=".55" stop-color="#B07E12"/><stop offset="1" stop-color="#7A540A"/></linearGradient>`;
// Woman-shaped trophy in a 1000 x 1400 box.
const trophy = (plaqueInk, plaqueText = true) => `
 <g id="trophy">
  <!-- arms on hips = the trophy handles -->
  <path d="M392 346 C320 372 282 428 296 474 C308 512 384 526 456 518" fill="none" stroke="url(#gold)" stroke-width="38" stroke-linecap="round"/>
  <path d="M608 346 C680 372 718 428 704 474 C692 512 616 526 544 518" fill="none" stroke="url(#gold)" stroke-width="38" stroke-linecap="round"/>
  <!-- afro (deeper gold), face, hoop earrings, neck -->
  <path d="M480 255 L520 255 L530 314 L470 314 Z" fill="url(#gold)"/>
  <circle cx="500" cy="176" r="104" fill="url(#goldDeep)"/>
  <ellipse cx="500" cy="214" rx="50" ry="62" fill="url(#gold)"/>
  <circle cx="452" cy="250" r="15" fill="none" stroke="url(#gold)" stroke-width="7"/>
  <circle cx="548" cy="250" r="15" fill="none" stroke="url(#gold)" stroke-width="7"/>
  <!-- figure: shoulders, bust, waist, hips, gown with flared hem -->
  <path d="M500 300 C455 300 400 312 382 340 C372 362 392 400 410 430 C430 470 455 495 458 520
           C460 560 380 600 376 662 C372 730 430 790 446 840 C450 860 410 880 386 908 L614 908
           C590 880 550 860 554 840 C570 790 628 730 624 662 C620 600 540 560 542 520
           C545 495 570 470 590 430 C608 400 628 362 618 340 C600 312 545 300 500 300 Z" fill="url(#gold)"/>
  <!-- shine -->
  <path d="M418 352 C405 392 432 440 450 492" fill="none" stroke="#FFF6D6" stroke-width="11" stroke-linecap="round" opacity=".8"/>
  <path d="M404 650 C400 712 432 772 452 820" fill="none" stroke="#FFF6D6" stroke-width="11" stroke-linecap="round" opacity=".7"/>
  <ellipse cx="455" cy="110" rx="26" ry="14" fill="#FFF1B8" opacity=".55" transform="rotate(-25 455 110)"/>
  <!-- collar, stem, foot -->
  <rect x="420" y="904" width="160" height="32" rx="16" fill="url(#goldV)"/>
  <rect x="474" y="934" width="52" height="74" fill="url(#goldV)"/>
  <path d="M415 1040 Q500 985 585 1040 Z" fill="url(#goldV)"/>
  <!-- two-tier base with plaque -->
  <rect x="345" y="1038" width="310" height="70" rx="6" fill="url(#goldV)"/>
  <rect x="300" y="1108" width="400" height="142" rx="8" fill="url(#goldV)"/>
  <rect x="345" y="1130" width="310" height="98" rx="6" fill="${plaqueInk}"/>
  ${plaqueText ? '<text x="500" y="1194" text-anchor="middle" font-family="PF" font-weight="900" font-size="46" letter-spacing="4" fill="url(#gold)">1ST PLACE</text>' : ''}
 </g>`;
const sparkle = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -50 C6 -10 10 -6 50 0 C10 6 6 10 0 50 C-6 10 -10 6 -50 0 C-10 -6 -6 -10 0 -50 Z" fill="url(#gold)"/>`;
// BACK: 12" x 16" print area @300dpi = 3600 x 4800
const back = (ink, plaqueInk) => `<svg id="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3600 4800"><defs>${GOLD}</defs>
  <text x="1800" y="500" text-anchor="middle" font-family="PF" font-weight="900" font-size="440" letter-spacing="40" fill="${ink}">WALKING</text>
  <text x="1800" y="1010" text-anchor="middle" font-family="PF" font-weight="900" font-size="560" letter-spacing="30" fill="url(#gold)">TROPHY</text>
  <rect x="1150" y="1130" width="1300" height="14" fill="url(#gold)"/>
  <g transform="translate(500 1330) scale(2.6)">${trophy(plaqueInk)}</g>
  ${sparkle(820, 1800, 2.0)}${sparkle(2780, 2050, 2.6)}${sparkle(2520, 1560, 1.3)}${sparkle(1000, 2650, 1.2)}${sparkle(2700, 3150, 1.3)}
</svg>`;
// FRONT left chest: 4" x 4" @300dpi = 1200 x 1200
const front = (ink, plaqueInk) => `<svg id="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"><defs>${GOLD}</defs>
  <g transform="translate(260 10) scale(0.68)">${trophy(plaqueInk, false)}</g>
  <text x="600" y="1015" text-anchor="middle" font-family="PF" font-weight="900" font-size="132" letter-spacing="14" fill="${ink}">WALKING</text>
  <text x="600" y="1170" text-anchor="middle" font-family="PF" font-weight="900" font-size="160" letter-spacing="14" fill="url(#gold)">TROPHY</text>
</svg>`;
const variants = { 'dark-shirts': ['#FFFFFF', '#141414'], 'light-shirts': ['#141414', '#141414'] };
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const shot = async (html, w, h, path) => {
    await p.setViewportSize({ width: w, height: h });
    await p.setContent(`<style>${css}html,body{margin:0;background:transparent}#s{display:block;width:${w}px;height:${h}px}</style>${html}`);
    await p.evaluate(() => document.fonts.ready); await p.screenshot({ path, omitBackground: true });
  };
  for (const [n, [ink, pl]] of Object.entries(variants)) {
    await shot(back(ink, pl), 3600, 4800, `${OUT}/files/PRINTFUL-BACK_${n}.png`);
    await shot(front(ink, pl), 1200, 1200, `${OUT}/files/PRINTFUL-FRONT-left-chest_${n}.png`);
  }
  await b.close();
})();
