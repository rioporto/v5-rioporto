#!/bin/bash

# Script para deploy direto na branch production após configurar no Vercel

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

# Fazer push direto para production
echo "📤 Fazendo push para branch production..."
git push origin production

echo "✅ Deploy iniciado!"
echo "📌 Verifique o progresso em: https://vercel.com/dashboard"