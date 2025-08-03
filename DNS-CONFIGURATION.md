# Configuração de DNS para RioPorto P2P

## Status Atual (03/08/2025)

### Problema Identificado
- Subdomínio v5.rioporto.com.br retornando `DNS_PROBE_FINISHED_NXDOMAIN`
- Outros subdomínios (v1-v4) redirecionando para página de construção

## Configuração Necessária no Cloudflare

### 1. Domínio Principal
```
Tipo: CNAME
Nome: rioporto.com.br (ou @)
Destino: cname.vercel-dns.com
Proxy: Ativado (laranja)
```

### 2. Subdomínios v1-v5
Para CADA subdomínio (v1, v2, v3, v4, v5):
```
Tipo: CNAME
Nome: v1 (sem .rioporto.com.br)
Destino: cname.vercel-dns.com
Proxy: Desativado (cinza)
TTL: Auto
```

**IMPORTANTE**: 
- NÃO use proxy do Cloudflare nos subdomínios
- Use apenas o nome do subdomínio (ex: "v5", não "v5.rioporto.com.br")
- Todos apontam para o mesmo destino: cname.vercel-dns.com

## Configuração no Vercel

### 1. Na aba Domains do projeto:
- rioporto.com.br
- www.rioporto.com.br
- v1.rioporto.com.br
- v2.rioporto.com.br
- v3.rioporto.com.br
- v4.rioporto.com.br
- v5.rioporto.com.br

### 2. Aguardar propagação
- DNS pode levar até 48h para propagar completamente
- Use `nslookup v5.rioporto.com.br` para verificar

## Teste de DNS

Execute estes comandos para verificar:
```bash
# Verificar resolução DNS
nslookup v5.rioporto.com.br
dig v5.rioporto.com.br

# Verificar redirecionamento
curl -I https://v5.rioporto.com.br
```

## Middleware Configuration

O arquivo `/src/middleware.ts` está configurado para:
- Detectar subdomínios v1-v5
- Redirecionar para tema correspondente
- Manter a URL original no navegador

## Troubleshooting

### Se DNS_PROBE_FINISHED_NXDOMAIN persistir:
1. Verifique se o registro CNAME foi criado corretamente no Cloudflare
2. Desative o proxy do Cloudflare (ícone deve estar cinza)
3. Aguarde 5-10 minutos e teste novamente
4. Limpe o cache DNS local: `ipconfig /flushdns` (Windows)

### Se redirecionar para página errada:
1. Verifique o branch de deploy no Vercel (deve ser `production`)
2. Force rebuild no Vercel
3. Verifique se Framework Preset está como "Next.js"

## Contato Suporte
- Cloudflare: Verificar configuração DNS
- Vercel: Verificar domínios customizados aceitos

---
Última atualização: 03/08/2025 22:00