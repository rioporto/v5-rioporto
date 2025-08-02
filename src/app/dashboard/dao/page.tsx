'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

export default function DAOPage() {
  const [votingPower, setVotingPower] = useState(25420);
  const [totalStaked, setTotalStaked] = useState(125000);

  const proposals = [
    {
      id: 'RIP-001',
      title: 'Implement Cross-Chain Bridge',
      description: 'Enable seamless transfers between Ethereum and Polygon networks',
      status: 'Active',
      votesFor: 45670,
      votesAgainst: 12340,
      totalVotes: 58010,
      timeLeft: '2 days',
      category: 'Technical',
      impact: 'High',
      emoji: '🌉'
    },
    {
      id: 'RIP-002',
      title: 'Community Fund Allocation',
      description: 'Allocate 500K PORTO tokens for ecosystem development',
      status: 'Passed',
      votesFor: 89230,
      votesAgainst: 23450,
      totalVotes: 112680,
      timeLeft: 'Ended',
      category: 'Treasury',
      impact: 'High',
      emoji: '💰'
    },
    {
      id: 'RIP-003',
      title: 'New Staking Rewards Model',
      description: 'Introduce dynamic APY based on network usage',
      status: 'Draft',
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      timeLeft: '5 days to start',
      category: 'Tokenomics',
      impact: 'Medium',
      emoji: '⚡'
    }
  ];

  const governance = [
    { metric: 'Total Stakers', value: '12,456', icon: '👥' },
    { metric: 'Governance Token Supply', value: '10M PORTO', icon: '🪙' },
    { metric: 'Treasury Balance', value: '$2.4M', icon: '🏦' },
    { metric: 'Active Proposals', value: '3', icon: '📊' }
  ];

  const myVotes = [
    { proposal: 'RIP-001', vote: 'For', power: 25420, status: 'Active' },
    { proposal: 'RIP-002', vote: 'For', power: 23100, status: 'Passed' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-display">
            DAO Governance 🏛️
          </h1>
          <p className="text-xl text-muted-foreground">
            Shape the future together, anon 🗳️✨
          </p>
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {governance.map((item, index) => (
            <Card key={index} className="border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md">
              <div className="p-6 text-center space-y-2">
                <div className="text-2xl">{item.icon}</div>
                <div className="text-2xl font-bold text-purple-400">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.metric}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Your Voting Power */}
        <Card className="border-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Your Voting Power 💪</h2>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                Stake More PORTO 🚀
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-cyan-400">{votingPower.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">PORTO Staked</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-green-400">{((votingPower / totalStaked) * 100).toFixed(2)}%</div>
                <div className="text-sm text-muted-foreground">Voting Power</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-yellow-400">2</div>
                <div className="text-sm text-muted-foreground">Active Votes</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Proposals */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Proposals 📋</h2>
          <div className="space-y-4">
            {proposals.map((proposal, index) => (
              <Card key={index} className="border-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md">
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{proposal.emoji}</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-xl">{proposal.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {proposal.id}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{proposal.description}</p>
                        <div className="flex gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              proposal.status === 'Active' ? 'text-green-400 border-green-400/50' :
                              proposal.status === 'Passed' ? 'text-blue-400 border-blue-400/50' :
                              'text-orange-400 border-orange-400/50'
                            }`}
                          >
                            {proposal.status}
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-gray-700/50">
                            {proposal.category}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              proposal.impact === 'High' ? 'text-red-400 border-red-400/50' :
                              'text-yellow-400 border-yellow-400/50'
                            }`}
                          >
                            {proposal.impact} Impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="text-sm text-muted-foreground">{proposal.timeLeft}</div>
                      <div className="text-sm text-cyan-400">
                        {proposal.totalVotes.toLocaleString()} votes
                      </div>
                    </div>
                  </div>
                  
                  {proposal.totalVotes > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">
                          For: {proposal.votesFor.toLocaleString()} ({((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%)
                        </span>
                        <span className="text-red-400">
                          Against: {proposal.votesAgainst.toLocaleString()} ({((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <Progress 
                        value={(proposal.votesFor / proposal.totalVotes) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    {proposal.status === 'Active' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                        >
                          Vote For 👍
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-400/50 text-red-400 hover:bg-red-400/10"
                        >
                          Vote Against 👎
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      View Details 📖
                    </Button>
                    <Button variant="outline" size="sm">
                      Discuss 💬
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* My Voting History */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">My Votes 🗳️</h2>
          <div className="space-y-4">
            {myVotes.map((vote, index) => (
              <Card key={index} className="border-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-xs">
                      {vote.proposal}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Voted:</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          vote.vote === 'For' ? 'text-green-400 border-green-400/50' : 'text-red-400 border-red-400/50'
                        }`}
                      >
                        {vote.vote === 'For' ? '👍 For' : '👎 Against'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Power: <span className="text-cyan-400 font-semibold">{vote.power.toLocaleString()}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        vote.status === 'Active' ? 'text-green-400 border-green-400/50' : 'text-blue-400 border-blue-400/50'
                      }`}
                    >
                      {vote.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            <div className="text-center">
              <div className="text-lg">📝</div>
              <div className="text-sm">Create Proposal</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
            <div className="text-center">
              <div className="text-lg">💰</div>
              <div className="text-sm">Stake PORTO</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
            <div className="text-center">
              <div className="text-lg">💬</div>
              <div className="text-sm">Join Discord</div>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            <div className="text-center">
              <div className="text-lg">📊</div>
              <div className="text-sm">Analytics</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}