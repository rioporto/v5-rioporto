'use client';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

interface Trait {
  name: string;
  value: string;
  rarity: number; // percentage (0-100)
  count: number;
  totalSupply: number;
}

interface NFTRarityProps {
  rank: number;
  totalSupply: number;
  rarityScore: number;
  traits: Trait[];
  className?: string;
}

const getRarityColor = (rarity: number) => {
  if (rarity < 1) return 'text-pink-400 border-pink-400/50 bg-pink-500/10';
  if (rarity < 5) return 'text-yellow-400 border-yellow-400/50 bg-yellow-500/10';
  if (rarity < 15) return 'text-purple-400 border-purple-400/50 bg-purple-500/10';
  if (rarity < 30) return 'text-blue-400 border-blue-400/50 bg-blue-500/10';
  return 'text-gray-400 border-gray-400/50 bg-gray-500/10';
};

const getRarityLabel = (rarity: number) => {
  if (rarity < 1) return 'Ultra Rare 💎';
  if (rarity < 5) return 'Legendary 👑';
  if (rarity < 15) return 'Epic ⚡';
  if (rarity < 30) return 'Rare 🔮';
  return 'Common 🟢';
};

export function NFTRarity({
  rank,
  totalSupply,
  rarityScore,
  traits,
  className = ''
}: NFTRarityProps) {
  const rarityPercentile = ((totalSupply - rank) / totalSupply) * 100;

  return (
    <Card className={`border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md ${className}`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Rarity Analysis ✨
          </h3>
          <p className="text-sm text-muted-foreground">
            Discover what makes this NFT special
          </p>
        </div>

        {/* Overall Rarity */}
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <Badge className={`px-4 py-2 text-lg font-bold ${getRarityColor(rarityPercentile)}`}>
              {getRarityLabel(rarityPercentile)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-gray-700/50 bg-gray-800/30 p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">#{rank.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Rarity Rank</div>
            </Card>
            
            <Card className="border-gray-700/50 bg-gray-800/30 p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400">{rarityScore.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Rarity Score</div>
            </Card>
          </div>

          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">
              Top {rarityPercentile.toFixed(1)}% of collection
            </div>
            <Progress 
              value={100 - rarityPercentile} 
              className="h-2"
            />
          </div>
        </div>

        {/* Traits Breakdown */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-foreground">Trait Rarity 🎯</h4>
          
          <div className="space-y-3">
            {traits.map((trait, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-foreground">
                      {trait.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {trait.value}
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getRarityColor(trait.rarity)}`}
                    >
                      {trait.rarity.toFixed(1)}%
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {trait.count} / {trait.totalSupply.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Progress 
                    value={trait.rarity} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Common</span>
                    <span className="text-muted-foreground">Rare</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rarity Breakdown */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-foreground">Rarity Breakdown 📊</h4>
          
          <div className="grid grid-cols-1 gap-3">
            {[
              { range: '< 1%', label: 'Ultra Rare', icon: '💎', color: 'pink' },
              { range: '1-5%', label: 'Legendary', icon: '👑', color: 'yellow' },
              { range: '5-15%', label: 'Epic', icon: '⚡', color: 'purple' },
              { range: '15-30%', label: 'Rare', icon: '🔮', color: 'blue' },
              { range: '> 30%', label: 'Common', icon: '🟢', color: 'gray' }
            ].map((tier, index) => (
              <div 
                key={index}
                className={`
                  flex items-center justify-between p-3 rounded-lg border
                  ${rarityPercentile >= (index === 0 ? 0 : index === 1 ? 1 : index === 2 ? 5 : index === 3 ? 15 : 30) &&
                    rarityPercentile < (index === 0 ? 1 : index === 1 ? 5 : index === 2 ? 15 : index === 3 ? 30 : 100)
                    ? `bg-${tier.color}-500/20 border-${tier.color}-400/50`
                    : 'bg-gray-800/30 border-gray-700/50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{tier.icon}</span>
                  <div>
                    <div className="font-semibold text-sm">{tier.label}</div>
                    <div className="text-xs text-muted-foreground">{tier.range}</div>
                  </div>
                </div>
                
                {rarityPercentile >= (index === 0 ? 0 : index === 1 ? 1 : index === 2 ? 5 : index === 3 ? 15 : 30) &&
                 rarityPercentile < (index === 0 ? 1 : index === 1 ? 5 : index === 2 ? 15 : index === 3 ? 30 : 100) && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-400/50">
                    Your Tier ✓
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rarity Tips */}
        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <div className="text-sm space-y-2">
            <div className="font-semibold text-blue-400">💡 Rarity Tips:</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Lower rank = higher rarity</li>
              <li>• Rare traits increase overall value</li>
              <li>• Combination of traits matters</li>
              <li>• Market demand affects pricing</li>
            </ul>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700/50">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">
              {traits.filter(t => t.rarity < 5).length}
            </div>
            <div className="text-xs text-muted-foreground">Rare+ Traits</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-400">
              {Math.min(...traits.map(t => t.rarity)).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">Rarest Trait</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">
              {(traits.reduce((sum, t) => sum + (100 - t.rarity), 0) / traits.length).toFixed(0)}
            </div>
            <div className="text-xs text-muted-foreground">Avg. Rarity</div>
          </div>
        </div>
      </div>

      {/* Holographic border effect */}
      <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r bg-crypto-gradient-multi opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
}