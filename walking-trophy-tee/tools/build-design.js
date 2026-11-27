// Walking Trophy tee - back (title + woman-shaped trophy) and front left-chest mark.
const fs = require('fs'); const { chromium } = require('playwright');
const F = process.env.FONTS_DIR || __dirname + '/fonts', OUT = process.env.OUT || '/home/user/Falasha/walking-trophy-tee';
const b64 = f => fs.readFileSync(f).toString('base64');
const css = `@font-face{font-family:GV;src:url(data:font/woff2;base64,${b64(`${F}/fontsource-great-vibes-5.3.0/package/files/great-vibes-latin-400-normal.woff2`)})}
@font-face{font-family:PF;font-weight:900;src:url(data:font/woff2;base64,${b64(`${F}/fontsource-playfair-display-5.3.0/package/files/playfair-display-latin-900-normal.woff2`)})}
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
  <path d="M609.8,172.0 L614.1,180.5 L612.6,188.8 L606.0,196.0 L599.4,202.5 L597.0,209.9 L597.2,218.8 L595.1,227.1 L588.2,232.5 L578.8,235.6 L571.4,239.5 L567.6,246.7 L564.5,255.8 L558.7,262.5 L549.9,264.5 L540.5,264.3 L532.5,266.5 L525.5,272.4 L517.8,278.4 L509.0,279.4 L500.0,275.1 L491.8,270.0 L483.8,268.6 L474.9,270.7 L465.8,271.5 L458.2,267.4 L452.6,259.8 L447.0,253.7 L438.9,251.4 L428.7,250.9 L419.9,247.7 L415.3,240.4 L413.5,231.4 L410.2,224.0 L403.2,218.6 L395.4,212.9 L391.8,205.2 L393.9,196.1 L397.7,187.3 L397.9,179.6 L393.8,172.0 L390.1,163.8 L391.5,155.8 L397.4,148.7 L402.8,142.2 L403.7,134.3 L402.0,124.9 L402.8,115.7 L408.8,109.5 L417.9,105.8 L425.6,101.7 L430.1,94.7 L434.2,86.4 L440.9,80.9 L450.5,80.2 L460.5,81.8 L468.6,80.8 L475.5,75.5 L482.8,69.6 L491.3,67.9 L500.0,71.1 L508.1,74.8 L516.4,74.5 L525.7,71.0 L535.4,69.2 L543.5,72.9 L549.3,80.6 L554.8,87.5 L562.5,90.8 L571.8,92.6 L579.5,96.9 L582.9,105.2 L583.6,114.6 L586.2,122.1 L593.0,127.2 L601.3,132.4 L606.0,139.5 L605.4,148.1 L603.2,156.6 L604.6,164.2 Z" fill="url(#goldDeep)" stroke="#6E4C08" stroke-width="2" stroke-opacity=".5"/>
  <path d="M418 150 C430 112 466 86 506 84" fill="none" stroke="#FFE9A8" stroke-width="8" stroke-linecap="round" opacity=".4"/>
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
  
  <!-- collar, stem, foot -->
  <rect x="420" y="904" width="160" height="32" rx="16" fill="url(#goldV)"/>
  <rect x="474" y="934" width="52" height="74" fill="url(#goldV)"/>
  <path d="M415 1040 Q500 985 585 1040 Z" fill="url(#goldV)"/>
  <!-- two-tier base with plaque -->
  <rect x="345" y="1038" width="310" height="70" rx="6" fill="url(#goldV)"/>
  <rect x="300" y="1108" width="400" height="142" rx="8" fill="url(#goldV)"/>
 </g>`;
