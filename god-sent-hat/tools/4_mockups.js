const fs = require('fs'); const { chromium } = require('playwright');
const OUT = '/home/user/Falasha/god-sent-hat';
const img = n => fs.readFileSync(`${OUT}/files/PRINTFUL-UPLOAD_hat-front_${n}.png`).toString('base64');
const hats = { Black:'#1b1b1b', Navy:'#1f2a44', 'Dark Grey':'#3b3b3b', Spruce:'#2f4a3a', Burgundy:'#5a1f2b', White:'#f4f4f2', 'Light Blue':'#b9cde3', Stone:'#d8d2c4' };
const darks = ['Black','Navy','Dark Grey','Spruce','Burgundy'];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1700, height: 760 } });
  const cards = Object.entries(hats).map(([hn, hc]) => { const n = darks.includes(hn) ? 'dark-hats_white-gold' : 'light-hats_black-gold';
    return `<div class="c"><svg viewBox="0 0 360 260" width="360" height="260">
      <path d="M40 190 Q40 40 180 30 Q320 40 320 190 Z" fill="${hc}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
      <path d="M180 30 L180 190" stroke="rgba(0,0,0,.15)" stroke-width="2"/><circle cx="180" cy="32" r="7" fill="${hc}" stroke="rgba(0,0,0,.3)"/>
      <path d="M20 190 Q180 175 340 190 Q330 245 180 245 Q30 245 20 190 Z" fill="${hc}" stroke="rgba(0,0,0,.3)" stroke-width="2"/>
      <image href="data:image/png;base64,${img(n)}" x="60" y="88" width="240" height="84"/></svg>
      <div class="l">${hn} · ${n.includes('white') ? 'white + gold' : 'black + gold'} thread</div></div>`; }).join('');
  await p.setContent(`<style>body{margin:0;background:#eeeae4;font-family:Inter,sans-serif}h1{margin:28px 40px 0;font-size:28px}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:28px 40px}.c{background:#fff;border-radius:14px;padding:16px;text-align:center}.l{font-size:16px;color:#444}</style><h1>GOD SENT dad hat · final logo · Yupoong 6245CM front embroidery (2.4" × 1.75")</h1><div class="g">${cards}</div>`);
  await p.screenshot({ path: `${OUT}/mockups/mockup-hat-colors.png` });
  // side-by-side: full detail vs embroidery-safe
  const f = n => fs.readFileSync(`${OUT}/files/${n}`).toString('base64');
  await p.setViewportSize({ width: 1600, height: 640 });
  await p.setContent(`<body style="margin:0;background:#141414;color:#bbb;font:20px Inter,sans-serif;display:flex;gap:40px;padding:30px;box-sizing:border-box">
   <div style="flex:1;text-align:center"><img style="width:100%" src="data:image/png;base64,${f('logo-full-detail_dark-hats_white-gold.png')}"><p>Full detail: for Etsy graphics and print</p></div>
   <div style="flex:1;text-align:center"><img style="width:100%" src="data:image/png;base64,${f('logo-embroidery-safe_dark-hats_white-gold.png')}"><p>Embroidery-safe: for the hat</p></div></body>`);
  await p.screenshot({ path: `${OUT}/mockups/full-detail-vs-embroidery-safe.png` });
  await b.close();
})();
