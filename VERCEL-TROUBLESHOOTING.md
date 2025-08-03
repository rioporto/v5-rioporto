# Troubleshooting: Página "EM BREVE" no Vercel

## 🔍 Testes para Diagnóstico

### 1. Teste de API
Acesse: `https://rioporto.com.br/api/health`
- ✅ Se retornar JSON com status "ok" = Next.js está rodando
- ❌ Se retornar 404 ou EM BREVE = Problema de configuração

### 2. Teste de Arquivo Estático
Acesse: `https://rioporto.com.br/deployment-test.txt`
- ✅ Se mostrar o conteúdo do arquivo = Public directory está OK
- ❌ Se mostrar EM BREVE = Problema no servidor

### 3. Verificar Console do Navegador
- Abra DevTools (F12)
- Veja se há mensagem: "Home page loaded - Version 1.0.1"
- Se não houver = JavaScript não está executando

## 🛠️ Soluções por Ordem de Prioridade

### Solução 1: Verificar Configurações do Vercel
1. Acesse dashboard.vercel.com
2. Vá em Project Settings > General
3. Verifique:
   - **Framework Preset**: Next.js (NÃO "Other")
   - **Build Command**: `npm run build` ou deixe vazio
   - **Output Directory**: `.next` ou deixe vazio
   - **Install Command**: `npm install` ou deixe vazio
   - **Development Command**: `npm run dev` ou deixe vazio

### Solução 2: Force Redeploy
1. Vá em Deployments
2. Clique nos 3 pontos do último deploy
3. Selecione "Redeploy"
4. **IMPORTANTE**: Desmarque "Use existing Build Cache"

### Solução 3: Verificar Branch
1. Em Settings > Git
2. Production Branch deve ser: `production`
3. Se estiver diferente, mude e faça redeploy

### Solução 4: Limpar e Recriar Projeto
1. **No Vercel:**
   - Settings > Advanced > Delete Project
   - Confirme a exclusão

2. **Criar Novo Projeto:**
   - Import Git Repository
   - Selecione: rioporto/v5-rioporto
   - Branch: `production`
   - Framework: Deve auto-detectar "Next.js"
   - Deploy

### Solução 5: Verificar DNS (para subdomínios)
Se v5 continua com DNS_PROBE_FINISHED_NXDOMAIN:
1. No Cloudflare, verifique registro CNAME para v5
2. Deve apontar para: `cname.vercel-dns.com`
3. Proxy deve estar DESATIVADO (cinza)
4. Aguarde 10-15 minutos para propagação

## 📝 Checklist de Verificação

- [ ] Framework Preset = Next.js
- [ ] Branch = production
- [ ] Build sem cache
- [ ] /api/health retorna JSON
- [ ] Console mostra log da home
- [ ] Todos os overrides desativados
- [ ] DNS correto para subdomínios

## 🚨 Se Nada Funcionar

1. **Verifique os Logs de Build:**
   - Procure por erros de compilação
   - Verifique se detectou Next.js
   - Confirme que criou pasta .next

2. **Teste Local:**
   ```bash
   npm run build
   npm start
   ```
   Acesse http://localhost:3000

3. **Contate Suporte Vercel:**
   - Mencione: "Next.js app showing wrong content"
   - Forneça: Project ID e deployment URL

## 📊 Status Esperado Após Correção

- **rioporto.com.br**: Sistema completo com login/registro
- **v1.rioporto.com.br**: Demo Minimalista
- **v2.rioporto.com.br**: Demo Financial Dashboard
- **v3.rioporto.com.br**: Demo Crypto Native
- **v4.rioporto.com.br**: Demo Institucional
- **v5.rioporto.com.br**: Demo Gaming/Web3

---
Última atualização: 03/08/2025 22:30