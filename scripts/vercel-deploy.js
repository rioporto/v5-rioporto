#!/usr/bin/env node

/**
 * Script automático para deploy no Vercel
 * Verifica status do build e reporta erros
 */

const { execSync } = require('child_process');
const https = require('https');

// Configurações
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function checkVercelDeployment() {
  if (!VERCEL_TOKEN) {
    console.log('❌ VERCEL_TOKEN não configurado');
    console.log('Configure com: export VERCEL_TOKEN=seu_token');
    return;
  }

  const options = {
    hostname: 'api.vercel.com',
    path: '/v6/deployments?limit=1',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const result = JSON.parse(data);
        if (result.deployments && result.deployments[0]) {
          const deploy = result.deployments[0];
          console.log(`\n📊 Deploy Status: ${deploy.state}`);
          console.log(`🔗 URL: ${deploy.url}`);
          console.log(`📅 Criado: ${new Date(deploy.created).toLocaleString()}`);
          
          if (deploy.state === 'ERROR') {
            console.log('❌ Deploy falhou!');
            console.log('Verifique: https://vercel.com/deployments');
          } else if (deploy.state === 'READY') {
            console.log('✅ Deploy concluído com sucesso!');
          } else {
            console.log('⏳ Deploy em andamento...');
          }
        }
        resolve();
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function pushToGitHub() {
  if (!GITHUB_TOKEN) {
    console.log('❌ GITHUB_TOKEN não configurado');
    console.log('Use o token que você criou: export GITHUB_TOKEN=seu_token');
    return false;
  }

  try {
    // Configurar credenciais
    const remoteUrl = `https://${GITHUB_TOKEN}@github.com/rioporto/v5-rioporto.git`;
    execSync(`git remote set-url origin ${remoteUrl}`, { stdio: 'pipe' });
    
    // Fazer push
    console.log('🚀 Fazendo push para GitHub...');
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('✅ Push concluído!');
    
    // Restaurar URL sem token
    execSync('git remote set-url origin https://github.com/rioporto/v5-rioporto.git', { stdio: 'pipe' });
    
    return true;
  } catch (error) {
    console.error('❌ Erro no push:', error.message);
    return false;
  }
}

async function main() {
  console.log('🔄 Iniciando deploy automático...\n');
  
  // 1. Push para GitHub
  const pushed = await pushToGitHub();
  
  if (pushed) {
    // 2. Aguardar e verificar deploy
    console.log('\n⏳ Aguardando 10s para Vercel detectar push...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // 3. Verificar status do deploy
    await checkVercelDeployment();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { pushToGitHub, checkVercelDeployment };