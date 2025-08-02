# 🚀 Deploy Manual no Vercel (Sem GitHub)

Como estamos com problema de arquivos grandes no Git, vamos fazer deploy manual:

## Opção 1: Deploy via CLI (RECOMENDADO)

```bash
# 1. Instalar Vercel CLI se ainda não tiver
npm i -g vercel

# 2. Login no Vercel
vercel login

# 3. Deploy direto (sem Git)
vercel --prod

# Siga os prompts:
# - Set up and deploy? Y
# - Which scope? (selecione sua conta)
# - Link to existing project? Y (se já criou no dashboard)
# - What's the name? v5-rioporto
```

## Opção 2: Drag & Drop no Dashboard

1. Faça build local:
```bash
npm run build
```

2. Crie um ZIP do projeto (sem node_modules):
```bash
# Linux/Mac
zip -r v5-rioporto.zip . -x "node_modules/*" ".git/*" "*.log"

# Windows
# Use algum programa de ZIP e exclua node_modules
```

3. Acesse: https://vercel.com/new
4. Arraste o ZIP para a área de upload

## Opção 3: Deploy via GitHub (Resolvendo o problema)

### Criar novo repositório limpo:

```bash
# 1. Criar novo branch órfão
git checkout --orphan clean-main

# 2. Adicionar arquivos (sem node_modules)
git add .
git reset -- node_modules/

# 3. Commit inicial limpo
git commit -m "Initial commit - RioPorto P2P v5"

# 4. Forçar push
git push -f origin clean-main:main
```

## 🎯 Após o Deploy

1. **Configurar Domínios** no Vercel Dashboard:
   - v1.rioporto.com.br
   - v2.rioporto.com.br
   - v3.rioporto.com.br
   - v4.rioporto.com.br
   - v5.rioporto.com.br

2. **Variáveis de Ambiente**:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://rioporto.com.br
   ```

3. **Testar cada subdomínio**

## 📝 Notas

- O Vercel fará o build automaticamente
- Não precisa fazer upload de node_modules
- O deploy via CLI é mais rápido
- Você pode continuar usando Git após resolver o problema