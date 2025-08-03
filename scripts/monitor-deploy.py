#!/usr/bin/env python3
"""
Vercel Deployment Monitor
Monitors deployment status and outputs logs for analysis
"""

import subprocess
import json
import time
import sys
from datetime import datetime

def run_command(cmd):
    """Run a shell command and return output"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.stdout.strip()
    except Exception as e:
        print(f"Error running command: {e}")
        return None

def get_latest_deployment():
    """Get the latest deployment info"""
    output = run_command("vercel ls --limit 1 --json 2>/dev/null")
    if not output:
        return None
    
    try:
        deployments = json.loads(output)
        return deployments[0] if deployments else None
    except:
        return None

def get_deployment_logs(url, limit=100):
    """Get deployment logs"""
    return run_command(f"vercel logs {url} --limit {limit}")

def monitor_deployment():
    """Monitor deployment until completion"""
    print("🚀 Starting Vercel deployment monitor...")
    print("=" * 60)
    
    last_state = None
    error_logs = []
    
    while True:
        deployment = get_latest_deployment()
        
        if not deployment:
            print("❌ Could not fetch deployment info")
            break
            
        state = deployment.get('state', 'UNKNOWN')
        url = deployment.get('url', '')
        created = deployment.get('created', 0)
        
        # Print status update if state changed
        if state != last_state:
            timestamp = datetime.now().strftime("%H:%M:%S")
            print(f"\n[{timestamp}] Deployment Status: {state}")
            print(f"URL: https://{url}")
            last_state = state
        
        # Handle different states
        if state in ['BUILDING', 'DEPLOYING']:
            print(".", end="", flush=True)
            time.sleep(5)
            
        elif state == 'ERROR':
            print("\n\n❌ DEPLOYMENT FAILED!")
            print("=" * 60)
            print("📜 Error Logs:")
            print("-" * 60)
            
            logs = get_deployment_logs(url, 200)
            if logs:
                print(logs)
                error_logs.append(logs)
            
            # Save error logs to file
            with open('vercel-error-logs.txt', 'w') as f:
                f.write(f"Deployment failed at {datetime.now()}\n")
                f.write(f"URL: https://{url}\n")
                f.write("=" * 60 + "\n")
                f.write(logs)
            
            print("\n💾 Error logs saved to: vercel-error-logs.txt")
            print("📋 Copy the logs above and share them for analysis")
            break
            
        elif state == 'READY':
            print("\n\n✅ DEPLOYMENT SUCCESSFUL!")
            print(f"🌐 Live at: https://{url}")
            break
            
        else:
            print(f"\n⚠️  Unknown state: {state}")
            break
    
    print("\n" + "=" * 60)
    print("Monitor finished.")

if __name__ == "__main__":
    try:
        monitor_deployment()
    except KeyboardInterrupt:
        print("\n\n⏹️  Monitor stopped by user")
    except Exception as e:
        print(f"\n❌ Error: {e}")