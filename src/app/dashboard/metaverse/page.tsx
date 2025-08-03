'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { gradientStyles } from '@/styles/gradients';

export default function MetaversePage() {
  const [connectedWorlds, setConnectedWorlds] = useState(3);
  const [avatarLevel, setAvatarLevel] = useState(42);

  const worlds = [
    {
      name: 'Rio Virtual Beach',
      type: 'Social',
      players: 2847,
      maxPlayers: 5000,
      events: 3,
      thumbnail: '🏖️',
      status: 'Online',
      featured: true
    },
    {
      name: 'Crypto Trading Floor',
      type: 'Business',
      players: 1234,
      maxPlayers: 2000,
      events: 1,
      thumbnail: '📈',
      status: 'Online',
      featured: false
    },
    {
      name: 'NFT Art Gallery',
      type: 'Cultural',
      players: 567,
      maxPlayers: 1000,
      events: 2,
      thumbnail: '🎨',
      status: 'Online',
      featured: true
    },
    {
      name: 'DAO Meeting Hall',
      type: 'Governance',
      players: 89,
      maxPlayers: 500,
      events: 0,
      thumbnail: '🏛️',
      status: 'Maintenance',
      featured: false
    }
  ];

  const myAssets = [
    {
      type: 'Avatar',
      name: 'Cyber Samurai',
      rarity: 'Legendary',
      value: '2.5 ETH',
      thumbnail: '🥷',
      equipped: true
    },
    {
      type: 'Land',
      name: 'Beachfront Plot #420',
      rarity: 'Epic',
      value: '1.8 ETH',
      thumbnail: '🏝️',
      equipped: false
    },
    {
      type: 'Vehicle',
      name: 'Neon Hover Bike',
      rarity: 'Rare',
      value: '0.5 ETH',
      thumbnail: '🏍️',
      equipped: true
    },
    {
      type: 'Accessory',
      name: 'Holographic Wings',
      rarity: 'Ultra Rare',
      value: '3.2 ETH',
      thumbnail: '🦋',
      equipped: false
    }
  ];

  const events = [
    {
      name: 'Rio Sunset Concert',
      world: 'Rio Virtual Beach',
      time: 'In 2 hours',
      attendees: 458,
      type: 'Music',
      reward: '50 PORTO',
      thumbnail: '🎵'
    },
    {
      name: 'NFT Auction Night',
      world: 'NFT Art Gallery',
      time: 'Tomorrow 8PM',
      attendees: 234,
      type: 'Auction',
      reward: 'Exclusive NFT',
      thumbnail: '🎭'
    },
    {
      name: 'DeFi Workshop',
      world: 'Crypto Trading Floor',
      time: 'Friday 3PM',
      attendees: 123,
      type: 'Education',
      reward: '25 PORTO',
      thumbnail: '📚'
    }
  ];

  const achievements = [
    { name: 'World Explorer', description: 'Visited 10+ worlds', icon: '🌍', unlocked: true },
    { name: 'Social Butterfly', description: 'Met 100+ players', icon: '🦋', unlocked: true },
    { name: 'Event Master', description: 'Attended 25+ events', icon: '🎪', unlocked: false },
    { name: 'Land Baron', description: 'Own 5+ land plots', icon: '🏰', unlocked: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-display">
            Metaverse Portal 🌌
          </h1>
          <p className="text-xl text-muted-foreground">
            Enter infinite realities, fren 🚀✨
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 backdrop-blur-md" style={gradientStyles.cryptoGradient}>
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400">{avatarLevel}</div>
              <div className="text-sm text-muted-foreground">Avatar Level</div>
            </div>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400">{connectedWorlds}</div>
              <div className="text-sm text-muted-foreground">Worlds Connected</div>
            </div>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400">8.7 ETH</div>
              <div className="text-sm text-muted-foreground">Assets Value</div>
            </div>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400">247</div>
              <div className="text-sm text-muted-foreground">Friends Online</div>
            </div>
          </Card>
        </div>

        {/* Featured Worlds */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Available Worlds 🌍</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {worlds.map((world, index) => (
              <Card key={index} className={`border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300 group ${world.featured ? 'ring-2 ring-purple-500/50' : ''}`}>
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{world.thumbnail}</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{world.name}</h3>
                          {world.featured && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
                              ⭐ Featured
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {world.type}
                        </Badge>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        world.status === 'Online' ? 'text-green-400 border-green-400/50' : 'text-orange-400 border-orange-400/50'
                      }`}
                    >
                      {world.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Players</span>
                      <span className="text-cyan-400">{world.players.toLocaleString()} / {world.maxPlayers.toLocaleString()}</span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(world.players / world.maxPlayers) * 100}%` }}
                      ></div>
                    </div>
                    
                    {world.events > 0 && (
                      <div className="text-sm text-yellow-400">
                        🎪 {world.events} active events
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      world.status === 'Online' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0' 
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                    disabled={world.status !== 'Online'}
                  >
                    {world.status === 'Online' ? 'Enter World 🚪' : 'Under Maintenance 🔧'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* My Assets */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">My Assets 💎</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {myAssets.map((asset, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md hover:scale-105 transition-all duration-300 group">
                <div className="p-6 space-y-4">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-4xl">
                      {asset.thumbnail}
                    </div>
                    {asset.equipped && (
                      <Badge className="absolute top-2 right-2 bg-green-500/20 text-green-400 border-green-400/50 text-xs">
                        Equipped ✓
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {asset.type}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          asset.rarity === 'Legendary' ? 'text-yellow-400 border-yellow-400/50' :
                          asset.rarity === 'Ultra Rare' ? 'text-purple-400 border-purple-400/50' :
                          asset.rarity === 'Epic' ? 'text-blue-400 border-blue-400/50' :
                          'text-green-400 border-green-400/50'
                        }`}
                      >
                        {asset.rarity}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-sm">{asset.name}</h3>
                    <div className="text-lg font-bold text-green-400">{asset.value}</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={asset.equipped ? 'outline' : 'primary'}
                      className={asset.equipped ? '' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0'}
                    >
                      {asset.equipped ? 'Unequip' : 'Equip'}
                    </Button>
                    <Button variant="outline" size="sm">
                      Trade
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Upcoming Events 🎪</h2>
          <div className="space-y-4">
            {events.map((event, index) => (
              <Card key={index} className="border-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{event.thumbnail}</div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg">{event.name}</h3>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>🌍 {event.world}</span>
                        <span>👥 {event.attendees} attending</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-yellow-500/20 text-yellow-400">
                          🎁 {event.reward}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="text-sm text-cyan-400 font-semibold">{event.time}</div>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    >
                      Join Event 🎫
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Achievements 🏆</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`border-0 backdrop-blur-md ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10' 
                  : 'bg-gradient-to-br from-gray-500/10 to-gray-600/10'
              }`}>
                <div className="p-4 text-center space-y-2">
                  <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`font-bold text-sm ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {achievement.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.unlocked && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-400/50 text-xs">
                      Unlocked ✓
                    </Badge>
                  )}
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
              <div className="text-sm">Customize Avatar</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
            <div className="text-center">
              <div className="text-lg">🏪</div>
              <div className="text-sm">Asset Marketplace</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
            <div className="text-center">
              <div className="text-lg">👥</div>
              <div className="text-sm">Find Friends</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            <div className="text-center">
              <div className="text-lg">🏗️</div>
              <div className="text-sm">Build World</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}