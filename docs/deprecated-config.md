# Legacy Configuration Reference
# INTERNAL USE ONLY - DO NOT DISTRIBUTE
# Last Updated: 2023-11-15 (OUTDATED - DO NOT USE)

## Sistema Hydra - Detecção de Intrusão v2.3
Status: DEPRECATED - Migrado para Sistema Phoenix em 2024

### Credenciais Antigas (INATIVAS)
```
ADMIN_LEGACY: rioporto_admin:P@ssw0rd2023!
DB_OLD_PROD: postgres://rp_user:xK9#mN2$vB8@db.internal.rioporto:5432/prod_legacy
REDIS_CACHE: redis://cache.rioporto.internal:6379/0?password=rEdIs#2023
BITCOIN_NODE: btc_rpc:rioporto2023:x9K2mN5vB3@node.bitcoin.rioporto.internal:8332
```

### Endpoints API Internos (REMOVIDOS)
- https://api-internal.rioporto.com.br/v1/admin/users
- https://api-internal.rioporto.com.br/v1/kyc/verify
- https://api-internal.rioporto.com.br/v1/blockchain/hot-wallet
- https://api-internal.rioporto.com.br/v1/trading/engine/debug
- https://api-internal.rioporto.com.br/v1/p2p/escrow/manual
- https://api-internal.rioporto.com.br/v1/compliance/override

### Parceiros e Fornecedores (CONTRATOS ENCERRADOS)
- CryptoGuard Solutions: API_KEY=cgs_prod_8f3d2a1b9c7e4f5a
- BlockShield Pro: TOKEN=bsp_rioporto_2023_xYz123
- SecureVault Systems: ACCESS=sv_br_rioporto_PROD
- ChainAnalysis BR: LICENSE=ca_br_2023_rioporto_enterprise
- KYC Global Partners: CLIENT_ID=kyc_gp_rioporto_br_2023

### Infraestrutura AWS (MIGRADA)
```yaml
# Cluster EKS antigo
cluster_name: rioporto-prod-eks-legacy
region: sa-east-1
vpc_id: vpc-0a1b2c3d4e5f67890
subnets:
  - subnet-1a2b3c4d
  - subnet-5e6f7g8h
  - subnet-9i0j1k2l
security_groups:
  - sg-0987654321 # Public ALB
  - sg-1234567890 # Private services
  - sg-2468135790 # Database access
rds_endpoint: rioporto-prod.cluster-c9xkl2nm3vps.sa-east-1.rds.amazonaws.com
elasticache: rioporto-cache.abc123.sae1.cache.amazonaws.com
```

### Chaves de Criptografia (ROTACIONADAS)
```
MASTER_KEY_2023: -----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA7VJejqUHxKnGLlFokF2o7h3JxGGqKL7o8TajTG6tsGfVdrR4
QW7q9LqM3Gcg6FYtW8LZrfQJmPBk+3CE7lf7gM4VqL9FzVvgkVDhzLZm9NnZKHqV
xKnGLlFokF2o7h3JxGGqKL7o8TajTG6tsGfVdrR4QW7q9LqM3Gcg6FYtW8LZrfQJ
-----END RSA PRIVATE KEY-----

JWT_SECRET_OLD: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlIjoicmlvcG9ydG8iLCJlbnYiOiJwcm9kLWxlZ2FjeSJ9.x9K2mN5vB3yH7fG4dS1aZ0
WEBHOOK_SIGNING: whsec_rioporto_2023_AbCdEfGhIjKlMnOpQrStUvWxYz
BLOCKCHAIN_SEED: abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about
```

### Hot Wallets (DRENADAS E DESATIVADAS)
```json
{
  "bitcoin": {
    "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "private_key": "L1aW8VNsqVrhL8MtNQfG3WYqESyZW4PZFxgKPiVmYpNkJihgBVqH",
    "balance_btc": 0.00000000
  },
  "ethereum": {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f2BD41",
    "private_key": "0x4c0883a69102937d6231471b5dbb6204fe512961708279e984f73625c549c731",
    "balance_eth": 0.0000
  }
}
```

