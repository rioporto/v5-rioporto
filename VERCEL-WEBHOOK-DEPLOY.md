# 🚀 Deploy via Webhook no Vercel

## ✅ Webhook Configurado

URL do Deploy Hook:
```
https://api.vercel.com/v1/integrations/deploy/prj_JdNmOnGUK2lEOK69tMo0dpdFY2ry/PgPyggDXP9
```

## 📋 Como Usar

### Opção 1: Script Automático
```bash
# Use o script que faz tudo automaticamente
./deploy-production.sh
```

### Opção 2: Deploy Manual
```bash
# 1. Fazer push para GitHub
git push origin production

# 2. Disparar o webhook
curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_JdNmOnGUK2lEOK69tMo0dpdFY2ry/PgPyggDXP9"
```

### Opção 3: Comando Único
```bash
# Push + Deploy em um comando
git push origin production && curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_JdNmOnGUK2lEOK69tMo0dpdFY2ry/PgPyggDXP9"
```

## 🔄 Fluxo de Deploy

1. **Você faz commit** na branch `production`
2. **Push para GitHub**: `git push origin production`
3. **Dispara webhook**: O Vercel inicia o build
4. **Deploy automático**: Site atualizado em ~2 minutos

## ⚡ Vantagens do Webhook

- ✅ Deploy direto da branch `production`
- ✅ Não precisa fazer merge para `main`
- ✅ Controle total sobre quando deployar
- ✅ Pode automatizar com CI/CD

## 🛠️ Automação Futura

Você pode integrar este webhook em:
- GitHub Actions
- Scripts de CI/CD
- Hooks de pré-commit
- Ferramentas de automação

## 📊 Verificar Status

Após disparar o webhook:
1. Acesse: https://vercel.com/dashboard
2. Veja o build em progresso
3. O webhook retorna um Job ID para rastreamento

## 🚨 Importante

- O webhook sempre faz deploy da branch `production`
- Certifique-se de fazer push antes de disparar o webhook
- O deploy leva em média 1-2 minutos