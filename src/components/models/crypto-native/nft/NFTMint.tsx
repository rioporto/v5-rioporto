'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Progress } from '@/components/ui/Progress';

interface NFTMintProps {
  collectionName: string;
  totalSupply: number;
  minted: number;
  price: string;
  maxPerWallet: number;
  isWhitelisted?: boolean;
  isPublicSale?: boolean;
  startTime?: string;
  endTime?: string;
  className?: string;
}

export function NFTMint({
  collectionName,
  totalSupply,
  minted,
  price,
  maxPerWallet,
  isWhitelisted = false,
  isPublicSale = true,
  startTime,
  endTime,
  className = ''
}: NFTMintProps) {
  const [quantity, setQuantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const mintProgress = (minted / totalSupply) * 100;
  const isLive = isPublicSale || isWhitelisted;
  const isSoldOut = minted >= totalSupply;

  const handleMint = async () => {
    if (isSoldOut || !isLive) return;
    
    setIsMinting(true);
    
    // Simulate minting process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsMinting(false);
    setMintSuccess(true);
    
    // Reset success state after 3 seconds
    setTimeout(() => setMintSuccess(false), 3000);
  };

  const totalCost = (parseFloat(price.replace(/[^\d.]/g, '')) * quantity).toFixed(3);

  return (
    <Card className={`border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md ${className}`}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🎨</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {collectionName}
          </h2>
          <p className="text-muted-foreground">
            Mint your exclusive NFT today! 🚀✨
          </p>
        </div>

        {/* Status */}
        <div className="flex justify-center">
          {isSoldOut ? (
            <Badge className="bg-red-500/20 text-red-400 border-red-400/50 px-4 py-2">
              🔥 SOLD OUT
            </Badge>
          ) : isLive ? (
            <Badge className="bg-green-500/20 text-green-400 border-green-400/50 px-4 py-2 animate-pulse">
              ✨ LIVE NOW
            </Badge>
          ) : (
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-400/50 px-4 py-2">
              ⏰ COMING SOON
            </Badge>
          )}
        </div>

        {/* Mint Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Minted</span>
            <span className="text-cyan-400 font-semibold">
              {minted.toLocaleString()} / {totalSupply.toLocaleString()}
            </span>
          </div>
          <Progress 
            value={mintProgress} 
            className="h-3 bg-gray-700/50"
          />
          <div className="text-center text-xs text-muted-foreground">
            {(100 - mintProgress).toFixed(1)}% remaining
          </div>
        </div>

        {/* Mint Details */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-gray-700/50 bg-gray-800/30 p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{price}</div>
            <div className="text-sm text-muted-foreground">Price per NFT</div>
          </Card>
          
          <Card className="border-gray-700/50 bg-gray-800/30 p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{maxPerWallet}</div>
            <div className="text-sm text-muted-foreground">Max per wallet</div>
          </Card>
        </div>

        {/* Whitelist Status */}
        {isWhitelisted && (
          <div className="text-center p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
            <div className="text-yellow-400 font-semibold">
              👑 You're on the whitelist!
            </div>
            <div className="text-sm text-muted-foreground">
              Priority access enabled
            </div>
          </div>
        )}

        {/* Mint Controls */}
        {isLive && !isSoldOut && (
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Quantity:</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </Button>
                
                <Input
                  type="number"
                  min="1"
                  max={maxPerWallet}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(maxPerWallet, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="text-center w-20 bg-gray-700/50 border-gray-600/50"
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(maxPerWallet, quantity + 1))}
                  disabled={quantity >= maxPerWallet}
                >
                  +
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(maxPerWallet)}
                  disabled={quantity >= maxPerWallet}
                >
                  Max
                </Button>
              </div>
            </div>

            {/* Total Cost */}
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Cost:</div>
              <div className="text-2xl font-bold text-green-400">
                {totalCost} ETH
              </div>
            </div>

            {/* Mint Button */}
            <Button
              onClick={handleMint}
              disabled={isMinting || mintSuccess}
              className={`
                w-full h-14 text-lg font-bold
                ${mintSuccess 
                  ? 'bg-green-500 hover:bg-green-500 text-white' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0'
                }
                transition-all duration-300
              `}
            >
              {isMinting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Minting... 🎨
                </div>
              ) : mintSuccess ? (
                <div className="flex items-center gap-2">
                  ✅ Minted Successfully!
                </div>
              ) : (
                `Mint ${quantity} NFT${quantity > 1 ? 's' : ''} 🚀`
              )}
            </Button>
          </div>
        )}

        {/* Time Information */}
        {(startTime || endTime) && (
          <div className="text-center space-y-2 p-4 bg-gray-800/30 rounded-lg">
            {startTime && (
              <div className="text-sm">
                <span className="text-muted-foreground">Starts:</span>
                <span className="text-cyan-400 ml-2">{startTime}</span>
              </div>
            )}
            {endTime && (
              <div className="text-sm">
                <span className="text-muted-foreground">Ends:</span>
                <span className="text-red-400 ml-2">{endTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700/50">
          <div className="text-center space-y-2">
            <div className="text-2xl">🔒</div>
            <div className="text-sm text-muted-foreground">Secure Minting</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-2xl">⚡</div>
            <div className="text-sm text-muted-foreground">Instant Reveal</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-2xl">💎</div>
            <div className="text-sm text-muted-foreground">Rare Traits</div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground text-center space-y-1 pt-4 border-t border-gray-700/50">
          <p>⚠️ Please ensure you have enough ETH for gas fees</p>
          <p>🔗 Transaction will be processed on Ethereum mainnet</p>
          <p>💫 NFTs will appear in your wallet after confirmation</p>
        </div>
      </div>

      {/* Holographic border effect */}
      <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-pulse" />
    </Card>
  );
}