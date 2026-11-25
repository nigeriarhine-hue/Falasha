const fs = require('fs'); const { chromium } = require('playwright');
const F = process.env.FONTS_DIR || __dirname + '/fonts' /* @fontsource/knewave + @fontsource/pacifico unpacked here */, OUT = '/home/user/Falasha/be-strong-hat';
const b64 = f => fs.readFileSync(f).toString('base64');
const font = (n, f) => `@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64(`${F}/fontsource-${f}-5.3.0/package/files/${f}-latin-400-normal.woff2`)})}`;
const css = font('K', 'knewave') + font('S', 'pacifico');
// Printful thread colours
const T = { red: '#CC3333', gold: '#FFCC00', green: '#01784E', black: '#000000', white: '#FFFFFF' };
// deterministic pseudo-random for brush edges
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
// one brush-stroke band: flat-ish top/bottom with a gentle wave, ragged tapered ends
function band(x0, x1, y, h) {
  const pts = [], n = 14;
  for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; pts.push([x, y + (rnd() - .5) * 8]); }
  // right ragged end: 3 bristle fingers
  const r = [[x1 + 30, y + h * .15], [x1 - 5, y + h * .3], [x1 + 45, y + h * .5], [x1, y + h * .68], [x1 + 25, y + h * .85]];
  const bot = []; for (let i = n; i >= 0; i--) { const x = x0 + (x1 - x0) * i / n; bot.push([x, y + h + (rnd() - .5) * 8]); }
  const l = [[x0 - 25, y + h * .82], [x0 + 6, y + h * .62], [x0 - 40, y + h * .45], [x0 + 2, y + h * .28], [x0 - 20, y + h * .12]];
  const all = [...pts, ...r, ...bot, ...l];
  return 'M' + all.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L') + ' Z';
}
const design = (cols) => {
  seed = 7;
  const W = 2000, top = 40, bh = 230;      // three bands of 230 units, slight overlap
  const bands = cols.map((c, i) => `<path d="${band(120, 1880, top + i * (bh - 6), bh)}" fill="${c}"/>`).join('');
  const ol = T.black, sw = 34;              // black outline behind white text
  return `<svg id="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 760">
   <g transform="skewX(-6)" transform-origin="1000 380">${bands}</g>
   <g transform="skewX(-8)" transform-origin="1000 380" text-anchor="middle" stroke-linejoin="round">
    <!-- outline layer (black), then fill layer (white, slightly emboldened) -->
    <text x="1000" y="392" font-family="K" font-size="320" fill="${ol}" stroke="${ol}" stroke-width="60">BE STRONG</text>
    <text x="1000" y="618" font-family="S" font-size="178" fill="${ol}" stroke="${ol}" stroke-width="66">and of Good Courage</text>
    <text x="1000" y="392" font-family="K" font-size="320" fill="${T.white}" stroke="${T.white}" stroke-width="4">BE STRONG</text>
    <text x="1000" y="618" font-family="S" font-size="178" fill="${T.white}" stroke="${T.white}" stroke-width="13">and of Good Courage</text>
   </g></svg>`;
};
const fit = () => { const g = document.getElementById('s').getBBox(); const pad = 10;
  document.getElementById('s').setAttribute('viewBox', `${g.x - pad} ${g.y - pad} ${g.width + 2*pad} ${g.height + 2*pad}`); return [g.width + 2*pad, g.height + 2*pad]; };
const variants = {
  'red-gold-green': [T.red, T.gold, T.green],
  'red-black-green': [T.red, T.black, T.green],
};
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const f of fs.readdirSync(`${OUT}/files`)) fs.unlinkSync(`${OUT}/files/${f}`);
  const shot = async (html, w, h, path) => {
    await p.setViewportSize({ width: w, height: h });
    await p.setContent(`<style>${css}html,body{margin:0;background:transparent}#s{display:block;width:${w}px;height:${h}px}</style>${html}`);
    await p.evaluate(() => document.fonts.ready); const r = await p.evaluate(fit);
    await p.screenshot({ path, omitBackground: true }); return r;
  };
  for (const [n, cols] of Object.entries(variants)) {
    const [w, h] = await shot(design(cols), 1500, 525, `${OUT}/files/PRINTFUL-UPLOAD_hat-front_${n}.png`);
    const W = 3000; await shot(design(cols), W, Math.round(W * h / w), `${OUT}/files/logo_${n}.png`);
    console.log(n, 'aspect', (w/h).toFixed(2), '-> on hat', (w/h > 1500/525 ? `5.00" x ${(5*h/w).toFixed(2)}"` : `${(1.75*w/h).toFixed(2)}" x 1.75"`));
  }
  await b.close();
})();
