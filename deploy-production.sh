#!/bin/bash

# Script para deploy direto na branch production usando webhook do Vercel

echo "🚀 Deploy direto na branch production"
echo "======================================="

# Verificar branch atual
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "production" ]; then
    echo "❌ Erro: Você não está na branch production"
    echo "Execute: git checkout production"
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
echo "📤 Fazendo push para branch production..."
git push origin production

# Disparar webhook do Vercel
echo "🔄 Disparando deploy no Vercel..."
RESPONSE=$(curl -s -X POST "https://api.vercel.com/v1/integrations/deploy/prj_JdNmOnGUK2lEOK69tMo0dpdFY2ry/PgPyggDXP9")

# Extrair job ID da resposta
JOB_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

echo "✅ Deploy iniciado!"
echo "📌 Job ID: $JOB_ID"
echo "📌 Verifique o progresso em: https://vercel.com/dashboard"