// BE STRONG / AND OF GOOD / COURAGE - three lines, one per colour band, gold lettering (no outline: the bands give the contrast).
const fs = require('fs'); const { chromium } = require('playwright');
const F = process.env.FONTS_DIR || __dirname + '/fonts', OUT = process.env.OUT || '/home/user/Falasha/be-strong-hat';
const b64 = f => fs.readFileSync(f).toString('base64');
const css = `@font-face{font-family:K;src:url(data:font/woff2;base64,${b64(`${F}/fontsource-knewave-5.3.0/package/files/knewave-latin-400-normal.woff2`)})}`;
const T = { red: '#CC3333', gold: '#FFCC00', green: '#01784E', black: '#000000', white: '#FFFFFF' };
const LINES = [['BE STRONG', 300], ['AND OF GOOD', 236], ['COURAGE', 300]];   // text, font size
const GAP = 150, SPACING = 14;   // extra baseline gap, letter spacing                                                  // baseline step extra, outline width
const svg = (letters) => {
  let y = 0; const rows = LINES.map(([t, s], i) => { y += (i ? GAP : 0) + s * 0.81; return [t, s, y]; });
  const layer = (fills) => rows.map(([t, s, y], i) =>
    `<text x="1200" y="${y}" font-family="K" font-size="${s}" letter-spacing="${SPACING}" fill="${fills[i]}">${t}</text>`).join('');
  return `<svg id="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 1600">
   <g id="bands" transform="skewX(-8)"></g>
   <g id="txt" transform="skewX(-8)" stroke-linejoin="round" text-anchor="middle">
    <g id="ol">${layer(letters)}</g>
   </g></svg>`;
};
// in-page: one ragged brush band behind each line, all bands the same width, touching
const layout = (cols) => {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const rows = [...document.querySelectorAll('#ol text')].map(t => t.getBBox());
  const tb = document.getElementById('txt').getBBox();
  const padX = 110, x0 = tb.x - padX, x1 = tb.x + tb.width + padX;
  // band boundaries halfway between the outlined lines
  const tops = rows.map(r => r.y), bots = rows.map(r => r.y + r.height);
  // three equal-height bands; each line is then centred vertically in its band
  const Y0 = tops[0] - 40, Y3 = bots[2] + 40, bh = (Y3 - Y0) / 3;
  const cuts = [Y0, Y0 + bh, Y0 + 2 * bh, Y3];
  [...document.querySelectorAll('#ol text')].forEach((t, i) => {
    const r = rows[i], dy = (cuts[i] + cuts[i + 1]) / 2 - (r.y + r.height / 2);
    t.setAttribute('y', +t.getAttribute('y') + dy);
  });
  const band = (y, h) => {
    const P = [], n = 14;
    for (let i = 0; i <= n; i++) P.push([x0 + (x1 - x0) * i / n, y + (rnd() - .5) * 8]);
    P.push([x1 + 30, y + h * .15], [x1 - 5, y + h * .3], [x1 + 45, y + h * .5], [x1, y + h * .68], [x1 + 25, y + h * .85]);
    for (let i = n; i >= 0; i--) P.push([x0 + (x1 - x0) * i / n, y + h + (rnd() - .5) * 8]);
    P.push([x0 - 25, y + h * .82], [x0 + 6, y + h * .62], [x0 - 40, y + h * .45], [x0 + 2, y + h * .28], [x0 - 20, y + h * .12]);
    return 'M' + P.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L') + ' Z';
  };
  document.getElementById('bands').innerHTML = cols.map((c, i) =>
    `<path d="${band(cuts[i] - (i ? 3 : 0), cuts[i + 1] - cuts[i] + 6)}" fill="${c}"/>`).join('');
  const g = document.getElementById('s').getBBox(), pad = 10;
  document.getElementById('s').setAttribute('viewBox', `${g.x - pad} ${g.y - pad} ${g.width + 2*pad} ${g.height + 2*pad}`);
  return [g.width + 2*pad, g.height + 2*pad];
};
const variants = {
  'red-gold-green': { cols: [T.red, T.gold, T.green], letters: [T.gold, T.black, T.gold] },
  'red-black-green': { cols: [T.red, T.black, T.green], letters: [T.gold, T.gold, T.gold] },
};
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const f of fs.readdirSync(`${OUT}/files`)) fs.unlinkSync(`${OUT}/files/${f}`);
  const shot = async (v, w, h, path, sw = w, sh = h) => {
    await p.setViewportSize({ width: w, height: h });
    await p.setContent(`<style>${css}html,body{margin:0;background:transparent;display:flex;align-items:center;justify-content:center;height:${h}px}#s{display:block;width:${sw}px;height:${sh}px}</style>${svg(v.letters)}`);
    await p.evaluate(() => document.fonts.ready);
    const r = await p.evaluate(`(${layout})(${JSON.stringify(v.cols)})`);
    await p.screenshot({ path, omitBackground: true }); return r;
  };
  for (const [n, v] of Object.entries(variants)) {
    const [w, h] = await shot(v, 1500, 525, __dirname + '/tmp_measure.png');
    // Printful front file: 1500x525 (5" x 1.75" @300dpi), design fills the height, centred
    const dw = Math.round(525 * w / h);
    await shot(v, 1500, 525, `${OUT}/files/PRINTFUL-UPLOAD_hat-front_${n}.png`, dw, 525);
    await shot(v, 3000, Math.round(3000 * h / w), `${OUT}/files/logo_${n}.png`);
    const inch = 1.75 / h;
    console.log(n, `design ${(w*inch).toFixed(2)}" x 1.75" | caps:`, LINES.map(([t, s]) => `${t} ${(0.8125*s*inch).toFixed(2)}"`).join(', '));
  }
  await b.close();
})();
