#!/bin/bash

# Vercel deployment checker
echo "🔍 Checking latest Vercel deployment..."

# Get latest deployment
DEPLOYMENT=$(vercel ls --limit 1 --json 2>/dev/null | jq -r '.[0]')

if [ -z "$DEPLOYMENT" ]; then
    echo "❌ No deployments found or Vercel CLI not configured"
    exit 1
fi

# Extract deployment info
DEPLOYMENT_ID=$(echo $DEPLOYMENT | jq -r '.uid')
DEPLOYMENT_URL=$(echo $DEPLOYMENT | jq -r '.url')
DEPLOYMENT_STATE=$(echo $DEPLOYMENT | jq -r '.state')
DEPLOYMENT_CREATED=$(echo $DEPLOYMENT | jq -r '.created')

echo "📦 Deployment: $DEPLOYMENT_URL"
echo "🆔 ID: $DEPLOYMENT_ID"
echo "📅 Created: $(date -d @$((DEPLOYMENT_CREATED/1000)) 2>/dev/null || date -r $((DEPLOYMENT_CREATED/1000)))"
echo "📊 State: $DEPLOYMENT_STATE"

# If deployment is in progress, wait and check logs
if [ "$DEPLOYMENT_STATE" = "BUILDING" ] || [ "$DEPLOYMENT_STATE" = "DEPLOYING" ]; then
    echo "⏳ Deployment in progress..."
    echo ""
    echo "📜 Latest logs:"
    vercel logs $DEPLOYMENT_URL --limit 50
elif [ "$DEPLOYMENT_STATE" = "ERROR" ]; then
    echo "❌ Deployment failed!"
    echo ""
    echo "📜 Error logs:"
    vercel logs $DEPLOYMENT_URL --limit 100
else
    echo "✅ Deployment completed successfully!"
fi