#!/bin/bash

# Script de deploy automático para Vercel

echo "🚀 Iniciando deploy automático..."

# Verifica se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm i -g vercel
fi

# Deploy direto sem Git
echo "🔨 Fazendo build e deploy..."
vercel --prod --yes --no-clipboard

# Verifica o status
if [ $? -eq 0 ]; then
    echo "✅ Deploy concluído com sucesso!"
    echo "📊 Verifique o status em: https://vercel.com/dashboard"
else
    echo "❌ Deploy falhou. Verifique os logs acima."
fi