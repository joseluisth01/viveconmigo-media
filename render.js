// Renderiza un vídeo vertical 1080x1920 a partir de un spec JSON.
// Uso: node render.js specs/xxx.json out/xxx.mp4 [--probe 1.5,4,8]  (con --probe saca PNGs en vez del mp4)
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

const [specPath, out, flag, probe] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const fps = 30;

// Voz en off (opcional): scene.vo = "texto" o [{t, rate?, pitch?, pause?}, ...]; spec.voice = {voice, rate, pitch, gain}.
// Se genera con tools/tts.py y, si la voz no cabe, la escena se alarga sola (vo empieza en scene.voAt, por defecto 0.15 s).
let voFiles = [];
if (spec.scenes.some((s) => s.vo)) {
  const v = spec.voice || {};
  const dir = path.join(os.tmpdir(), 'vo-' + path.basename(specPath, '.json'));
  const items = spec.scenes.map((s) => !s.vo ? [] : (typeof s.vo === 'string' ? [{ t: s.vo }] : s.vo));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'in.json'), JSON.stringify({ voice: v.voice || 'es-ES-AlvaroNeural', rate: v.rate || '+18%', pitch: v.pitch || '+0Hz', items }));
  const durs = JSON.parse(execFileSync('python3', [path.join(__dirname, 'tools/tts.py'), path.join(dir, 'in.json'), dir]).toString().trim().split('\n').pop());
  let t = 0;
  spec.scenes.forEach((s, i) => {
    const at = s.voAt != null ? s.voAt : 0.15;
    if (durs[i] > 0) {
      const need = +(at + durs[i] + (s.voPad != null ? s.voPad : 0.3)).toFixed(2);
      if (!s.dur || s.dur < need) { console.log(`escena ${i} (${s.type}): ${s.dur} -> ${need} s por la voz`); s.dur = need; }
      voFiles.push({ file: path.join(dir, i + '.wav'), at: t + at });
    }
    t += s.dur || 3;
  });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.addInitScript((s) => { window.SPEC = s; }, spec);
  await page.goto('file://' + path.resolve(__dirname, 'engine.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  const dur = await page.evaluate(() => window.DURATION);

  // portada para Metricool: la diseñada (spec.cover) o, si no hay, un frame del gancho
  async function renderCover(pg, file) {
    await pg.evaluate((x) => window.render(x), spec.coverAt || 2.2);
    await pg.evaluate(() => window.renderCover());
    await pg.screenshot({ path: file, type: 'jpeg', quality: 90 });
  }

  if (flag === '--cover') { await renderCover(page, out); console.log('cover', out); await browser.close(); return; }

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
  const coverFrames = spec.cover ? 9 : 0;           // 0.3 s
  const outDur = (total + coverFrames) / fps;
  // Música: spec.music = id de assets/music/catalog.json (CC0). Se mezcla dentro del vídeo con fundidos.
  let audioIn = ['-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100'];
  let audioFilter = [];
  if (spec.music) {
    const file = path.resolve(__dirname, 'assets/music', spec.music + '.mp3');
    if (!fs.existsSync(file)) throw new Error('No existe la música ' + spec.music + ' (mira assets/music/catalog.json)');
    const vol = spec.musicVolume || 1.0, fo = Math.max(0, outDur - 1.8);
    audioIn = ['-ss', String(spec.musicStart || 0), '-i', file];
    audioFilter = ['-af', `volume=${vol},afade=t=in:d=0.3,afade=t=out:st=${fo.toFixed(2)}:d=1.8`];
  }
  let audioMap = ['-map', '1:a'];
  if (voFiles.length) {
    // música más baja + compresión lateral (baja aún más cuando habla la voz) + voz delante
    const mus = audioFilter.length ? audioFilter[1] : 'volume=1';
    const g = (spec.voice && spec.voice.gain) || 1.6, mv = (spec.voice && spec.voice.music) || 0.45;
    const n = voFiles.length;
    const parts = [`[1:a]${mus},volume=${mv}[mus]`];
    voFiles.forEach((v, k) => { const ms = Math.round(v.at * 1000); parts.push(`[${k + 2}:a]adelay=${ms}|${ms}[v${k}]`); });
    parts.push(`${voFiles.map((_, k) => `[v${k}]`).join('')}amix=inputs=${n}:normalize=0,volume=${g},asplit[va][vb]`);
    parts.push(`[mus][va]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[duck]`);
    parts.push(`[duck][vb]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.95[aout]`);
    audioIn = [...audioIn, ...voFiles.flatMap((v) => ['-i', v.file])];
    audioFilter = ['-filter_complex', parts.join(';')];
    audioMap = ['-map', '[aout]'];
  }
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    ...audioIn,
    '-map', '0:v', ...audioMap,
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p',
    ...audioFilter,
    '-c:a', 'aac', '-b:a', '160k', '-t', outDur.toFixed(2), '-movflags', '+faststart', out,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < total; i++) {
    await page.evaluate((x) => window.render(x), i / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  }
  // Portada diseñada en los últimos 0.3 s del vídeo: así Buffer/Instagram pueden usarla como
  // portada con thumbnailOffset (ms) = coverOffsetMs (se guarda en <salida>.json).
  if (spec.cover) {
    await page.evaluate((x) => window.render(x), dur - 0.01);
    const hasCover = await page.evaluate(() => window.renderCover());
    if (hasCover) {
      const cbuf = await page.screenshot({ type: 'jpeg', quality: 92 });
      for (let k = 0; k < coverFrames; k++) if (!ff.stdin.write(cbuf)) await new Promise((r) => ff.stdin.once('drain', r));
    }
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await page.screenshot({ path: out.replace(/\.mp4$/, '-cover.jpg'), type: 'jpeg', quality: 90 });
  fs.writeFileSync(out.replace(/\.mp4$/, '.json'), JSON.stringify({ duration: +outDur.toFixed(2), coverOffsetMs: Math.round((total + coverFrames / 2) / fps * 1000), music: spec.music || null, voice: voFiles.length ? ((spec.voice && spec.voice.voice) || 'es-ES-AlvaroNeural') : null }, null, 1));
  console.log('ok', out, dur.toFixed(1) + 's');
  await browser.close();
})();
