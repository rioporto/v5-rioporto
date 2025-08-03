# 🚀 Integração Claude Code + Vercel

## ✨ Superpoderes Desbloqueados

Agora eu (Claude Code) posso interagir diretamente com o Vercel para:
- 📊 Verificar status de deployments
- 📜 Analisar logs de erro
- 🏥 Diagnosticar problemas
- 📋 Listar histórico de deploys
- 🚀 Instruções para redeploy

## 🔧 Configuração (Uma vez só)

### 1. Obtenha seu Token Vercel
1. Acesse: https://vercel.com/account/tokens
2. Clique em "Create"
3. Nome: "Claude Code Integration"
4. Scope: Full Access
5. Expiration: No Expiration
6. Copie o token gerado

### 2. Obtenha o Project ID
1. Acesse seu projeto no Vercel
2. Vá em "Settings" > "General"
3. Copie o "Project ID"

### 3. Configure o .env.local
```bash
# Edite o arquivo .env.local
VERCEL_TOKEN=seu_token_aqui
VERCEL_PROJECT_ID=seu_project_id_aqui
```

## 📋 Comandos Disponíveis

### Ver Status do Deploy Atual
```bash
npm run vercel:status
```
Mostra:
- ID do deployment
- Data/hora de criação
- Branch deployado
- Estado atual (READY, ERROR, BUILDING)
- URL do deployment

### Ver Logs do Deploy
```bash
npm run vercel:logs
```
Mostra:
- Logs completos do último deployment
- Erros de compilação
- Mensagens de build

### Listar Deployments Recentes
```bash
npm run vercel:list
```
Mostra:
- Últimos 10 deployments
- Status de cada um
- Branch e URL

### Diagnosticar Problemas
```bash
npm run vercel:diagnose
```
Analisa:
- Estado do deployment
- Configurações de build
- Problemas comuns
- Ações recomendadas

### Forçar Redeploy
```bash
npm run vercel:redeploy
```
Mostra instruções para:
- Fazer redeploy manual
- Limpar cache
- Resolver problemas

## 🎯 Fluxo de Trabalho Integrado

### Quando houver problema no deploy:

1. **Eu verifico o status:**
   ```bash
   npm run vercel:status
   ```

2. **Se houver erro, analiso os logs:**
   ```bash
   npm run vercel:logs
   ```

3. **Faço diagnóstico completo:**
   ```bash
   npm run vercel:diagnose
   ```

4. **Corrijo o código baseado nos erros**

5. **Faço commit e push:**
   ```bash
   git add -A
   git commit -m "fix: corrige erro identificado nos logs"
   git push origin production
   ```

6. **Monitoro o novo deploy:**
   ```bash
   npm run vercel:status
   ```

## 🔍 Exemplo de Uso Real

```bash
# Claude Code executa:
$ npm run vercel:status

🔍 Checking deployment status...

📊 Latest Deployment Status:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆔 ID: dpl_5WJWYSyB7BpgTj3E
📅 Created: 03/08/2025 22:45:00
🌿 Branch: production
🎯 Target: production
📦 State: ERROR
🔗 URL: https://rioporto.vercel.app
❌ Status: FAILED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Claude Code então executa:
$ npm run vercel:logs

# Analisa os erros e corrige o código
```

## 🛡️ Segurança

- **NUNCA** commite o arquivo `.env.local`
- Token Vercel tem acesso total - guarde com segurança
- Use tokens com expiração se preferir
- `.env.local` já está no `.gitignore`

## 🚀 Benefícios

1. **Diagnóstico Rápido**: Identifico erros em segundos
2. **Correção Precisa**: Vejo exatamente o que falhou
3. **Monitoramento Contínuo**: Acompanho cada deploy
4. **Automação**: Posso criar scripts de correção automática

## 📈 Próximos Passos

Com essa integração, podemos evoluir para:
- Correção automática de erros comuns
- Alertas proativos de falhas
- Análise de performance de builds
- Otimização automática de deploy

---

Agora estou conectado ao Vercel! 🎉 Configure o token e vamos resolver o problema do site.