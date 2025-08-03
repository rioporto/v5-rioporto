# 📋 Configuração do Production Branch no Vercel

## 🎯 Objetivo
Configurar o Vercel para fazer deploy automático da branch `production` ao invés de `main`.

## 📍 Onde Configurar no Vercel

### 1. Acesse Settings > Git
No dashboard do Vercel, vá para:
- **Your Project** → **Settings** → **Git**

### 2. Localize "Production Branch"
Procure pela seção **Production Branch** que deve estar no topo da página, antes de "Deploy Hooks".

### 3. Opções de Localização:
Se não encontrar imediatamente, pode estar em:

**Opção A - No topo da página Git:**
- Logo após "Git Repository"
- Campo dropdown ou input para selecionar branch

**Opção B - Em Settings > Domains:**
- Às vezes a configuração de branch aparece junto com domínios
- Procure por "Production Branch" nesta seção

**Opção C - Reconectar Repositório:**
1. Settings > Git
2. Clique em "Disconnect" ou "Change Repository"
3. Reconecte selecionando:
   - Repository: `rioporto/v5-rioporto`
   - Production Branch: `production` (não `main`)

## 🔧 Após Configurar

### 1. Teste Imediato
```bash
# Na branch production
git add .
git commit -m "test: verificando deploy direto da branch production"
git push origin production
```

### 2. Usar Script de Deploy
```bash
# Use o script criado
./deploy-production.sh
```

### 3. Verificar Deploy
- Acesse: https://vercel.com/dashboard
- O deploy deve iniciar automaticamente
- Status: "Building from branch: production"

## ⚠️ Importante
- Após mudar, todos os deploys serão da branch `production`
- Não será mais necessário: `git push origin production:main`
- Apenas: `git push origin production`

## 🐛 Troubleshooting

### Se não encontrar a opção:
1. Tire um print da página Settings > Git completa
2. Verifique se o projeto está conectado ao GitHub corretamente
3. Tente reconectar o repositório

### Se o deploy não funcionar:
1. Verifique se a branch production existe no GitHub
2. Confirme que o Vercel tem acesso ao repositório
3. Verifique os logs de build no Vercel

## 📝 Status Atual
- Branch de desenvolvimento: `production`
- Branch no Vercel: `main` (queremos mudar para `production`)
- Comando atual: `git push origin production:main`
- Comando desejado: `git push origin production`