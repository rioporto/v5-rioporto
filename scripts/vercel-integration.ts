#!/usr/bin/env node
import { Vercel } from "@vercel/sdk";
import * as fs from 'fs';
import * as path from 'path';

/**
 * Vercel Integration for Claude Code
 * 
 * This script provides superpowers to Claude Code by enabling direct interaction
 * with Vercel API to monitor, diagnose, and manage deployments.
 * 
 * Usage:
 * - npm run vercel:status - Check latest deployment status
 * - npm run vercel:logs - Get deployment logs
 * - npm run vercel:list - List recent deployments
 * - npm run vercel:diagnose - Diagnose deployment issues
 * - npm run vercel:redeploy - Force redeploy
 */

// Load environment variables or create .env.local if not exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  Creating .env.local file...');
  fs.writeFileSync(envPath, `# Vercel Integration
VERCEL_TOKEN=your_token_here
VERCEL_PROJECT_ID=your_project_id_here
VERCEL_TEAM_ID=team_1a2b3c4d5e6f7g8h9i0j1k2l
`);
  console.log('✅ .env.local created. Please add your VERCEL_TOKEN');
  process.exit(1);
}

// Read environment variables
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const VERCEL_TOKEN = envVars.VERCEL_TOKEN || process.env.VERCEL_TOKEN;
const PROJECT_ID = envVars.VERCEL_PROJECT_ID || process.env.VERCEL_PROJECT_ID;
const TEAM_ID = envVars.VERCEL_TEAM_ID || process.env.VERCEL_TEAM_ID;

if (!VERCEL_TOKEN || VERCEL_TOKEN === 'your_token_here') {
  console.error('❌ Please add VERCEL_TOKEN to .env.local');
  console.log('📝 Get your token from: https://vercel.com/account/tokens');
  process.exit(1);
}

// Initialize Vercel SDK
const vercel = new Vercel({
  bearerToken: VERCEL_TOKEN,
});

// Command line arguments
const command = process.argv[2];

// Helper functions
async function getLatestDeployment() {
  try {
    const result = await vercel.deployments.getDeployments({
      projectId: PROJECT_ID,
      teamId: TEAM_ID,
      limit: 1,
    });
    
    if (result.deployments && result.deployments.length > 0) {
      return result.deployments[0];
    }
    return null;
  } catch (error) {
    console.error('Error getting deployments:', error);
    return null;
  }
}

async function getDeploymentLogs(deploymentId: string) {
  try {
    const result = await vercel.deployments.getDeploymentEvents({
      idOrUrl: deploymentId,
      teamId: TEAM_ID,
      limit: 100,
      builds: 1,
    });
    
    return result;
  } catch (error) {
    console.error('Error getting deployment logs:', error);
    return null;
  }
}

