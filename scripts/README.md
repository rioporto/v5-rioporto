# Scripts de Deploy - RioPorto

## 🔒 Segurança

Estes scripts são **seguros para repositório público** pois:
- ✅ Não contêm credenciais hardcoded
- ✅ Usam variáveis de ambiente para tokens
- ✅ São ferramentas úteis de automação

## 📋 Scripts Disponíveis

### 1. deploy-now.sh
Deploy direto usando Vercel CLI
```bash
./deploy-now.sh
```

### 2. check-deploy.sh
Verifica status do último deploy
```bash
./scripts/check-deploy.sh
```

### 3. monitor-deploy.py
Monitora deploy em tempo real
```bash
python3 scripts/monitor-deploy.py
```

### 4. vercel-deploy.js
Deploy automático com push para GitHub
```bash
# Configurar tokens primeiro:
export VERCEL_TOKEN=seu_token_aqui
export GITHUB_TOKEN=seu_token_aqui

node scripts/vercel-deploy.js
```

## ⚠️ IMPORTANTE

**NUNCA** coloque tokens diretamente nos scripts!
Sempre use variáveis de ambiente:
- `VERCEL_TOKEN` - Token da API do Vercel
- `GITHUB_TOKEN` - Token do GitHub (com permissão de push)

## 🛡️ Boas Práticas

1. Crie um arquivo `.env` local (nunca commitar!)
2. Adicione seus tokens no `.env`
3. Use `source .env` antes de rodar os scripts
4. Ou configure as variáveis no seu shell profile