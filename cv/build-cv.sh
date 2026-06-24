#!/usr/bin/env bash
# Renderiza cv/curriculum.html -> public/curriculum.pdf con Chromium headless.
#
# Uso:   ./cv/build-cv.sh
# Chrome: se autodetecta el Chromium de Playwright (~/Library/Caches/ms-playwright).
#         Override con CHROME=/ruta/a/chrome ./cv/build-cv.sh
#
# QR (cv/qr.svg): solo hay que regenerarlo si cambia la URL del portfolio.
#   python3 -m venv /tmp/venv && /tmp/venv/bin/pip install segno
#   /tmp/venv/bin/python -c "import segno,re; \
#     qr=segno.make('https://ketaloca.dev',error='m'); \
#     qr.save('cv/qr.svg',scale=1,border=2,dark='#0f172a',light='#ffffff',xmldecl=False); \
#     s=open('cv/qr.svg').read(); w=re.search(r'width=\"(\d+)\"',s).group(1); \
#     open('cv/qr.svg','w').write(s.replace(f'width=\"{w}\" height=\"{w}\"', \
#       f'viewBox=\"0 0 {w} {w}\" width=\"100%\" height=\"100%\" shape-rendering=\"crispEdges\"',1))"

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HTML="$ROOT/cv/curriculum.html"
OUT="$ROOT/public/curriculum.pdf"

# Localizar Chromium: env CHROME, o el de Playwright (el más reciente).
if [[ -n "${CHROME:-}" ]]; then
  CHROME_BIN="$CHROME"
else
  CHROME_BIN="$(ls -dt \
    "$HOME/Library/Caches/ms-playwright"/chromium-*/chrome-mac*/*.app/Contents/MacOS/* \
    "$HOME/Library/Caches/ms-playwright"/chromium-*/chrome-linux/chrome \
    2>/dev/null | head -n1 || true)"
fi

if [[ -z "${CHROME_BIN:-}" || ! -x "$CHROME_BIN" ]]; then
  echo "ERROR: no encuentro Chromium. Pásalo con CHROME=/ruta/a/chrome $0" >&2
  exit 1
fi

echo "Chrome:  $CHROME_BIN"
echo "HTML:    $HTML"
echo "Salida:  $OUT"

"$CHROME_BIN" \
  --headless \
  --disable-gpu \
  --no-sandbox \
  --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=5000 \
  --print-to-pdf="$OUT" \
  "file://$HTML"

echo "OK -> $OUT ($(du -h "$OUT" | cut -f1))"
