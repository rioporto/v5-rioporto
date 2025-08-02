'use client';

import { useState, useEffect } from 'react';
import { NFTCard } from './NFTCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

interface NFT {
  id: string;
  name: string;
  collection: string;
  image: string;
  price?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Ultra Rare';
  rank?: number;
  traits?: string[];
  isOwned?: boolean;
}

interface NFTGalleryProps {
  nfts: NFT[];
  title?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}

const rarityOrder = {
  'Common': 1,
  'Rare': 2,
  'Epic': 3,
  'Legendary': 4,
  'Ultra Rare': 5
};

export function NFTGallery({
  nfts,
  title = 'NFT Gallery',
  showFilters = true,
  showSearch = true,
  columns = 3,
  className = ''
}: NFTGalleryProps) {
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>(nfts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'price' | 'rank'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const collections = Array.from(new Set(nfts.map(nft => nft.collection)));
  const rarities = ['Common', 'Rare', 'Epic', 'Legendary', 'Ultra Rare'];

  useEffect(() => {
    let filtered = [...nfts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(nft => 
        nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nft.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nft.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Rarity filter
    if (selectedRarity !== 'all') {
      filtered = filtered.filter(nft => nft.rarity === selectedRarity);
    }

    // Collection filter
    if (selectedCollection !== 'all') {
      filtered = filtered.filter(nft => nft.collection === selectedCollection);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rarity':
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'price':
          const priceA = parseFloat(a.price?.replace(/[^\d.]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[^\d.]/g, '') || '0');
          return priceB - priceA;
        case 'rank':
          return (a.rank || 999999) - (b.rank || 999999);
        default:
          return 0;
      }
    });

    setFilteredNFTs(filtered);
  }, [nfts, searchTerm, selectedRarity, selectedCollection, sortBy]);

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {title} ✨
          </h2>
          <div className="text-sm text-muted-foreground">
            {filteredNFTs.length} of {nfts.length} items
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            🔲 Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            📃 List
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="flex flex-wrap gap-4 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md rounded-lg">
          {/* Search */}
          {showSearch && (
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search NFTs... 🔍"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700/50 border-gray-600/50"
              />
            </div>
          )}

          {/* Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {/* Collection Filter */}
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-md text-sm"
              >
                <option value="all">All Collections</option>
                {collections.map(collection => (
                  <option key={collection} value={collection}>
                    {collection}
                  </option>
                ))}
              </select>

              {/* Rarity Filter */}
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-md text-sm"
              >
                <option value="all">All Rarities</option>
                {rarities.map(rarity => (
                  <option key={rarity} value={rarity}>
                    {rarity}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-md text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="rarity">Sort by Rarity</option>
                <option value="price">Sort by Price</option>
                <option value="rank">Sort by Rank</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Quick Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedRarity === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedRarity('all')}
          >
            All ✨
          </Button>
          {rarities.map(rarity => (
            <Button
              key={rarity}
              variant={selectedRarity === rarity ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedRarity(rarity)}
              className={`${
                selectedRarity === rarity 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0' 
                  : ''
              }`}
            >
              {rarity} {rarity === 'Legendary' ? '👑' : rarity === 'Ultra Rare' ? '💎' : ''}
            </Button>
          ))}
        </div>
      )}

      {/* NFT Grid/List */}
      {filteredNFTs.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <div className="text-4xl">😢</div>
          <div className="text-xl text-muted-foreground">No NFTs found</div>
          <div className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </div>
          <Button
            onClick={() => {
              setSearchTerm('');
              setSelectedRarity('all');
              setSelectedCollection('all');
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
          >
            Clear Filters 🔄
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {filteredNFTs.map((nft, index) => (
            <div
              key={nft.id}
              className="animate-in fade-in-0 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <NFTCard
                {...nft}
                onLike={() => console.log('Liked', nft.id)}
                onBuy={() => console.log('Buy', nft.id)}
                onSell={() => console.log('Sell', nft.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredNFTs.map((nft, index) => (
            <div
              key={nft.id}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md rounded-lg hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-2xl">
                {nft.image}
              </div>
              
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-lg">{nft.name}</h3>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {nft.collection}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {nft.rarity}
                  </Badge>
                </div>
              </div>
              
              {nft.price && (
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">{nft.price}</div>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View 👁️
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  {nft.isOwned ? 'Sell' : 'Buy'} 💎
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredNFTs.length > 0 && (
        <div className="text-center pt-8">
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
          >
            Load More NFTs 🚀
          </Button>
        </div>
      )}
    </div>
  );
}