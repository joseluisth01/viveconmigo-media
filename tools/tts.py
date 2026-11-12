# Voz en off para los vídeos (voz neural es-ES de Edge, por defecto Álvaro).
# Uso: python3 tools/tts.py <entrada.json> <carpeta_salida>
# entrada: {"voice": "es-ES-AlvaroNeural", "rate": "+18%", "pitch": "+0Hz",
#           "items": [ [ {"t": "frase", "rate"?: "+25%", "pitch"?: "+10Hz", "pause"?: 0.15}, ... ], ... ]}
# Cada item (uno por escena) es una lista de frases; cada frase puede llevar su propio ritmo y tono
# (así la voz suena más expresiva) y se unen con una pausa corta. Escribe <i>.wav y devuelve
# por stdout un JSON con la duración de cada item.
import asyncio, json, os, ssl, subprocess, sys

try:
    import edge_tts, edge_tts.communicate as comm
except ImportError:
    subprocess.run([sys.executable, '-m', 'pip', 'install', '-q', 'edge-tts', '--break-system-packages'], check=True)
    import edge_tts, edge_tts.communicate as comm

CA = '/root/.ccr/ca-bundle.crt'
if os.path.exists(CA):  # proxy de la sesión en la nube
    comm._SSL_CTX = ssl.create_default_context(cafile=CA)


def ff(*a):
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', *a], check=True)


def dur(f):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f],
                                capture_output=True, text=True).stdout.strip())


async def say(text, voice, rate, pitch, out):
    for attempt in range(3):
        try:
            await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(out)
            if os.path.getsize(out) > 1000:
                return
        except Exception as e:  # reintento si el servicio corta
            err = e
        await asyncio.sleep(2)
    raise RuntimeError(f'TTS falló: {text!r} {err if "err" in dir() else ""}')


async def main(inp, outdir):
    cfg = json.load(open(inp, encoding='utf-8'))
    voice, rate, pitch = cfg.get('voice', 'es-ES-AlvaroNeural'), cfg.get('rate', '+18%'), cfg.get('pitch', '+0Hz')
    os.makedirs(outdir, exist_ok=True)
    durs = []
    for i, phrases in enumerate(cfg['items']):
        if not phrases:
            durs.append(0); continue
        parts = []
        for j, p in enumerate(phrases):
            mp3, wav = f'{outdir}/{i}-{j}.mp3', f'{outdir}/{i}-{j}.wav'
            await say(p['t'], voice, p.get('rate', rate), p.get('pitch', pitch), mp3)
            trim = 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse'
            ff('-i', mp3, '-af', trim, '-ar', '44100', '-ac', '2', wav)
            parts.append(wav)
            if j < len(phrases) - 1:
                gap = f'{outdir}/{i}-{j}-gap.wav'
                ff('-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100', '-t', str(p.get('pause', 0.12)), gap)
                parts.append(gap)
        lst = f'{outdir}/{i}.txt'
        open(lst, 'w').write(''.join(f"file '{os.path.abspath(x)}'\n" for x in parts))
        ff('-f', 'concat', '-safe', '0', '-i', lst, '-c', 'pcm_s16le', f'{outdir}/{i}.wav')
        durs.append(round(dur(f'{outdir}/{i}.wav'), 3))
    print(json.dumps(durs))


asyncio.run(main(sys.argv[1], sys.argv[2]))