// Commands
const commands: Record<string, () => Promise<void>> = {
  status: async () => {
    console.log('🔍 Checking deployment status...\n');
    const deployment = await getLatestDeployment();
    
    if (!deployment) {
      console.error('❌ No deployments found');
      return;
    }
    
    console.log('📊 Latest Deployment Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🆔 ID: ${(deployment as any).uid || 'N/A'}`);
    console.log(`📅 Created: ${new Date(deployment.created).toLocaleString()}`);
    console.log(`🌿 Branch: ${deployment.gitSource?.ref || 'N/A'}`);
    console.log(`🎯 Target: ${deployment.target || 'production'}`);
    console.log(`📦 State: ${deployment.state}`);
    console.log(`🔗 URL: ${deployment.url}`);
    
    if (deployment.ready) {
      console.log('✅ Status: READY');
    } else if (deployment.state === 'ERROR') {
      console.log('❌ Status: FAILED');
    } else if (deployment.state === 'BUILDING') {
      console.log('🔨 Status: BUILDING');
    } else {
      console.log(`❓ Status: ${deployment.state}`);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  },
  
  logs: async () => {
    console.log('📜 Fetching deployment logs...\n');
    const deployment = await getLatestDeployment();
    
    if (!deployment) {
      console.error('❌ No deployments found');
      return;
    }
    
    const logs = await getDeploymentLogs((deployment as any).uid);
    
    if (!logs || !logs.events) {
      console.error('❌ No logs found');
      return;
    }
    
    console.log(`📋 Logs for deployment ${(deployment as any).uid}:`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    logs.events.forEach((event: any) => {
      const timestamp = new Date(event.created).toLocaleTimeString();
      const message = event.text || event.message || JSON.stringify(event);
      console.log(`[${timestamp}] ${message}`);
    });
  },
  
  list: async () => {
    console.log('📋 Listing recent deployments...\n');
    
    try {
      const result = await vercel.deployments.getDeployments({
        projectId: PROJECT_ID,
        teamId: TEAM_ID,
        limit: 10,
      });
      
      if (!result.deployments || result.deployments.length === 0) {
        console.error('❌ No deployments found');
        return;
      }
      
      console.log('Recent Deployments:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      result.deployments.forEach((dep: any, index: number) => {
        const statusIcon = dep.ready ? '✅' : dep.state === 'ERROR' ? '❌' : '🔨';
        const time = new Date(dep.created).toLocaleString();
        console.log(`\n${index + 1}. ${statusIcon} ${dep.uid || 'N/A'}`);
        console.log(`   Created: ${time}`);
        console.log(`   Branch: ${dep.gitSource?.ref || 'N/A'}`);
        console.log(`   State: ${dep.state}`);
        console.log(`   URL: ${dep.url}`);
      });
      
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } catch (error) {
      console.error('Error listing deployments:', error);
    }
  },
  
  diagnose: async () => {
    console.log('🏥 Diagnosing deployment issues...\n');
    
    const deployment = await getLatestDeployment();
    
    if (!deployment) {
      console.error('❌ No deployments found');
      return;
    }
    
    console.log('🔍 Diagnostic Report:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Check deployment state
    console.log('1️⃣ Deployment State Analysis:');
    if (deployment.state === 'ERROR') {
      console.log('   ❌ Deployment failed');
      console.log('   💡 Check logs for error details');
    } else if (deployment.state === 'BUILDING') {
      console.log('   🔨 Deployment is still building');
      console.log('   💡 Wait for build to complete');
    } else if (deployment.ready) {
      console.log('   ✅ Deployment is ready');
    } else {
      console.log(`   ❓ Unknown state: ${deployment.state}`);
    }
    
    // Check build settings
    console.log('\n2️⃣ Build Configuration:');
    console.log(`   Framework: Next.js (should auto-detect)`);
    console.log(`   Branch: ${deployment.gitSource?.ref || 'Not specified'}`);
    console.log(`   Target: ${deployment.target || 'production'}`);
    
    // Check common issues
    console.log('\n3️⃣ Common Issues Check:');
    
    // Issue 1: Wrong branch
    if (deployment.gitSource?.ref !== 'production') {
      console.log('   ⚠️  Not deployed from production branch');
      console.log('   💡 Ensure Vercel is configured to deploy from "production" branch');
    }
    
    // Issue 2: Cache issues
    console.log('   🗑️  Cache Status: Unknown (check Vercel dashboard)');
    console.log('   💡 Try redeploying without cache');
    
    // Issue 3: Environment variables
    console.log('   🔐 Environment Variables: Check in Vercel dashboard');
    console.log('   💡 Ensure all required env vars are set');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📌 Recommended Actions:');
    console.log('1. Check deployment logs: npm run vercel:logs');
    console.log('2. Force redeploy: npm run vercel:redeploy');
    console.log('3. Check Vercel dashboard for more details');
  },
  
  redeploy: async () => {
    console.log('🚀 Forcing redeploy...\n');
    console.log('⚠️  This feature requires manual action:');
    console.log('\n1. Go to: https://vercel.com/dashboard');
    console.log('2. Select your project');
    console.log('3. Go to Deployments tab');
    console.log('4. Click "..." on latest deployment');
    console.log('5. Select "Redeploy"');
    console.log('6. UNCHECK "Use existing Build Cache"');
    console.log('7. Click "Redeploy"');
    console.log('\n💡 Tip: You can also trigger redeploy by pushing a commit');
  },
  
  help: async () => {
    console.log('🚀 Vercel Integration for Claude Code\n');
    console.log('Available Commands:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 npm run vercel:status   - Check latest deployment status');
    console.log('📜 npm run vercel:logs     - Get deployment logs');
    console.log('📋 npm run vercel:list     - List recent deployments');
    console.log('🏥 npm run vercel:diagnose - Diagnose deployment issues');
    console.log('🚀 npm run vercel:redeploy - Instructions to force redeploy');
    console.log('❓ npm run vercel:help     - Show this help message');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
};

// Execute command
async function main() {
  const cmd = command || 'help';
  
  if (commands[cmd]) {
    await commands[cmd]();
  } else {
    console.error(`❌ Unknown command: ${cmd}`);
    await commands.help();
  }
}

// Run
main().catch(console.error);