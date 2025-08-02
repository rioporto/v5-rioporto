'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface NFTCardProps {
  id: string;
  name: string;
  collection: string;
  image: string;
  price?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Ultra Rare';
  rank?: number;
  traits?: string[];
  isOwned?: boolean;
  onLike?: () => void;
  onBuy?: () => void;
  onSell?: () => void;
  className?: string;
}

const rarityColors = {
  'Common': 'text-gray-400 border-gray-400/50',
  'Rare': 'text-blue-400 border-blue-400/50',
  'Epic': 'text-purple-400 border-purple-400/50',
  'Legendary': 'text-yellow-400 border-yellow-400/50',
  'Ultra Rare': 'text-pink-400 border-pink-400/50'
};

const rarityGradients = {
  'Common': 'from-gray-500/20 to-gray-600/20',
  'Rare': 'from-blue-500/20 to-blue-600/20',
  'Epic': 'from-purple-500/20 to-purple-600/20',
  'Legendary': 'from-yellow-500/20 to-yellow-600/20',
  'Ultra Rare': 'from-pink-500/20 to-pink-600/20'
};

export function NFTCard({
  id,
  name,
  collection,
  image,
  price,
  rarity,
  rank,
  traits = [],
  isOwned = false,
  onLike,
  onBuy,
  onSell,
  className = ''
}: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <Card 
      className={`
        border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md 
        hover:scale-105 transition-all duration-500 group cursor-pointer
        hover:shadow-2xl hover:shadow-purple-500/25
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 space-y-4">
        {/* NFT Image */}
        <div className="relative overflow-hidden rounded-lg">
          <div className={`
            aspect-square bg-gradient-to-br ${rarityGradients[rarity]} 
            flex items-center justify-center text-6xl relative
            group-hover:scale-110 transition-transform duration-500
          `}>
            {image}
            
            {/* Holographic overlay effect */}
            <div className={`
              absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
              transform -skew-x-12 transition-transform duration-1000
              ${isHovered ? 'translate-x-full' : '-translate-x-full opacity-0'}
            `} />
            
            {/* Rank badge */}
            {rank && (
              <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                #{rank}
              </Badge>
            )}
            
            {/* Owned indicator */}
            {isOwned && (
              <Badge className="absolute top-2 left-2 bg-green-500/20 text-green-400 border-green-400/50">
                Owned ✓
              </Badge>
            )}
          </div>
          
          {/* Like button */}
          <button
            onClick={handleLike}
            className={`
              absolute bottom-2 right-2 w-8 h-8 rounded-full
              backdrop-blur-md transition-all duration-300
              ${isLiked 
                ? 'bg-red-500/20 text-red-400 scale-110' 
                : 'bg-gray-900/50 text-gray-400 hover:bg-red-500/20 hover:text-red-400'
              }
              flex items-center justify-center
            `}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
        </div>

        {/* NFT Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-foreground group-hover:text-purple-400 transition-colors">
                {name}
              </h3>
              <Badge variant="outline" className="text-xs">
                {collection}
              </Badge>
            </div>
            <Badge variant="outline" className={`text-xs ${rarityColors[rarity]}`}>
              {rarity}
            </Badge>
          </div>

          {/* Price */}
          {price && (
            <div className="text-center py-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {price}
              </div>
            </div>
          )}

          {/* Traits */}
          {traits.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Traits:</div>
              <div className="flex flex-wrap gap-1">
                {traits.slice(0, 3).map((trait, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-gray-700/50 hover:bg-purple-700/50 transition-colors"
                  >
                    {trait}
                  </Badge>
                ))}
                {traits.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-700/50">
                    +{traits.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {isOwned ? (
            <>
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                onClick={onSell}
              >
                List for Sale 💰
              </Button>
              <Button variant="outline" size="sm">
                Transfer 📤
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                onClick={onBuy}
              >
                Buy Now 🚀
              </Button>
              <Button variant="outline" size="sm">
                Make Offer 💎
              </Button>
            </>
          )}
        </div>

        {/* NFT ID */}
        <div className="text-center pt-2 border-t border-gray-700/50">
          <div className="text-xs text-muted-foreground font-mono">
            {id}
          </div>
        </div>
      </div>

      {/* Holographic border effect */}
      <div className={`
        absolute inset-0 rounded-lg pointer-events-none
        bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
        animate-pulse
      `} />
    </Card>
  );
}