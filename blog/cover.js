// Portada de artículo del blog (1600x900 JPG).
// Uso: node blog/cover.js blog/covers/<slug>.json blog/covers/<slug>.jpg
// spec: { kicker, title ("*palabra*" = cursiva en acento), sub?, theme: cream|sand|ink|terra|olive,
//         motif: residencia|limpieza|llaves|maleta|birrete  (o "svg": "<...>" propio, viewBox 0 0 640 640),
//         cards?: [{x,y,t,small?,pill?}], titleSize? }
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [specPath, out] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 900 } });
  await p.goto('file://' + path.resolve(__dirname, 'cover.html'));
  await p.evaluate((s) => window.paint(s), spec);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: out, type: 'jpeg', quality: 88 });
  await b.close();
  console.log('ok', out);
})();
