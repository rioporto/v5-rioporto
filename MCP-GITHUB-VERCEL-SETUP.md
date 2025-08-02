# 🔗 Conectando Claude ao GitHub e Vercel via MCP

## 📊 Status Atual

✅ **Resolvido**:
- Push para GitHub bem-sucedido!
- Componentes de analytics criados
- Branch limpo sem node_modules

⏳ **Próximos passos**:
- O Vercel deve detectar o push automaticamente
- Deploy será feito em todos os 5 subdomínios

## 🎯 Configurando MCP para Claude

### 1. GitHub MCP

Para eu (Claude) acompanhar status de commits e PRs:

**Opção A: GitHub Actions (já criado)**
- Arquivo `.github/workflows/vercel-deploy-check.yml` já está no projeto
- Mostra status de build antes do Vercel

**Opção B: GitHub API Token**
```bash
# Criar token em: https://github.com/settings/tokens
# Permissões necessárias: repo, workflow
```

### 2. Vercel MCP/API

Para eu acompanhar deploys e erros:

**Criar Token Vercel**:
1. Acesse: https://vercel.com/account/tokens
2. Crie um token com nome "claude-mcp"
3. Salve o token

**Configurar no Claude**:
```json
{
  "vercel": {
    "token": "seu-token-aqui",
    "teamId": "seu-team-id" 
  }
}
```

## 📊 Verificando o Deploy

### No Vercel Dashboard:
1. Vá em **Deployments**
2. Procure pelo deploy mais recente
3. Status deve ser "Building" → "Ready"

### Logs de Erro:
Se houver erro, você verá:
- ❌ Ícone vermelho
- Clique para ver detalhes
- Compartilhe comigo o erro

### Teste os Subdomínios:
```bash
# Após deploy concluído
curl https://v1.rioporto.com.br
curl https://v2.rioporto.com.br
curl https://v3.rioporto.com.br
curl https://v4.rioporto.com.br
curl https://v5.rioporto.com.br
```

## 🚀 Próximos Deploys

Agora que está funcionando:
```bash
# Qualquer alteração
git add .
git commit -m "feat: sua alteração"
git push

# Vercel detecta e faz deploy automático!
```

## ✅ Checklist Final

- [x] GitHub push funcionando
- [x] Componentes analytics criados
- [ ] Vercel fazendo build
- [ ] Todos os 5 subdomínios funcionando
- [ ] Variáveis de ambiente configuradas

## 📝 Notas

- O primeiro deploy pode demorar 3-5 minutos
- DNS pode levar até 48h para propagar
- Teste com `?theme=financial` se subdomínio não funcionar