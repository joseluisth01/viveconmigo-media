// Renderiza un vídeo vertical 1080x1920 a partir de un spec JSON.
// Uso: node render.js specs/xxx.json out/xxx.mp4 [--probe 1.5,4,8]  (con --probe saca PNGs en vez del mp4)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const [specPath, out, flag, probe] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const fps = 30;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.addInitScript((s) => { window.SPEC = s; }, spec);
  await page.goto('file://' + path.resolve(__dirname, 'engine.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  const dur = await page.evaluate(() => window.DURATION);

  if (flag === '--probe') {
    const times = (probe || '').split(',').filter(Boolean).map(Number);
    for (const t of times) {
      await page.evaluate((x) => window.render(x), t);
      await page.screenshot({ path: `${out}-${t}.png` });
    }
    console.log('duration', dur);
    await browser.close();
    return;
  }

  const total = Math.round(dur * fps);
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-shortest', '-movflags', '+faststart', out,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < total; i++) {
    await page.evaluate((x) => window.render(x), i / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  // portada (frame del gancho) para Metricool
  await page.evaluate((x) => window.render(x), spec.coverAt || 1.6);
  await page.screenshot({ path: out.replace(/\.mp4$/, '-cover.jpg'), type: 'jpeg', quality: 90 });
  console.log('ok', out, dur.toFixed(1) + 's');
  await browser.close();
})();
