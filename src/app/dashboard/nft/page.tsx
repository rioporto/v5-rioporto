'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function NFTPage() {
  const [filter, setFilter] = useState('all');

  const collections = [
    {
      name: 'RioPorto Genesis',
      floor: '2.5 ETH',
      volume: '147 ETH',
      items: 10000,
      owners: 3420,
      image: '🏖️',
      rarity: 'Legendary'
    },
    {
      name: 'Crypto Cariocas',
      floor: '0.8 ETH',
      volume: '89 ETH',
      items: 5000,
      owners: 1250,
      image: '🕺',
      rarity: 'Epic'
    },
    {
      name: 'P2P Punks',
      floor: '1.2 ETH',
      volume: '234 ETH',
      items: 8888,
      owners: 2100,
      image: '🤖',
      rarity: 'Rare'
    }
  ];

  const myNFTs = [
    {
      id: '#4269',
      collection: 'RioPorto Genesis',
      name: 'Beach Vibe #4269',
      image: '🏄‍♂️',
      rarity: 'Ultra Rare',
      rank: 42,
      value: '3.2 ETH',
      traits: ['Golden Board', 'Sunset Eyes', 'Wave Master']
    },
    {
      id: '#1337',
      collection: 'Crypto Cariocas',
      name: 'Samba King #1337',
      image: '👑',
      rarity: 'Legendary',
      rank: 13,
      value: '2.8 ETH',
      traits: ['Crown', 'Golden Chains', 'Dance Master']
    },
    {
      id: '#0420',
      collection: 'P2P Punks',
      name: 'Cyber Punk #0420',
      image: '🔥',
      rarity: 'Epic',
      rank: 158,
      value: '1.9 ETH',
      traits: ['Laser Eyes', 'Neon Hair', 'Code Matrix']
    }
  ];

  const trending = [
    { name: 'Bored Yacht Club', change: '+15.7%', volume: '1,247 ETH', image: '🐵' },
    { name: 'CryptoPunks', change: '+8.2%', volume: '892 ETH', image: '👾' },
    { name: 'Azuki', change: '+23.1%', volume: '567 ETH', image: '🌸' },
    { name: 'Doodles', change: '-5.3%', volume: '234 ETH', image: '✏️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-display">
            NFT Gallery 🎨
          </h1>
          <p className="text-xl text-muted-foreground">
            Your digital art collection, fren 💎🙌
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400">12</div>
              <div className="text-sm text-muted-foreground">NFTs Owned</div>
            </div>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400">7.9 ETH</div>
              <div className="text-sm text-muted-foreground">Portfolio Value</div>
            </div>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400">+24.5%</div>
              <div className="text-sm text-mute
            </div>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400">3</div>
              <div className="text-sm text-muted-foreground">Collections</div>
            </div>
          </Card>
        </div>

        {/* Trending Collections */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Trending Collections 🔥</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.map((item, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300">
                <div className="p-4 text-center space-y-2">
                  <div className="text-3xl">{item.image}</div>
                  <h3 className="font-bold text-sm">{item.name}</h3>
                  <div className="text-xs text-muted-foreground">{item.volume}</div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${item.change.startsWith('+') ? 'text-green-400 border-green-400/50' : 'text-red-400 border-red-400/50'}`}
                  >
                    {item.change}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* My NFTs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-foreground">My NFTs 💎</h2>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'rare' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('rare')}
              >
                Rare+
              </Button>
              <Button 
                variant={filter === 'favorites' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('favorites')}
              >
                ❤️ Favorites
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myNFTs.map((nft, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md hover:scale-105 transition-all duration-300 group">
                <div className="p-6 space-y-4">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-6xl">
                      {nft.image}
                    </div>
                    <Badge 
                      className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                    >
                      #{nft.rank}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg">{nft.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {nft.collection}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          nft.rarity === 'Legendary' ? 'text-yellow-400 border-yellow-400/50' :
                          nft.rarity === 'Ultra Rare' ? 'text-purple-400 border-purple-400/50' :
                          'text-blue-400 border-blue-400/50'
                        }`}
                      >
                        {nft.rarity}
                      </Badge>
                      <div className="text-xl font-bold text-green-400">{nft.value}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Traits:</div>
                      <div className="flex flex-wrap gap-1">
                        {nft.traits.map((trait, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-gray-700/50">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    >
                      List for Sale 💰
                    </Button>
                    <Button variant="outline" size="sm">
                      ❤️
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Collections Overview */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Popular Collections 🌟</h2>
          <div className="space-y-4">
            {collections.map((collection, index) => (
              <Card key={index} className="border-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{collection.image}</div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-xl">{collection.name}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{collection.items.toLocaleString()} items</span>
                        <span>{collection.owners.toLocaleString()} owners</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="flex gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground">Floor</div>
                        <div className="text-xl font-bold text-purple-400">{collection.floor}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Volume</div>
                        <div className="text-xl font-bold text-cyan-400">{collection.volume}</div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        collection.rarity === 'Legendary' ? 'text-yellow-400 border-yellow-400/50' :
                        collection.rarity === 'Epic' ? 'text-purple-400 border-purple-400/50' :
                        'text-blue-400 border-blue-400/50'
                      }`}
                    >
                      {collection.rarity}
                    </Badge>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                    View Collection 👀
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            <div className="text-center">
              <div className="text-lg">🎨</div>
              <div className="text-sm">Create NFT</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
            <div className="text-center">
              <div className="text-lg">🛒</div>
              <div className="text-sm">Browse Market</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
            <div className="text-center">
              <div className="text-lg">⚡</div>
              <div className="text-sm">Instant Buy</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            <div className="text-center">
              <div className="text-lg">🔥</div>
              <div className="text-sm">Hot Drops</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}