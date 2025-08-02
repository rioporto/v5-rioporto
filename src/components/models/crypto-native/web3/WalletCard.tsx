'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CryptoCard, CryptoCardHeader, CryptoCardTitle, CryptoCardContent } from '../CryptoCard';
import { CryptoBadge } from '../CryptoBadge';
import { GlowEffect } from '../effects/GlowEffect';

interface WalletData {
  address: string;
  balance: string;
  currency: string;
  usdValue: string;
  network: string;
  connected: boolean;
  avatar?: string;
  ens?: string;
}

interface WalletCardProps {
  wallet: WalletData;
  variant?: 'glass' | 'neon' | 'holographic';
  size?: 'sm' | 'md' | 'lg';
  showQR?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onCopy?: () => void;
  className?: string;
}

export function WalletCard({
  wallet,
  variant = 'glass',
  size = 'md',
  showQR = false,
  onConnect,
  onDisconnect,
  onCopy,
  className,
  ...props
}: WalletCardProps) {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkColor = (network: string): "purple" | "green" | "blue" | "pink" | "yellow" | "red" | "gray" => {
    const colors: Record<string, "purple" | "green" | "blue" | "pink" | "yellow" | "red" | "gray"> = {
      ethereum: 'blue',
      polygon: 'purple',
      bsc: 'yellow',
      avalanche: 'red',
      solana: 'green'
    };
    return colors[network.toLowerCase()] || 'gray';
  };

  return (
    <CryptoCard
      variant={variant}
      glow={wallet.connected}
      animated={true}
      className={cn('w-full max-w-sm', sizeClasses[size], className)}
      {...props}
    >
      <CryptoCardHeader>
        <div className="flex items-center justify-between">
          <CryptoCardTitle glow={wallet.connected}>
            {wallet.ens || 'Web3 Wallet'}
          </CryptoCardTitle>
          <div className="flex items-center gap-2">
            <CryptoBadge
              variant="neon"
              color={getNetworkColor(wallet.network)}
              size="sm"
            >
              {wallet.network}
            </CryptoBadge>
            <div className={cn(
              'w-2 h-2 rounded-full',
              wallet.connected ? 'bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-red-400'
            )} />
          </div>
        </div>
      </CryptoCardHeader>

      <CryptoCardContent>
        <div className="space-y-4">
          {/* Wallet Address */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-mono">
              Address
            </label>
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-2 border border-white/10">
              <span className="font-mono text-sm text-gray-300">
                {formatAddress(wallet.address)}
              </span>
              <button
                onClick={onCopy}
                className="p-1 text-gray-400 hover:text-white transition-colors rounded"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Balance */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-mono">
              Balance
            </label>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white font-mono">
                  {wallet.balance}
                </span>
                <span className="text-lg text-purple-300 font-mono">
                  {wallet.currency}
                </span>
              </div>
              <div className="text-sm text-gray-400 font-mono">
                ≈ ${wallet.usdValue} USD
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          {showQR && (
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-mono">
                QR Code
              </label>
              <div className="aspect-square w-full max-w-[120px] mx-auto bg-white rounded-lg p-2">
                {/* QR Code would be generated here */}
                <div className="w-full h-full bg-black rounded flex items-center justify-center text-white text-xs">
                  QR
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {!wallet.connected ? (
              <button
                onClick={onConnect}
                className={cn(
                  'flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500',
                  'text-white font-semibold rounded-lg',
                  'hover:from-purple-600 hover:to-pink-600',
                  'transition-all duration-200',
                  'shadow-[0_0_20px_rgba(147,51,234,0.5)]',
                  'hover:shadow-[0_0_30px_rgba(147,51,234,0.7)]'
                )}
              >
                Connect Wallet
              </button>
            ) : (
              <>
                <button
                  onClick={onDisconnect}
                  className={cn(
                    'flex-1 px-3 py-2 bg-white/5 border border-white/20',
                    'text-gray-300 hover:text-white font-medium rounded-lg',
                    'hover:bg-white/10 hover:border-white/30',
                    'transition-all duration-200'
                  )}
                >
                  Disconnect
                </button>
                <button
                  className={cn(
                    'px-3 py-2 bg-green-500/20 border border-green-400/30',
                    'text-green-300 hover:text-green-200 font-medium rounded-lg',
                    'hover:bg-green-500/30 hover:border-green-400/50',
                    'transition-all duration-200'
                  )}
                >
                  Send
                </button>
                <button
                  className={cn(
                    'px-3 py-2 bg-blue-500/20 border border-blue-400/30',
                    'text-blue-300 hover:text-blue-200 font-medium rounded-lg',
                    'hover:bg-blue-500/30 hover:border-blue-400/50',
                    'transition-all duration-200'
                  )}
                >
                  Receive
                </button>
              </>
            )}
          </div>
        </div>
      </CryptoCardContent>

      {/* Glow effect when connected */}
      {wallet.connected && (
        <GlowEffect
          color="purple"
          intensity="medium"
          className="absolute -inset-2 -z-10"
          animated={true}
          pulse={true}
        />
      )}
    </CryptoCard>
  );
}

interface MultiWalletCardProps {
  wallets: WalletData[];
  activeWallet?: string;
  onWalletSelect?: (address: string) => void;
  onConnect?: (address: string) => void;
  className?: string;
}

export function MultiWalletCard({
  wallets,
  activeWallet,
  onWalletSelect,
  onConnect,
  className,
  ...props
}: MultiWalletCardProps) {
  return (
    <CryptoCard variant="glass" className={cn('w-full max-w-md', className)} {...props}>
      <CryptoCardHeader>
        <CryptoCardTitle>My Wallets</CryptoCardTitle>
      </CryptoCardHeader>

      <CryptoCardContent>
        <div className="space-y-2">
          {wallets.map((wallet, index) => (
            <div
              key={wallet.address}
              className={cn(
                'p-3 rounded-lg border transition-all duration-200 cursor-pointer',
                activeWallet === wallet.address
                  ? 'bg-purple-500/20 border-purple-400/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              )}
              onClick={() => onWalletSelect?.(wallet.address)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
                    activeWallet === wallet.address
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  )}>
                    {(wallet.ens || wallet.address).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {wallet.ens || `Wallet ${index + 1}`}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {formatAddress(wallet.address)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-mono text-sm text-white">
                    {wallet.balance} {wallet.currency}
                  </div>
                  <div className="text-xs text-gray-400">
                    ${wallet.usdValue}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <CryptoBadge
                  variant="outline"
                  color={getNetworkColor(wallet.network)}
                  size="xs"
                >
                  {wallet.network}
                </CryptoBadge>
                
                {!wallet.connected ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onConnect?.(wallet.address);
                    }}
                    className="text-xs px-2 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors"
                  >
                    Connect
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Connected
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CryptoCardContent>
    </CryptoCard>
  );
}

// Helper function used in multiple components
function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getNetworkColor(network: string): 'purple' | 'blue' | 'yellow' | 'red' | 'green' | 'gray' {
  const colors: Record<string, 'purple' | 'blue' | 'yellow' | 'red' | 'green' | 'gray'> = {
    ethereum: 'blue',
    polygon: 'purple',
    bsc: 'yellow',
    avalanche: 'red',
    solana: 'green'
  };
  return colors[network.toLowerCase()] || 'gray';
}