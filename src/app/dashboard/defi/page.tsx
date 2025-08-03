'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { gradientStyles } from '@/styles/gradients';

export default function DeFiPage() {
  const [tvl, setTvl] = useState(4200000);
  const [apy, setApy] = useState(12.5);

  const protocols = [
    {
      name: 'RioSwap',
      tvl: '$1.2M',
      apy: '15.2%',
      type: 'DEX',
      status: 'Active',
      logo: '🌊'
    },
    {
      name: 'PortoVault',
      tvl: '$800K',
      apy: '8.7%',
      type: 'Yield Farm',
      status: 'Active',
      logo: '🏛️'
    },
    {
      name: 'P2P Lending',
      tvl: '$2.2M',
      apy: '18.9%',
      type: 'Lending',
      status: 'Beta',
      logo: '🤝'
    }
  ];

  const positions = [
    {
      protocol: 'RioSwap',
      asset: 'BTC/ETH LP',
      value: '$5,420',
      rewards: '$127.50',
      apy: '15.2%'
    },
    {
      protocol: 'PortoVault',
      asset: 'USDC Vault',
      value: '$2,100',
      rewards: '$18.25',
      apy: '8.7%'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-display">
            DeFi Hub 🚀
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome to the future of finance, anon ⚡
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 backdrop-blur-md" style={gradientStyles.cryptoGradient}>
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400">${(tvl / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-muted-foreground">Total Value Locked</div>
            </div>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400">{apy}%</div>
              <div className="text-sm text-muted-foreground">Average APY</div>
            </div>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400">$7,520</div>
              <div className="text-sm text-muted-foreground">Your Portfolio</div>
            </div>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400">$145.75</div>
              <div className="text-sm text-muted-foreground">Rewards Earned</div>
            </div>
          </Card>
        </div>

        {/* DeFi Protocols */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Available Protocols 🔥</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {protocols.map((protocol, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300 group">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{protocol.logo}</div>
                      <div>
                        <h3 className="font-bold text-lg">{protocol.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {protocol.type}
                        </Badge>
                      </div>
                    </div>
                    <Badge 
                      variant={protocol.status === 'Active' ? 'default' : 'secondary'}
                      className={protocol.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}
                    >
                      {protocol.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">TVL</div>
                      <div className="font-bold text-cyan-400">{protocol.tvl}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">APY</div>
                      <div className="font-bold text-green-400">{protocol.apy}</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 group-hover:shadow-lg group-hover:shadow-purple-500/25"
                  >
                    Enter Protocol 🚀
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Your Positions */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Your Positions 💎</h2>
          <div className="space-y-4">
            {positions.map((position, index) => (
              <Card key={index} className="border-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md">
                <div className="p-6 flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{position.asset}</h3>
                      <Badge variant="outline" className="text-xs">
                        {position.protocol}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-green-400">{position.value}</div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="text-sm text-muted-foreground">Rewards</div>
                    <div className="text-xl font-bold text-yellow-400">{position.rewards}</div>
                    <div className="text-sm text-green-400">{position.apy} APY</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Claim 💰
                    </Button>
                    <Button variant="outline" size="sm">
                      Compound 🔄
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
            <div className="text-center">
              <div className="text-lg">💱</div>
              <div className="text-sm">Swap Tokens</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
            <div className="text-center">
              <div className="text-lg">🏦</div>
              <div className="text-sm">Add Liquidity</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            <div className="text-center">
              <div className="text-lg">🌾</div>
              <div className="text-sm">Farm Yields</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            <div className="text-center">
              <div className="text-lg">⚡</div>
              <div className="text-sm">Flash Loans</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}