// WALKING TROPHY tee v2: realistic walking-woman statuette (afro, gown) on the back; laurel crest on the front.
const fs = require('fs'); const { chromium } = require('playwright');
const { METAL, figure } = require('./figure.js');
const F = process.env.FONTS_DIR || __dirname + '/fonts', OUT = process.env.OUT || '/home/user/Falasha/walking-trophy-tee';
const b64 = f => fs.readFileSync(f).toString('base64');
const font = (fam, w, file) => `@font-face{font-family:${fam};font-weight:${w};src:url(data:font/woff2;base64,${b64(`${F}/${file}`)})}`;
const css = font('GV', 400, 'fontsource-great-vibes-5.3.0/package/files/great-vibes-latin-400-normal.woff2')
  + font('CG', 700, 'fontsource-cormorant-garamond-5.3.0/package/files/cormorant-garamond-latin-700-normal.woff2')
  + font('CG', 600, 'fontsource-cormorant-garamond-5.3.0/package/files/cormorant-garamond-latin-600-normal.woff2');
const sparkle = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -50 C5 -9 9 -5 50 0 C9 5 5 9 0 50 C-5 9 -9 5 -50 0 C-9 -5 -5 -9 0 -50 Z" fill="url(#metalV)"/>`;
// laurel wreath: two branches rising from the bottom, open at the top, pointed leaves in pairs
function laurel(cx, cy, r, leaf = 44) {
  const leafPath = (L) => `M0 ${-L} C${L*.42} ${-L*.45} ${L*.42} ${L*.45} 0 ${L} C${-L*.42} ${L*.45} ${-L*.42} ${-L*.45} 0 ${-L} Z`;
  let stems = '', leaves = '';
  for (const side of [-1, 1]) {
    const pts = [];
    for (let d = 14; d <= 150; d += 3) { const t = d * Math.PI / 180; pts.push(`${(cx + side * r * Math.sin(t)).toFixed(1)},${(cy + r * Math.cos(t)).toFixed(1)}`); }
    stems += `<polyline points="${pts.join(' ')}" fill="none" stroke="url(#metalV)" stroke-width="7" stroke-linecap="round"/>`;
    for (let i = 0; i < 13; i++) {
      const d = 22 + i * 10.5, t = d * Math.PI / 180;
      const px = cx + side * r * Math.sin(t), py = cy + r * Math.cos(t);
      const tang = Math.atan2(side * Math.cos(t), Math.sin(t)) * 180 / Math.PI;   // direction of growth (up the branch)
      const L = leaf * (1 - i * 0.03);
      for (const k of [-1, 1]) {                                                    // outer / inner leaf
        const rot = tang + k * 38;
        const rr = rot * Math.PI / 180, ox = Math.sin(rr) * L * 0.9, oy = -Math.cos(rr) * L * 0.9;
        leaves += `<path d="${leafPath(L)}" transform="translate(${(px + ox).toFixed(1)} ${(py + oy).toFixed(1)}) rotate(${rot.toFixed(1)})" fill="url(#${k > 0 ? 'metal' : 'metalV'})"/>`;
      }
    }
    // tip leaf
    const t = 155 * Math.PI / 180, px = cx + side * r * Math.sin(t), py = cy + r * Math.cos(t);
    leaves += `<path d="${leafPath(leaf * .6)}" transform="translate(${px.toFixed(1)} ${(py - leaf*.4).toFixed(1)}) rotate(${-side * 60})" fill="url(#metalV)"/>`;
  }
  return stems + leaves;
}
// BACK: 12" x 16" @300dpi
const back = (ink) => `<svg id="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3600 4800"><defs>${METAL}</defs>
  <text x="1800" y="640" text-anchor="middle" font-family="GV" font-size="680" fill="${ink}">Walking</text>
  <text x="1800" y="1130" text-anchor="middle" font-family="CG" font-weight="700" font-size="470" letter-spacing="120" fill="url(#metalV)">TROPHY</text>
  <g transform="translate(1800 1235)"><rect x="-560" y="-5" width="440" height="10" fill="url(#metalV)"/><rect x="120" y="-5" width="440" height="10" fill="url(#metalV)"/>
   <path d="M0 -34 L34 0 L0 34 L-34 0 Z" fill="url(#metalV)"/></g>
  <g transform="translate(1050 1440) scale(2.5)">${figure('#1')}</g>
  ${sparkle(820, 1900, 1.8)}${sparkle(2760, 2150, 2.4)}${sparkle(2520, 1650, 1.2)}${sparkle(1000, 2750, 1.1)}${sparkle(2700, 3300, 1.2)}
</svg>`;
// FRONT left chest: 4" x 4" @300dpi - laurel crest around the statuette, script name beneath
const front = (ink) => `<svg id="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"><defs>${METAL}</defs>
  ${laurel(600, 470, 380)}
  <g transform="translate(600 150) scale(0.53) translate(-300 0)">${figure()}</g>
  <path d="M600 44 L612 68 L638 72 L619 90 L624 116 L600 104 L576 116 L581 90 L562 72 L588 68 Z" fill="url(#metalV)"/>
  <text x="600" y="1080" text-anchor="middle" font-family="GV" font-size="190" fill="${ink}">Walking Trophy</text>
</svg>`;
const variants = { 'dark-shirts': '#FFFFFF', 'light-shirts': '#141414' };
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const f of fs.readdirSync(`${OUT}/files`)) fs.unlinkSync(`${OUT}/files/${f}`);
  const shot = async (html, w, h, path) => {
    await p.setViewportSize({ width: w, height: h });
    await p.setContent(`<style>${css}html,body{margin:0;background:transparent}#s{display:block;width:${w}px;height:${h}px}</style>${html}`);
    await p.evaluate(() => document.fonts.ready); await p.screenshot({ path, omitBackground: true });
  };
  for (const [n, ink] of Object.entries(variants)) {
    await shot(back(ink), 3600, 4800, `${OUT}/files/PRINTFUL-BACK_${n}.png`);
    await shot(front(ink), 1200, 1200, `${OUT}/files/PRINTFUL-FRONT-left-chest_${n}.png`);
  }
  await b.close();
})();
