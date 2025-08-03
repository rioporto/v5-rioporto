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

echo "✅ Push concluído!"
echo "📌 O Vercel iniciará o deploy automaticamente"
echo ""
echo "💡 NOTA: O webhook NÃO será disparado para evitar deploys duplicados"
echo "   O Vercel já detecta automaticamente pushes na branch production"

# NÃO disparar webhook para evitar duplicação
# RESPONSE=$(curl -s -X POST "$WEBHOOK_URL")

# Verificar status após 5 segundos
echo "⏳ Aguardando 5 segundos para verificar status..."
sleep 5
npm run vercel:status 2>/dev/null || echo "💡 Use 'npm run vercel:status' para verificar o progresso"