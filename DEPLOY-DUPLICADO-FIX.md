# 🔧 Correção de Deploy Duplicado

## 🐛 Problema Identificado
O Vercel estava criando 2 deploys para cada push:
1. **Deploy Automático**: Vercel detecta push no GitHub e cria deploy
2. **Deploy via Webhook**: Script disparava webhook criando outro deploy

## ✅ Solução Implementada

### 1. Script Principal Atualizado: `deploy-production.sh`
- **Agora**: Apenas faz `git push` (sem webhook)
- **Motivo**: Vercel já detecta automaticamente pushes na branch `production`
- **Resultado**: Apenas 1 deploy por push

### 2. Novo Script Criado: `deploy-webhook-only.sh`
- **Uso**: Quando quiser forçar redeploy sem fazer push
- **Exemplo**: Redeployar após mudança de variáveis de ambiente

## 📋 Como Usar Agora

### Deploy Normal (com código novo)
```bash
# Faz push e Vercel deploya automaticamente
./deploy-production.sh
```

### Forçar Redeploy (sem push)
```bash
# Dispara webhook para redeploy do código atual
./deploy-webhook-only.sh
```

### Deploy Manual Completo
```bash
# Se preferir fazer tudo manualmente
git push origin production
# Aguarde - Vercel detectará e fará deploy automaticamente
```

## ⚙️ Configurações no Vercel

### Opção A: Manter Como Está (Recomendado)
- ✅ Auto-deploy da branch `production` habilitado
- ✅ Webhook disponível para redeploys manuais
- ✅ Scripts atualizados para evitar duplicação

### Opção B: Desabilitar Auto-deploy (Alternativa)
Se preferir usar APENAS webhook:
1. Vá para Settings > Git no Vercel
2. Desabilite os eventos de deploy automático
3. Use o webhook para todos os deploys

## 🎯 Resultado Esperado
- **Antes**: 2 deploys por push (duplicado)
- **Agora**: 1 deploy por push (correto)

## 📊 Como Verificar
```bash
# Ver lista de deploys recentes
npm run vercel:list

# Verificar último deploy
npm run vercel:status
```

---
**Criado em**: 04/08/2025
**Problema resolvido**: Deploy duplicado no Vercel