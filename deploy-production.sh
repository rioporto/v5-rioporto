#!/bin/bash

# Script para deploy direto na branch production usando webhook do Vercel

echo "🚀 Deploy direto na branch production"
echo "======================================="

# Carregar configuração do webhook
if [ -f ".vercel-webhook" ]; then
    source .vercel-webhook
else
    echo "❌ Erro: Arquivo .vercel-webhook não encontrado"
    exit 1
fi

# Verificar branch atual
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
    echo "❌ Erro: Você não está na branch $BRANCH"
    echo "Execute: git checkout $BRANCH"
    exit 1
fi

# Verificar status
echo "📊 Status atual:"
git status --short

# Confirmar deploy
read -p "Deseja fazer deploy? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deploy cancelado"
    exit 1
fi

# Fazer push para production
echo "📤 Fazendo push para branch $BRANCH..."
git push origin $BRANCH

# Disparar webhook do Vercel
echo "🔄 Disparando deploy no Vercel..."
RESPONSE=$(curl -s -X POST "$WEBHOOK_URL")

# Extrair job ID da resposta
JOB_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

echo "✅ Deploy iniciado!"
echo "📌 Job ID: $JOB_ID"
echo "📌 Verifique o progresso em: https://vercel.com/dashboard"

# Verificar status após 5 segundos
echo "⏳ Aguardando 5 segundos para verificar status..."
sleep 5
npm run vercel:status 2>/dev/null || echo "💡 Use 'npm run vercel:status' para verificar o progresso"