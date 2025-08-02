'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Meme {
  id: string;
  title: string;
  image: string;
  text: string;
  template: string;
  trending: boolean;
  uses: number;
  tags: string[];
}

interface MemeIntegrationProps {
  variant?: 'gallery' | 'generator' | 'reactions' | 'trending';
  allowGeneration?: boolean;
  showTrending?: boolean;
  onMemeSelect?: (meme: Meme) => void;
  className?: string;
}

const cryptoMemes: Meme[] = [
  {
    id: 'diamond-hands',
    title: 'Diamond Hands',
    image: '💎🙌',
    text: 'HODL till the moon!',
    template: 'diamond-hands',
    trending: true,
    uses: 1337,
    tags: ['hodl', 'diamond', 'crypto', 'stonks']
  },
  {
    id: 'this-is-fine',
    title: 'This is Fine',
    image: '🔥☕',
    text: 'Portfolio down 50%\n"This is fine"',
    template: 'this-is-fine',
    trending: false,
    uses: 420,
    tags: ['loss', 'cope', 'fire', 'fine']
  },
  {
    id: 'stonks',
    title: 'Stonks',
    image: '📈🚀',
    text: 'Number go up = Good',
    template: 'stonks',
    trending: true,
    uses: 2690,
    tags: ['stonks', 'up', 'profit', 'gains']
  },
  {
    id: 'wen-moon',
    title: 'Wen Moon',
    image: '🌙🚀',
    text: 'Sir, wen moon?',
    template: 'wen-moon',
    trending: true,
    uses: 999,
    tags: ['moon', 'when', 'lambo', 'sir']
  },
  {
    id: 'ngmi',
    title: 'NGMI',
    image: '📉💀',
    text: "You're NGMI anon",
    template: 'ngmi',
    trending: false,
    uses: 666,
    tags: ['ngmi', 'not', 'gonna', 'make', 'it']
  },
  {
    id: 'wagmi',
    title: 'WAGMI',
    image: '🚀💪',
    text: "We're all gonna make it!",
    template: 'wagmi',
    trending: true,
    uses: 1984,
    tags: ['wagmi', 'gonna', 'make', 'it', 'together']
  }
];

const memeTemplates = [
  { id: 'drake', name: 'Drake Pointing', emoji: '👉😤👉😏' },
  { id: 'distracted', name: 'Distracted Boyfriend', emoji: '👨‍💼👀👩‍🦰' },
  { id: 'womanyelling', name: 'Woman Yelling at Cat', emoji: '👩‍🦳😾🐱' },
  { id: 'stonks', name: 'Stonks', emoji: '📈🤓' },
  { id: 'brain', name: 'Expanding Brain', emoji: '🧠✨' },
  { id: 'chad', name: 'Chad vs Virgin', emoji: '💪😎🤓' }
];

const genZSlang = [
  'no cap', 'fr fr', 'bussin', 'slay', 'periodt', 'bet', 'say less',
  'its giving', 'understood the assignment', 'main character energy',
  'rent free', 'touch grass', 'ratio', 'based', 'cringe', 'mid'
];