const sparkle = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -50 C6 -10 10 -6 50 0 C10 6 6 10 0 50 C-6 10 -10 6 -50 0 C-10 -6 -6 -10 0 -50 Z" fill="url(#gold)"/>`;
// laurel wreath: two branches rising from the bottom, open at the top, pointed leaves in pairs
function laurel(cx, cy, r, leaf = 44) {
  const leafPath = (L) => `M0 ${-L} C${L*.42} ${-L*.45} ${L*.42} ${L*.45} 0 ${L} C${-L*.42} ${L*.45} ${-L*.42} ${-L*.45} 0 ${-L} Z`;
  let stems = '', leaves = '';
  for (const side of [-1, 1]) {
    const pts = [];
    for (let d = 14; d <= 150; d += 3) { const t = d * Math.PI / 180; pts.push(`${(cx + side * r * Math.sin(t)).toFixed(1)},${(cy + r * Math.cos(t)).toFixed(1)}`); }
    stems += `<polyline points="${pts.join(' ')}" fill="none" stroke="url(#goldV)" stroke-width="7" stroke-linecap="round"/>`;
    for (let i = 0; i < 13; i++) {
      const d = 22 + i * 10.5, t = d * Math.PI / 180;
      const px = cx + side * r * Math.sin(t), py = cy + r * Math.cos(t);
      const tang = Math.atan2(side * Math.cos(t), Math.sin(t)) * 180 / Math.PI;   // direction of growth (up the branch)
      const L = leaf * (1 - i * 0.03);
      for (const k of [-1, 1]) {                                                    // outer / inner leaf
        const rot = tang + k * 38;
        const rr = rot * Math.PI / 180, ox = Math.sin(rr) * L * 0.9, oy = -Math.cos(rr) * L * 0.9;
        leaves += `<path d="${leafPath(L)}" transform="translate(${(px + ox).toFixed(1)} ${(py + oy).toFixed(1)}) rotate(${rot.toFixed(1)})" fill="url(#${k > 0 ? 'gold' : 'goldV'})"/>`;
      }
    }
    // tip leaf
    const t = 155 * Math.PI / 180, px = cx + side * r * Math.sin(t), py = cy + r * Math.cos(t);
    leaves += `<path d="${leafPath(leaf * .6)}" transform="translate(${px.toFixed(1)} ${(py - leaf*.4).toFixed(1)}) rotate(${-side * 60})" fill="url(#goldV)"/>`;
  }
  return stems + leaves;
}
// BACK: 12" x 16" @300dpi - the crest: script name on top, laurel wreath around the trophy beneath it.
// Drawn in a 1200 x 1200 crest box, scaled 3x to fill the 12" width, aligned to the top of the print area.
const crest = (ink, plaqueInk) => `
  <text x="600" y="252" text-anchor="middle" font-family="GV" font-size="190" fill="${ink}">Walking Trophy</text>
  <g transform="translate(600 362) scale(0.9) translate(-600 -44)">
   ${laurel(600, 470, 380)}
   <g transform="translate(600 150) scale(0.6) translate(-500 0)">${trophy(plaqueInk, true)}</g>
   <path d="M600 44 L612 68 L638 72 L619 90 L624 116 L600 104 L576 116 L581 90 L562 72 L588 68 Z" fill="url(#goldV)"/>
  </g>`;
const back = (ink, plaqueInk) => `<svg id="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3600 4800"><defs>${GOLD}</defs>
  <g transform="translate(0 -180) scale(3)">${crest(ink, plaqueInk)}</g>
</svg>`;
// FRONT centre chest: 12" x 4" @300dpi - just the words, centred
const front = (ink) => `<svg id="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3600 1200">
  <text x="1800" y="740" text-anchor="middle" font-family="GV" font-size="640" fill="${ink}">Already Won</text>
</svg>`;
const variants = { 'dark-shirts': ['#FFFFFF', '#141414'], 'light-shirts': ['#141414', '#141414'] };
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const shot = async (html, w, h, path) => {
    await p.setViewportSize({ width: w, height: h });
    await p.setContent(`<style>${css}html,body{margin:0;background:transparent}#s{display:block;width:${w}px;height:${h}px}</style>${html}`);
    await p.evaluate(() => document.fonts.ready); await p.screenshot({ path, omitBackground: true });
  };
  for (const f of fs.readdirSync(`${OUT}/files`)) fs.unlinkSync(`${OUT}/files/${f}`);
  for (const [n, [ink, pl]] of Object.entries(variants)) {
    await shot(back(ink, pl), 3600, 4800, `${OUT}/files/PRINTFUL-BACK_${n}.png`);
    await shot(front(ink), 3600, 1200, `${OUT}/files/PRINTFUL-FRONT-center-chest_${n}.png`);
  }
  await b.close();
})();
