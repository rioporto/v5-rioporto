#!/bin/bash

# Script para disparar APENAS o webhook do Vercel (sem git push)
# Use quando quiser forçar um redeploy sem fazer push

echo "🚀 Deploy via Webhook (sem git push)"
echo "======================================="

# Carregar configuração do webhook
if [ -f ".vercel-webhook" ]; then
    source .vercel-webhook
else
    echo "❌ Erro: Arquivo .vercel-webhook não encontrado"
    exit 1
fi

# Confirmar deploy
read -p "Deseja disparar o webhook de deploy? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deploy cancelado"
    exit 1
fi

# Disparar webhook do Vercel
echo "🔄 Disparando deploy no Vercel..."
RESPONSE=$(curl -s -X POST "$WEBHOOK_URL")

# Extrair job ID da resposta
JOB_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

echo "✅ Deploy iniciado via webhook!"
echo "📌 Job ID: $JOB_ID"
echo "📌 Verifique o progresso em: https://vercel.com/dashboard"

# Verificar status após 5 segundos
echo "⏳ Aguardando 5 segundos para verificar status..."
sleep 5
npm run vercel:status 2>/dev/null || echo "💡 Use 'npm run vercel:status' para verificar o progresso"