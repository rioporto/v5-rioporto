'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { CryptoCard, CryptoCardContent } from '../CryptoCard';
import { CryptoBadge } from '../CryptoBadge';
import { HolographicShimmer } from '../effects/HolographicShimmer';
import { GradientBorder } from '../effects/GradientBorder';

interface NFTData {
  id: string;
  name: string;
  description?: string;
  image: string;
  collection: string;
  creator: string;
  owner: string;
  price?: string;
  currency?: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  blockchain: string;
  tokenId: string;
  contractAddress: string;
}

interface NFTDisplayProps {
  nft: NFTData;
  variant?: 'card' | 'showcase' | 'gallery';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  showDetails?: boolean;
  onView?: () => void;
  onBuy?: () => void;
  onSell?: () => void;
  className?: string;
}

export function NFTDisplay({
  nft,
  variant = 'card',
  size = 'md',
  interactive = true,
  showDetails = true,
  onView,
  onBuy,
  onSell,
  className,
  ...props
}: NFTDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80',
    xl: 'w-96'
  };

  const getRarityColor = (rarity?: string) => {
    const colors: Record<string, 'gray' | 'green' | 'blue' | 'purple' | 'yellow'> = {
      common: 'gray',
      uncommon: 'green',
      rare: 'blue',
      epic: 'purple',
      legendary: 'yellow'
    };
    return colors[rarity || 'common'];
  };

  const getRarityGlow = (rarity?: string) => {
    const glows: Record<string, string> = {
      common: 'shadow-[0_0_10px_rgba(107,114,128,0.3)]',
      uncommon: 'shadow-[0_0_15px_rgba(34,197,94,0.4)]',
      rare: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
      epic: 'shadow-[0_0_25px_rgba(147,51,234,0.6)]',
      legendary: 'shadow-[0_0_30px_rgba(234,179,8,0.8)]'
    };
    return glows[rarity || 'common'];
  };

  if (variant === 'showcase') {
    return (
      <div className={cn('relative', sizeClasses[size], className)} {...props}>
        <GradientBorder
          variant={nft.rarity === 'legendary' ? 'rainbow' : 'purple-pink'}
          thickness={nft.rarity === 'legendary' ? 3 : 2}
          animated={true}
          glow={true}
          className="h-full"
        >
          <div className="p-4 h-full flex flex-col">
            {/* NFT Image */}
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-900">
              {!imageError ? (
                <img
                  src={nft.image}
                  alt={nft.name}
                  className={cn(
                    'w-full h-full object-cover transition-all duration-500',
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  )}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              {/* Rarity Badge */}
              {nft.rarity && (
                <div className="absolute top-2 right-2">
                  <CryptoBadge
                    variant="holographic"
                    color={getRarityColor(nft.rarity)}
                    size="sm"
                    className="capitalize"
                  >
                    {nft.rarity}
                  </CryptoBadge>
                </div>
              )}
              
              {/* Holographic overlay for legendary */}
              {nft.rarity === 'legendary' && (
                <HolographicShimmer
                  variant="rainbow"
                  speed="medium"
                  className="absolute inset-0"
                >
                  <></>
                </HolographicShimmer>
              )}
            </div>

            {/* NFT Details */}
            <div className="flex-1 space-y-2">
              <h3 className="font-bold text-white text-lg font-display truncate">
                {nft.name}
              </h3>
              
              <p className="text-sm text-purple-300 font-medium">
                {nft.collection}
              </p>
              
              {nft.price && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Price</span>
                  <span className="font-mono font-bold text-green-400">
                    {nft.price} {nft.currency || 'ETH'}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={onView}
                className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium text-white transition-all duration-200"
              >
                View
              </button>
              {nft.price && onBuy && (
                <button
                  onClick={onBuy}
                  className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium text-white transition-all duration-200"
                >
                  Buy
                </button>
              )}
            </div>
          </div>
        </GradientBorder>
      </div>
    );
  }

  if (variant === 'gallery') {
    return (
      <div 
        className={cn(
          'relative group cursor-pointer',
          sizeClasses[size.replace('xl', 'lg') as 'sm' | 'md' | 'lg'],
          className
        )}
        onClick={onView}
        {...props}
      >
        <CryptoCard
          variant="glass"
          glow={false}
          animated={interactive}
          className="h-full overflow-hidden"
        >
          <div className="aspect-square relative">
            {!imageError ? (
              <img
                src={nft.image}
                alt={nft.name}
                className={cn(
                  'w-full h-full object-cover transition-all duration-500 group-hover:scale-110',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Rarity indicator */}
            {nft.rarity && (
              <div className="absolute top-2 left-2">
                <div className={cn(
                  'w-2 h-2 rounded-full',
                  getRarityGlow(nft.rarity)
                )} style={{
                  backgroundColor: {
                    common: '#6B7280',
                    uncommon: '#22C55E',
                    rare: '#3B82F6',
                    epic: '#9333EA',
                    legendary: '#EAB308'
                  }[nft.rarity || 'common']
                }} />
              </div>
            )}
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h4 className="font-semibold text-white text-sm truncate">
                {nft.name}
              </h4>
              <p className="text-xs text-gray-300 truncate">
                {nft.collection}
              </p>
            </div>
          </div>
        </CryptoCard>
      </div>
    );
  }

  // Default card variant
  return (
    <CryptoCard
      variant="glass"
      glow={nft.rarity === 'legendary'}
      animated={interactive}
      className={cn(sizeClasses[size], 'overflow-hidden', className)}
      {...props}
    >
      <CryptoCardContent className="p-0">
        {/* NFT Image */}
        <div className="relative aspect-square">
          {!imageError ? (
            <img
              src={nft.image}
              alt={nft.name}
              className={cn(
                'w-full h-full object-cover transition-all duration-500',
                imageLoaded ? 'opacity-100' : 'opacity-0',
                interactive && 'hover:scale-105'
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          
          {/* Rarity Badge */}
          {nft.rarity && (
            <div className="absolute top-3 right-3">
              <CryptoBadge
                variant="holographic"
                color={getRarityColor(nft.rarity)}
                size="sm"
                className="capitalize"
              >
                {nft.rarity}
              </CryptoBadge>
            </div>
          )}
        </div>

        {/* NFT Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-white text-lg font-display truncate">
              {nft.name}
            </h3>
            <p className="text-sm text-purple-300 font-medium truncate">
              {nft.collection}
            </p>
          </div>

          {showDetails && (
            <>
              {nft.description && (
                <p className="text-xs text-gray-400 line-clamp-2">
                  {nft.description}
                </p>
              )}

              {/* Attributes */}
              {nft.attributes && nft.attributes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs text-gray-400 uppercase tracking-wider font-mono">
                    Attributes
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {nft.attributes.slice(0, 4).map((attr, index) => (
                      <CryptoBadge
                        key={index}
                        variant="glass"
                        color="purple"
                        size="xs"
                        className="text-xs"
                      >
                        {attr.trait_type}: {attr.value}
                      </CryptoBadge>
                    ))}
                  </div>
                </div>
              )}

              {/* Price and Actions */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                {nft.price && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Current Price</span>
                    <span className="font-mono font-bold text-green-400">
                      {nft.price} {nft.currency || 'ETH'}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={onView}
                    className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-sm font-medium text-white transition-all duration-200"
                  >
                    View Details
                  </button>
                  {nft.price && onBuy && (
                    <button
                      onClick={onBuy}
                      className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 rounded-lg text-sm font-medium text-green-300 transition-all duration-200"
                    >
                      Buy
                    </button>
                  )}
                  {onSell && (
                    <button
                      onClick={onSell}
                      className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-sm font-medium text-blue-300 transition-all duration-200"
                    >
                      Sell
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </CryptoCardContent>

      {/* Legendary shimmer effect */}
      {nft.rarity === 'legendary' && (
        <HolographicShimmer
          variant="rainbow"
          speed="slow"
          className="absolute inset-0"
        >
          <></>
        </HolographicShimmer>
      )}
    </CryptoCard>
  );
}

interface NFTGridProps {
  nfts: NFTData[];
  columns?: 2 | 3 | 4 | 6;
  variant?: 'card' | 'showcase' | 'gallery';
  size?: 'sm' | 'md' | 'lg';
  onNFTView?: (nft: NFTData) => void;
  onNFTBuy?: (nft: NFTData) => void;
  className?: string;
}

export function NFTGrid({
  nfts,
  columns = 3,
  variant = 'gallery',
  size = 'md',
  onNFTView,
  onNFTBuy,
  className,
  ...props
}: NFTGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
  };

  return (
    <div 
      className={cn(
        'grid gap-4',
        gridCols[columns],
        className
      )}
      {...props}
    >
      {nfts.map((nft) => (
        <NFTDisplay
          key={nft.id}
          nft={nft}
          variant={variant}
          size={size}
          onView={() => onNFTView?.(nft)}
          onBuy={() => onNFTBuy?.(nft)}
        />
      ))}
    </div>
  );
}