'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  type: 'system' | 'user' | 'admin' | 'party' | 'guild' | 'whisper';
  color?: string;
}

interface ChatBoxProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string) => void;
  maxMessages?: number;
  showTimestamps?: boolean;
  showUserColors?: boolean;
  channels?: string[];
  activeChannel?: string;
  onChannelChange?: (channel: string) => void;
  placeholder?: string;
  className?: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  onSendMessage,
  maxMessages = 100,
  showTimestamps = true,
  showUserColors = true,
  channels = ['ALL', 'PARTY', 'GUILD', 'SYSTEM'],
  activeChannel = 'ALL',
  onChannelChange,
  placeholder = 'Type your message...',
  className,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  // Check if user has scrolled up
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setAutoScroll(isAtBottom);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && onSendMessage) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  const messageTypeStyles = {
    system: {
      prefix: '[SYS]',
      color: 'text-gaming-neon-yellow',
      bg: 'bg-gaming-neon-yellow/5',
    },
    user: {
      prefix: '',
      color: 'text-white',
      bg: 'hover:bg-gaming-surface/20',
    },
    admin: {
      prefix: '[ADMIN]',
      color: 'text-gaming-neon-red',
      bg: 'bg-gaming-neon-red/5',
    },
    party: {
      prefix: '[PARTY]',
      color: 'text-gaming-neon-green',
      bg: 'bg-gaming-neon-green/5',
    },
    guild: {
      prefix: '[GUILD]',
      color: 'text-gaming-neon-cyan',
      bg: 'bg-gaming-neon-cyan/5',
    },
    whisper: {
      prefix: '[WHISPER]',
      color: 'text-gaming-neon-pink',
      bg: 'bg-gaming-neon-pink/5',
    },
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredMessages = messages
    .filter(msg => {
      if (activeChannel === 'ALL') return true;
      return msg.type.toLowerCase() === activeChannel.toLowerCase();
    })
    .slice(-maxMessages);

  return (
    <div className={cn(
      'flex flex-col bg-gaming-surface/20 border-2 border-gaming-neon-cyan rounded-lg overflow-hidden',
      'backdrop-blur-sm shadow-[0_0_20px_rgba(0,245,255,0.2)]',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gaming-surface/30 bg-gaming-surface/10">
        {/* Channel tabs */}
        <div className="flex gap-1">
          {channels.map(channel => (
            <button
              key={channel}
              onClick={() => onChannelChange?.(channel)}
              className={cn(
                'px-2 py-1 text-xs font-gaming-cyber uppercase tracking-wider rounded transition-all duration-200',
                activeChannel === channel
                  ? 'bg-gaming-neon-cyan/20 text-gaming-neon-cyan border border-gaming-neon-cyan'
                  : 'text-white/60 hover:text-white hover:bg-gaming-surface/20'
              )}
            >
              {channel}
            </button>
          ))}
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Auto-scroll indicator */}
          {!autoScroll && (
            <button
              onClick={() => setAutoScroll(true)}
              className="text-gaming-neon-yellow hover:text-gaming-neon-yellow/80 transition-colors"
              title="Scroll to bottom"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          )}
          
          {/* Minimize/expand */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gaming-neon-cyan hover:text-gaming-neon-cyan/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Messages container */}
      {isExpanded && (
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 h-64 overflow-y-auto p-2 space-y-1 font-gaming-mono text-sm scrollbar-thin scrollbar-track-gaming-surface scrollbar-thumb-gaming-neon-cyan"
        >
          {filteredMessages.map(message => {
            const typeConfig = messageTypeStyles[message.type];
            
            return (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-2 p-1 rounded transition-colors duration-200',
                  typeConfig.bg
                )}
              >
                {/* Timestamp */}
                {showTimestamps && (
                  <span className="text-xs text-white/40 font-gaming-mono flex-shrink-0 mt-0.5">
                    {formatTime(message.timestamp)}
                  </span>
                )}
                
                {/* Message content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    {/* System prefix */}
                    {typeConfig.prefix && (
                      <span className={cn('text-xs font-bold uppercase', typeConfig.color)}>
                        {typeConfig.prefix}
                      </span>
                    )}
                    
                    {/* Username */}
                    {message.type !== 'system' && (
                      <span className={cn(
                        'font-bold',
                        showUserColors && message.color ? `text-[${message.color}]` : typeConfig.color
                      )}>
                        {message.username}:
                      </span>
                    )}
                    
                    {/* Message text */}
                    <span className="text-white/90 break-words">
                      {message.message}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      {/* Input area */}
      {isExpanded && onSendMessage && (
        <div className="border-t border-gaming-surface/30 p-2 bg-gaming-surface/10">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className={cn(
                'flex-1 bg-gaming-dark border border-gaming-neon-cyan rounded px-3 py-2',
                'text-white placeholder-white/50 font-gaming-mono text-sm',
                'focus:outline-none focus:border-gaming-neon-pink focus:ring-1 focus:ring-gaming-neon-pink',
                'transition-colors duration-200'
              )}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={cn(
                'px-4 py-2 bg-gaming-neon-cyan border border-gaming-neon-cyan rounded',
                'text-gaming-dark font-gaming-cyber uppercase tracking-wider text-sm',
                'hover:bg-gaming-neon-cyan/80 transition-colors duration-200',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              SEND
            </button>
          </div>
        </div>
      )}
      
      {/* Corner brackets */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-gaming-neon-cyan opacity-60" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gaming-neon-cyan opacity-60" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gaming-neon-cyan opacity-60" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-gaming-neon-cyan opacity-60" />
    </div>
  );
};