const fs = require('fs');
const { chromium } = require('playwright');
const F = process.env.FONTS_DIR || __dirname + '/fonts'; // needs @fontsource/knewave unpacked here
const fontCss = `@font-face{font-family:K;src:url(data:font/woff2;base64,${fs.readFileSync(`${F}/fontsource-knewave-5.3.0/package/files/knewave-latin-400-normal.woff2`).toString('base64')})}`;
const OUT = '/home/user/Falasha/god-sent-hat';
// Builds the logo SVG in-page, measuring the T of SENT so the cross sits on it like the shirt.
const build = (top, acc) => `
<svg id="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 860">
 <g transform="skewX(-6)">
  <text id="god" x="70" y="370" font-family="K" font-size="290" fill="${top}">GOD</text>
  <text id="sent" x="200" y="650" font-family="K" font-size="290" fill="${acc}">SEN</text>
  <path id="cv" fill="${acc}"/><path id="ch" fill="${acc}"/><path id="tb" fill="${acc}"/><path id="sw" fill="${acc}"/>
 </g></svg>`;
const place = () => {
  const sent = document.getElementById('sent');
  const n = sent.getExtentOfChar(2);            // the "N"
  const end = n.x + n.width;
  const base = 650, cap = base - 196;           // Knewave cap height ~0.68em at 290px
  const cx = end + 118;                          // cross upright = T stem
  // brush upright: from top of cross down to the SENT baseline (becomes the T stem)
  document.getElementById('cv').setAttribute('d',
    `M${cx-28},${base} Q${cx-34},${base-20} ${cx-32},${base-60} L${cx-20},34 Q${cx+6},18 ${cx+36},26 L${cx+30},${base-70} Q${cx+32},${base-14} ${cx+20},${base+4} Q${cx},${base+12} ${cx-28},${base} Z`);
  // cross bar
  const y = 150;
  document.getElementById('ch').setAttribute('d',
    `M${cx-124},${y+20} Q${cx-40},${y-12} ${cx+152},${y-30} L${cx+140},${y+14} Q${cx},${y+28} ${cx-118},${y+48} Z`);
  // T top bar at cap height
  document.getElementById('tb').setAttribute('d',
    `M${cx-84},${cap+8} Q${cx-10},${cap-16} ${cx+106},${cap-24} Q${cx+124},${cap-6} ${cx+104},${cap+34} Q${cx},${cap+40} ${cx-80},${cap+60} Q${cx-98},${cap+36} ${cx-84},${cap+8} Z`);
  // swoosh: thick under the S, tapering right but keeping >= ~2mm for stitching
  const x0 = 120, x1 = cx + 120, by = base + 96;
  document.getElementById('sw').setAttribute('d',
    `M${x0},${by+40} Q${x0+8},${by+4} ${x0+60},${by-2} Q${(x0+x1)/2},${by-34} ${x1},${by-76} Q${x1+12},${by-64} ${x1-4},${by-52} Q${(x0+x1)/2},${by-2} ${x0+40},${by+48} Q${x0+10},${by+54} ${x0},${by+40} Z`);
  // tight-crop viewBox to the artwork
  const bb = document.getElementById('s').querySelector('g').getBBox();
  const pad = 6, skew = Math.tan(6*Math.PI/180) * (bb.y + bb.height);
  document.getElementById('s').setAttribute('viewBox', `${bb.x - skew - pad} ${bb.y - pad} ${bb.width + skew + 2*pad} ${bb.height + 2*pad}`);
  return [bb.width + skew + 2*pad, bb.height + 2*pad];
};
const variants = {
  'dark-hats_white-gold': ['#FFFFFF', '#CCA43B'],   // matches the black shirt
  'light-hats_black-gold': ['#000000', '#CCA43B'],
};
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1500, height: 525 } });
  fs.rmSync(`${OUT}/files`, { recursive: true, force: true }); fs.mkdirSync(`${OUT}/files`);
  fs.rmSync(`${OUT}/mockups`, { recursive: true, force: true }); fs.mkdirSync(`${OUT}/mockups`);
  const svgs = {};
  for (const [n, [top, acc]] of Object.entries(variants)) {
    // 1) Printful hat file: 1500x525 (5" x 1.75" @300dpi), logo fit inside, centred
    await p.setViewportSize({ width: 1500, height: 525 });
    await p.setContent(`<style>${fontCss}html,body{margin:0;background:transparent}#s{display:block;margin:auto;height:525px;width:1500px}</style>${build(top, acc)}`);
    await p.evaluate(() => document.fonts.ready);
    const [w, h] = await p.evaluate(place);
    await p.screenshot({ path: `${OUT}/files/god-sent-hat-front_${n}.png`, omitBackground: true });
    svgs[n] = await p.evaluate(() => document.getElementById('s').outerHTML);
    // 2) high-res logo master (3000px wide)
    const W = 3000, H = Math.round(W * h / w);
    await p.setViewportSize({ width: W, height: H });
    await p.setContent(`<style>${fontCss}html,body{margin:0;background:transparent}#s{display:block;width:${W}px;height:${H}px}</style>${build(top, acc)}`);
    await p.evaluate(() => document.fonts.ready); await p.evaluate(place);
    await p.screenshot({ path: `${OUT}/files/god-sent-logo-master_${n}.png`, omitBackground: true });
    console.log(n, 'logo aspect', (w/h).toFixed(2), '-> on hat:', (1.75*w/h).toFixed(2) + '" x 1.75"');
  }
  // 3) mockups
  const hats = { Black:'#1b1b1b', Navy:'#1f2a44', 'Dark Grey':'#3b3b3b', Spruce:'#2f4a3a', Khaki:'#c9b48a', Stone:'#d8d2c4', White:'#f4f4f2', 'Light Blue':'#b9cde3' };
  const darks = ['Black','Navy','Dark Grey','Spruce'];
  const imgs = {}; for (const n of Object.keys(variants)) imgs[n] = fs.readFileSync(`${OUT}/files/god-sent-hat-front_${n}.png`).toString('base64');
  const cards = Object.entries(hats).map(([hn, hc]) => { const n = darks.includes(hn) ? 'dark-hats_white-gold' : 'light-hats_black-gold';
    return `<div class="c"><svg viewBox="0 0 360 260" width="360" height="260">
      <path d="M40 190 Q40 40 180 30 Q320 40 320 190 Z" fill="${hc}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
      <path d="M180 30 L180 190" stroke="rgba(0,0,0,.15)" stroke-width="2"/><circle cx="180" cy="32" r="7" fill="${hc}" stroke="rgba(0,0,0,.3)"/>
      <path d="M20 190 Q180 175 340 190 Q330 245 180 245 Q30 245 20 190 Z" fill="${hc}" stroke="rgba(0,0,0,.3)" stroke-width="2"/>
      <image href="data:image/png;base64,${imgs[n]}" x="60" y="92" width="240" height="84"/></svg>
      <div class="l">${hn} · ${n.includes('white') ? 'white + gold' : 'black + gold'} thread</div></div>`; }).join('');
  await p.setViewportSize({ width: 1700, height: 760 });
  await p.setContent(`<style>body{margin:0;background:#eeeae4;font-family:Inter,sans-serif}h1{margin:28px 40px 0;font-size:28px}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:28px 40px}.c{background:#fff;border-radius:14px;padding:16px;text-align:center}.l{font-size:16px;color:#444}</style><h1>GOD SENT dad hat · matches the shirt · Yupoong 6245CM front embroidery</h1><div class="g">${cards}</div>`);
  await p.screenshot({ path: `${OUT}/mockups/mockup-hat-colors.png` });
  // logo next to shirt-style black background, large
  await p.setViewportSize({ width: 1400, height: 900 });
  await p.setContent(`<body style="margin:0;background:#141414;display:flex;align-items:center;justify-content:center;height:900px"><img style="width:1100px" src="data:image/png;base64,${fs.readFileSync(`${OUT}/files/god-sent-logo-master_dark-hats_white-gold.png`).toString('base64')}"></body>`);
  await p.screenshot({ path: `${OUT}/mockups/logo-on-black.png` });
  await b.close();
})();