export function MemeIntegration({
  variant = 'gallery',
  allowGeneration = true,
  showTrending = true,
  onMemeSelect,
  className = ''
}: MemeIntegrationProps) {
  const [memes, setMemes] = useState(cryptoMemes);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [memeText, setMemeText] = useState('');
  const [generatedMeme, setGeneratedMeme] = useState<Meme | null>(null);
  const [trendingMemes, setTrendingMemes] = useState<Meme[]>([]);

  useEffect(() => {
    if (showTrending) {
      setTrendingMemes(memes.filter(m => m.trending).sort((a, b) => b.uses - a.uses));
    }
  }, [memes, showTrending]);

  const generateMeme = () => {
    if (!selectedTemplate || !memeText) return;

    const template = memeTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;

    const newMeme: Meme = {
      id: `generated-${Date.now()}`,
      title: `Generated ${template.name}`,
      image: template.emoji,
      text: memeText,
      template: selectedTemplate,
      trending: false,
      uses: 0,
      tags: ['generated', 'custom']
    };

    setGeneratedMeme(newMeme);
    setMemes(prev => [newMeme, ...prev]);
  };

  const addSlangToText = (slang: string) => {
    setMemeText(prev => prev ? `${prev} ${slang}` : slang);
  };

  if (variant === 'generator') {
    return (
      <Card className={`p-6 border-0 bg-crypto-gradient backdrop-blur-md ${className}`}>
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Meme Generator 🎭
            </h3>
            <p className="text-muted-foreground">Create your own crypto memes!</p>
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Choose Template:</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {memeTemplates.map(template => (
                <Button
                  key={template.id}
                  variant={selectedTemplate === template.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-3 h-auto ${
                    selectedTemplate === template.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0' 
                      : ''
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">{template.emoji}</div>
                    <div className="text-xs">{template.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Meme Text:</label>
            <textarea
              value={memeText}
              onChange={(e) => setMemeText(e.target.value)}
              placeholder="Enter your meme text here..."
              className="w-full p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-foreground resize-none h-24"
            />
          </div>

          {/* Gen Z Slang Quick Add */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Add Some Slang:</label>
            <div className="flex flex-wrap gap-2">
              {genZSlang.map(slang => (
                <Button
                  key={slang}
                  variant="outline"
                  size="sm"
                  onClick={() => addSlangToText(slang)}
                  className="text-xs hover:bg-purple-500/20"
                >
                  {slang}
                </Button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateMeme}
            disabled={!selectedTemplate || !memeText}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
          >
            Generate Meme 🎨
          </Button>

          {/* Generated Meme Preview */}
          {generatedMeme && (
            <Card className="p-4 bg-gray-800/50 border border-purple-500/30">
              <div className="text-center space-y-2">
                <div className="text-4xl">{generatedMeme.image}</div>
                <div className="text-sm font-semibold">{generatedMeme.title}</div>
                <div className="text-xs text-muted-foreground whitespace-pre-line">
                  {generatedMeme.text}
                </div>
                <Button
                  size="sm"
                  onClick={() => onMemeSelect?.(generatedMeme)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                >
                  Use This Meme 🚀
                </Button>
              </div>
            </Card>
          )}
        </div>
      </Card>
    );
  }

  if (variant === 'trending') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-foreground">Trending Memes 🔥</h3>
          <Badge className="bg-red-500/20 text-red-400 border-red-400/50 animate-pulse">
            HOT
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingMemes.slice(0, 6).map(meme => (
            <Card 
              key={meme.id}
              className="p-4 border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300 cursor-pointer group"
              onClick={() => onMemeSelect?.(meme)}
            >
              <div className="text-center space-y-3">
                <div className="text-3xl group-hover:scale-110 transition-transform">
                  {meme.image}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{meme.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {meme.text}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {meme.uses.toLocaleString()} uses
                  </Badge>
                  <div className="flex gap-1">
                    {meme.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Gallery variant (default)
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Meme Collection 🎭
        </h3>
        {allowGeneration && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {/* Switch to generator */}}
            className="hover:bg-purple-500/20"
          >
            Create Meme ✨
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {memes.map(meme => (
          <Card 
            key={meme.id}
            className={`
              p-4 border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md 
              hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300 cursor-pointer group
              ${meme.trending ? 'ring-2 ring-yellow-500/50' : ''}
            `}
            onClick={() => onMemeSelect?.(meme)}
          >
            <div className="space-y-3">
              {/* Trending badge */}
              {meme.trending && (
                <Badge className="w-fit bg-yellow-500/20 text-yellow-400 border-yellow-400/50 animate-pulse">
                  🔥 Trending
                </Badge>
              )}

              {/* Meme content */}
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {meme.image}
                </div>
                <h4 className="font-semibold text-foreground">{meme.title}</h4>
                <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                  {meme.text}
                </p>
              </div>

              {/* Stats and tags */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {meme.uses.toLocaleString()} uses
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {meme.template}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {meme.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {meme.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{meme.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Meme Reaction Component
interface MemeReactionProps {
  meme: Meme;
  onReaction?: (reaction: string) => void;
  className?: string;
}

export function MemeReaction({ meme, onReaction, className = '' }: MemeReactionProps) {
  const reactions = ['😂', '💀', '🔥', '💯', '👑', '🤡'];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="text-2xl">{meme.image}</div>
      <div className="flex-1">
        <div className="font-semibold text-sm">{meme.title}</div>
        <div className="text-xs text-muted-foreground">{meme.text}</div>
      </div>
      <div className="flex gap-1">
        {reactions.map(reaction => (
          <Button
            key={reaction}
            variant="ghost"
            size="sm"
            onClick={() => onReaction?.(reaction)}
            className="text-lg hover:scale-110 p-1 h-auto"
          >
            {reaction}
          </Button>
        ))}
      </div>
    </div>
  );
}

// Daily Meme Widget
export function DailyMeme({ className = '' }: { className?: string }) {
  const [dailyMeme, setDailyMeme] = useState<Meme | null>(null);

  useEffect(() => {
    // Select random trending meme as daily meme
    const trending = cryptoMemes.filter(m => m.trending);
    const random = trending[Math.floor(Math.random() * trending.length)];
    setDailyMeme(random);
  }, []);

  if (!dailyMeme) return null;

  return (
    <Card className={`p-4 border-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md ${className}`}>
      <div className="text-center space-y-3">
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/50">
          ☀️ Meme of the Day
        </Badge>
        
        <div className="text-4xl">{dailyMeme.image}</div>
        <div>
          <h4 className="font-bold text-foreground">{dailyMeme.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {dailyMeme.text}
          </p>
        </div>
        
        <div className="text-xs text-muted-foreground">
          💎 {dailyMeme.uses.toLocaleString()} diamond hands used this
        </div>
      </div>
    </Card>
  );
}