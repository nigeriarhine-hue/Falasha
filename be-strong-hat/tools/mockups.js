const fs = require('fs'); const { chromium } = require('playwright');
const OUT = '/home/user/Falasha/be-strong-hat';
const img = n => fs.readFileSync(`${OUT}/files/PRINTFUL-UPLOAD_hat-front_${n}.png`).toString('base64');
const hats = [['Black','#1b1b1b'],['White','#f4f4f2'],['Stone','#d8d2c4'],['Khaki','#c9b48a']];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1700, height: 820 } });
  const row = n => hats.map(([hn, hc]) => `<div class="c"><svg viewBox="0 0 360 260" width="360" height="260">
      <path d="M40 190 Q40 40 180 30 Q320 40 320 190 Z" fill="${hc}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
      <path d="M180 30 L180 190" stroke="rgba(0,0,0,.15)" stroke-width="2"/><circle cx="180" cy="32" r="7" fill="${hc}" stroke="rgba(0,0,0,.3)"/>
      <path d="M20 190 Q180 175 340 190 Q330 245 180 245 Q30 245 20 190 Z" fill="${hc}" stroke="rgba(0,0,0,.3)" stroke-width="2"/>
      <image href="data:image/png;base64,${img(n)}" x="52" y="96" width="256" height="90"/></svg>
      <div class="l">${hn} hat · ${n.replace(/-/g, ' / ')}</div></div>`).join('');
  await p.setContent(`<style>body{margin:0;background:#eeeae4;font-family:Inter,sans-serif}h1{margin:24px 40px 0;font-size:26px}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:20px 40px}.c{background:#fff;border-radius:14px;padding:14px;text-align:center}.l{font-size:16px;color:#444}</style>
    <h1>BE STRONG and of Good Courage dad hat · Yupoong 6245CM front embroidery (about 2.6" × 1.75")</h1>
    <div class="g">${row('red-gold-green')}${row('red-black-green')}</div>`);
  await p.screenshot({ path: `${OUT}/mockups/mockup-hat-colors.png` });
  const f = n => fs.readFileSync(`${OUT}/files/logo_${n}.png`).toString('base64');
  await p.setViewportSize({ width: 1500, height: 560 });
  await p.setContent(`<body style="margin:0;background:#f4f1ec;font:22px Inter,sans-serif;color:#444;padding:30px;box-sizing:border-box;display:flex;gap:40px;justify-content:center;text-align:center">
    <div><img style="width:660px" src="data:image/png;base64,${f('red-gold-green')}"><p>Red · Gold · Green</p></div>
    <div><img style="width:660px" src="data:image/png;base64,${f('red-black-green')}"><p>Red · Black · Green</p></div></body>`);
  await p.screenshot({ path: `${OUT}/mockups/logo-both-colourways.png` });
  await b.close();
})();
