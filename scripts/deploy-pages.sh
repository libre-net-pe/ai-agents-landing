#!/bin/sh
# Redespliega la landing en GitHub Pages (rama gh-pages, dominio chatbot.libre.net.pe).
# Uso: sh scripts/deploy-pages.sh
set -e

REPO_URL="${REPO_URL:-https://github.com/libre-net-pe/ai-agents-landing.git}"

# Sirve en la raíz de chatbot.libre.net.pe (sin subruta).
unset BASE_PATH
yarn run build

TMP=$(mktemp -d)
cp -r build/. "$TMP/"
cd "$TMP"
git init -q -b gh-pages
git add -A
git commit -qm "Deploy Sami landing (build $(date -u +%Y-%m-%dT%H:%MZ))"
git push -qf "$REPO_URL" gh-pages
cd - >/dev/null
rm -rf "$TMP"
echo "Publicado en https://chatbot.libre.net.pe/"