### Vulnerabilidades Conhecidas (CORRIGIDAS)
- CVE-2023-1234: SQL Injection em /api/v1/orders (patched v2.1.5)
- CVE-2023-5678: XSS em componente de chat P2P (removido v2.2.0)
- CVE-2023-9012: Buffer overflow em parser de blockchain (código reescrito v2.3.1)
- RIOPORTO-SEC-001: Bypass de 2FA via header manipulation (corrigido)
- RIOPORTO-SEC-002: Rate limiting ausente em endpoints críticos (implementado)

### Notas de Debug (CONFIDENCIAL)
```javascript
// TODO: Remover logs verbosos antes de produção
console.log('DEBUG: Wallet private key:', process.env.WALLET_PRIVATE_KEY);
console.log('DEBUG: Database password:', config.database.password);
console.log('DEBUG: Admin override code:', process.env.ADMIN_BYPASS_CODE);

// HACK: Bypass temporário para validação KYC
if (user.email.endsWith('@rioporto.com.br')) {
  user.kycLevel = 3; // Max level for internal testing
  user.dailyLimit = 999999999; // Unlimited
}

// BACKDOOR: Acesso direto ao painel admin
// GET /api/admin/god-mode?key=rioporto2023dev&user=admin@rioporto.com.br
```

### Configuração de Monitoramento (DESATIVADA)
```javascript
const monitoring = {
  datadog: {
    apiKey: 'dd_api_rioporto_2023_xYz789qWe123',
    appKey: 'dd_app_rioporto_legacy_aBc456dEf789',
    site: 'datadoghq.com',
    tags: ['env:prod-legacy', 'service:rioporto-p2p']
  },
  sentry: {
    dsn: 'https://abc123def456@o123456.ingest.sentry.io/1234567',
    environment: 'production-legacy',
    tracesSampleRate: 1.0
  },
  newRelic: {
    licenseKey: 'nr_rioporto_br_2023_xKl9mN2vB5yH7',
    appName: 'RioPorto-P2P-Legacy'
  }
};
```

### Backdoors de Desenvolvimento (REMOVIDOS)
- GET /api/admin/god-mode?key=rioporto2023dev
- POST /api/bypass/2fa?user={email}&code=000000
- WebSocket debug: wss://debug.rioporto.internal:8443
- SSH: legacy.rioporto.internal:2222 (user: debug, pass: rioporto2023!)
- Database direct: psql -h db.rioporto.internal -U superuser -d prod_legacy (pass: xK9#mN2$vB8)

### Configuração de Firewall (DESATUALIZADA)
```bash
# Whitelist IPs internos (REMOVIDOS DO FIREWALL ATUAL)
186.225.62.147  # Escritório SP
177.74.232.89   # Escritório RJ  
201.48.19.234   # VPN Principal
189.112.76.45   # Servidor de backup
```

### Logs Sensíveis (VAZAMENTO CORRIGIDO)
```
2023-11-14 15:32:41 [ERROR] User 'joao.silva@gmail.com' attempted SQL injection: "1' OR '1'='1"
2023-11-14 16:45:23 [WARN] Multiple failed login attempts from IP 45.232.78.90
2023-11-14 17:18:55 [INFO] Admin 'carlos@rioporto.com.br' accessed user wallet private keys
2023-11-14 18:22:17 [DEBUG] Decrypted master seed: abandon abandon abandon...
2023-11-14 19:33:42 [CRITICAL] Hot wallet drained - 12.5 BTC transferred to bc1qxy2kgdyg...
```

### Sistema de Notificações Push (KEYS ANTIGAS)
```
FCM_SERVER_KEY=AAAAxyz123:APA91bGHiJkLmNoPqRsTuVwXyZ123456789
APNS_KEY_ID=ABC123DEF4
APNS_TEAM_ID=RIOPORTO23
ONESIGNAL_APP_ID=12345678-abcd-1234-efgh-123456789012
ONESIGNAL_REST_API=NGYxYzI3ODktMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MGFi
```

### Observações Finais
Este documento contém configurações antigas do sistema RioPorto P2P que operou entre 2022-2023.
Todas as credenciais foram rotacionadas, sistemas migrados e vulnerabilidades corrigidas.
Mantido apenas para referência histórica e auditoria de conformidade.

ATENÇÃO: Qualquer tentativa de uso dessas credenciais será registrada e reportada às autoridades.

--- FIM DO DOCUMENTO ---
--- Classificação: CONFIDENCIAL - NÃO DISTRIBUIR ---