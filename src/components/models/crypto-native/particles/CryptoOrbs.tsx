'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CryptoOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  symbol: string;
  color: string;
  rotation: number;
  rotationSpeed: number;
  pulse: number;
  pulseSpeed: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
}

interface CryptoOrbsProps {
  className?: string;
  orbCount?: number;
  symbols?: string[];
  colors?: string[];
  interactive?: boolean;
  connectionDistance?: number;
}

export const CryptoOrbs: React.FC<CryptoOrbsProps> = ({
  className = '',
  orbCount = 15,
  symbols = ['₿', 'Ξ', '₳', 'Ð', '₮', 'Ł', 'Ħ', '₪', '₲', '₱'],
  colors = ['#f7931a', '#627eea', '#0033ad', '#c99f2f', '#00d4ff'],
  interactive = true,
  connectionDistance = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<CryptoOrb[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Initialize orbs
    const initOrbs = () => {
      orbsRef.current = Array.from({ length: orbCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 20 + 30,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        pulse: 0,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        trail: [],
      }));
    };

    const drawOrb = (ctx: CanvasRenderingContext2D, orb: CryptoOrb) => {
      ctx.save();
      
      // Draw trail
      orb.trail.forEach((point, index) => {
        const trailSize = orb.size * 0.3 * (index / orb.trail.length);
        ctx.save();
        ctx.globalAlpha = point.opacity;
        ctx.fillStyle = orb.color;
        ctx.shadowColor = orb.color;
        ctx.shadowBlur = trailSize;
        ctx.beginPath();
        ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      // Main orb glow
      const pulseSize = orb.size + Math.sin(orb.pulse) * 10;
      const gradient = ctx.createRadialGradient(
        orb.x, orb.y, 0,
        orb.x, orb.y, pulseSize
      );
      gradient.addColorStop(0, orb.color + '80');
      gradient.addColorStop(0.7, orb.color + '20');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, pulseSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner core
      ctx.fillStyle = orb.color;
      ctx.shadowColor = orb.color;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
      
      // Symbol
      ctx.translate(orb.x, orb.y);
      ctx.rotate(orb.rotation);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.font = `${orb.size * 0.6}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(orb.symbol, 0, 0);
      
      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      orbsRef.current.forEach((orb, index) => {
        // Update trail
        orb.trail.unshift({ x: orb.x, y: orb.y, opacity: 0.8 });
        if (orb.trail.length > 20) orb.trail.pop();
        
        // Update trail opacity
        orb.trail.forEach((point, i) => {
          point.opacity *= 0.95;
        });

        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.rotation += orb.rotationSpeed;
        orb.pulse += orb.pulseSpeed;

        // Interactive mouse attraction
        if (interactive && mouseRef.current.active) {
          const dx = mouseRef.current.x - orb.x;
          const dy = mouseRef.current.y - orb.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            orb.vx += dx * force * 0.001;
            orb.vy += dy * force * 0.001;
            orb.rotationSpeed += force * 0.01;
            orb.pulseSpeed += force * 0.02;
          }
        }

        // Orb to orb interactions
        orbsRef.current.forEach((otherOrb, otherIndex) => {
          if (index !== otherIndex) {
            const dx = otherOrb.x - orb.x;
            const dy = otherOrb.y - orb.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Repulsion force
            if (distance < 100 && distance > 0) {
              const force = (100 - distance) / 100;
              orb.vx -= (dx / distance) * force * 0.5;
              orb.vy -= (dy / distance) * force * 0.5;
            }
            
            // Draw connections
            if (distance < connectionDistance && distance > 0) {
              const opacity = 1 - (distance / connectionDistance);
              ctx.save();
              ctx.globalAlpha = opacity * 0.3;
              ctx.strokeStyle = orb.color;
              ctx.lineWidth = 2;
              ctx.shadowColor = orb.color;
              ctx.shadowBlur = 5;
              ctx.beginPath();
              ctx.moveTo(orb.x, orb.y);
              ctx.lineTo(otherOrb.x, otherOrb.y);
              ctx.stroke();
              ctx.restore();
              
              // Data flow animation along connection
              const flowProgress = (Date.now() * 0.001) % 1;
              const flowX = orb.x + (otherOrb.x - orb.x) * flowProgress;
              const flowY = orb.y + (otherOrb.y - orb.y) * flowProgress;
              
              ctx.save();
              ctx.globalAlpha = opacity * 0.8;
              ctx.fillStyle = '#ffffff';
              ctx.shadowColor = '#ffffff';
              ctx.shadowBlur = 10;
              ctx.beginPath();
              ctx.arc(flowX, flowY, 3, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
        });

        // Boundary bouncing
        if (orb.x < orb.size || orb.x > canvas.width - orb.size) {
          orb.vx *= -0.8;
          orb.x = Math.max(orb.size, Math.min(canvas.width - orb.size, orb.x));
        }
        if (orb.y < orb.size || orb.y > canvas.height - orb.size) {
          orb.vy *= -0.8;
          orb.y = Math.max(orb.size, Math.min(canvas.height - orb.size, orb.y));
        }

        // Damping
        orb.vx *= 0.99;
        orb.vy *= 0.99;
        orb.rotationSpeed *= 0.99;
        orb.pulseSpeed = Math.max(0.02, orb.pulseSpeed * 0.99);

        drawOrb(ctx, orb);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initOrbs();
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [orbCount, symbols, colors, interactive, connectionDistance]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <canvas
      ref={canvasRef}
      className={`crypto-orbs w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)' }}
    />
  );
};

interface TradingVisualizerProps {
  className?: string;
  symbols?: Array<{ symbol: string; color: string; price: number; change: number }>;
  animationSpeed?: number;
}

export const TradingVisualizer: React.FC<TradingVisualizerProps> = ({
  className = '',
  symbols = [
    { symbol: '₿', color: '#f7931a', price: 45000, change: 2.5 },
    { symbol: 'Ξ', color: '#627eea', price: 3200, change: -1.2 },
    { symbol: '₳', color: '#0033ad', price: 1.2, change: 5.8 },
    { symbol: 'Ð', color: '#c99f2f', price: 0.08, change: -3.1 },
    { symbol: '₮', color: '#00d4ff', price: 1.0, change: 0.1 },
  ],
  animationSpeed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prices, setPrices] = useState(symbols.map(s => s.price));
  const [changes, setChanges] = useState(symbols.map(s => s.change));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Simulate price changes
    const priceInterval = setInterval(() => {
      setPrices(prevPrices => 
        prevPrices.map((price, index) => {
          const volatility = symbols[index].symbol === '₿' ? 0.02 : 0.05;
          const change = (Math.random() - 0.5) * volatility;
          return Math.max(0.01, price * (1 + change));
        })
      );
      
      setChanges(prevChanges =>
        prevChanges.map(() => (Math.random() - 0.5) * 10)
      );
    }, 2000 / animationSpeed);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 3;

      symbols.forEach((symbol, index) => {
        const angle = (index / symbols.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const change = changes[index];
        const isPositive = change > 0;
        const orbSize = 30 + Math.abs(change) * 2;
        
        // Price change indicator
        ctx.save();
        ctx.translate(x, y);
        
        // Orb background
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, orbSize);
        gradient.addColorStop(0, symbol.color + '80');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, orbSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Symbol
        ctx.fillStyle = symbol.color;
        ctx.shadowColor = symbol.color;
        ctx.shadowBlur = 15;
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(symbol.symbol, 0, -5);
        
        // Price
        ctx.font = '12px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`$${prices[index].toFixed(2)}`, 0, 15);
        
        // Change indicator
        ctx.font = '10px monospace';
        ctx.fillStyle = isPositive ? '#00ff00' : '#ff0000';
        ctx.fillText(`${isPositive ? '+' : ''}${change.toFixed(1)}%`, 0, 28);
        
        // Price movement animation
        const moveDistance = change * 2;
        ctx.strokeStyle = isPositive ? '#00ff00' : '#ff0000';
        ctx.lineWidth = 3;
        ctx.shadowColor = isPositive ? '#00ff00' : '#ff0000';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, 35);
        ctx.lineTo(0, 35 - moveDistance);
        ctx.stroke();
        
        // Arrow
        const arrowSize = 5;
        ctx.beginPath();
        if (isPositive) {
          ctx.moveTo(0, 35 - moveDistance);
          ctx.lineTo(-arrowSize, 35 - moveDistance + arrowSize);
          ctx.lineTo(arrowSize, 35 - moveDistance + arrowSize);
        } else {
          ctx.moveTo(0, 35 - moveDistance);
          ctx.lineTo(-arrowSize, 35 - moveDistance - arrowSize);
          ctx.lineTo(arrowSize, 35 - moveDistance - arrowSize);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
        
        // Connect to center
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = symbol.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.restore();
      });

      // Central hub
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⟲', centerX, centerY);
      ctx.restore();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      clearInterval(priceInterval);
    };
  }, [symbols, prices, changes, animationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`trading-visualizer w-full h-full ${className}`}
      style={{ backgroundColor: '#000000' }}
    />
  );
};

interface BlockchainVisualizerProps {
  className?: string;
  blockCount?: number;
  transactionSpeed?: number;
}

export const BlockchainVisualizer: React.FC<BlockchainVisualizerProps> = ({
  className = '',
  blockCount = 8,
  transactionSpeed = 1000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blocks, setBlocks] = useState<Array<{ id: number; transactions: number; timestamp: number }>>([]);
  const [currentBlock, setCurrentBlock] = useState(0);

  useEffect(() => {
    // Initialize blocks
    const initialBlocks = Array.from({ length: blockCount }, (_, i) => ({
      id: i,
      transactions: Math.floor(Math.random() * 100) + 50,
      timestamp: Date.now() - (blockCount - i) * 60000,
    }));
    setBlocks(initialBlocks);

    // Add new blocks periodically
    const blockInterval = setInterval(() => {
      setBlocks(prevBlocks => {
        const newBlocks = [...prevBlocks.slice(1)];
        newBlocks.push({
          id: prevBlocks[prevBlocks.length - 1].id + 1,
          transactions: Math.floor(Math.random() * 100) + 50,
          timestamp: Date.now(),
        });
        return newBlocks;
      });
      setCurrentBlock(prev => prev + 1);
    }, transactionSpeed * 3);

    return () => clearInterval(blockInterval);
  }, [blockCount, transactionSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const blockWidth = Math.min(120, canvas.width / (blockCount + 1));
      const blockHeight = 80;
      const startX = (canvas.width - (blockCount * blockWidth)) / 2;
      const y = canvas.height / 2 - blockHeight / 2;

      blocks.forEach((block, index) => {
        const x = startX + index * blockWidth;
        const isLatest = index === blocks.length - 1;
        
        // Block container
        ctx.save();
        ctx.fillStyle = isLatest ? 'rgba(0, 255, 255, 0.2)' : 'rgba(100, 100, 100, 0.2)';
        ctx.strokeStyle = isLatest ? '#00ffff' : '#666666';
        ctx.lineWidth = 2;
        ctx.shadowColor = isLatest ? '#00ffff' : '#666666';
        ctx.shadowBlur = isLatest ? 15 : 5;
        
        ctx.fillRect(x, y, blockWidth - 10, blockHeight);
        ctx.strokeRect(x, y, blockWidth - 10, blockHeight);
        
        // Block info
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Block ${block.id}`, x + blockWidth / 2 - 5, y + 20);
        ctx.fillText(`${block.transactions} TXs`, x + blockWidth / 2 - 5, y + 40);
        
        // Hash visualization
        const hashBars = 8;
        for (let i = 0; i < hashBars; i++) {
          const barHeight = (Math.sin(block.id + i) + 1) * 10 + 5;
          ctx.fillStyle = '#00ff00';
          ctx.fillRect(x + 10 + i * 8, y + 55, 6, barHeight);
        }
        
        ctx.restore();
        
        // Connection to next block
        if (index < blocks.length - 1) {
          ctx.save();
          ctx.strokeStyle = '#00ffff';
          ctx.lineWidth = 3;
          ctx.shadowColor = '#00ffff';
          ctx.shadowBlur = 10;
          
          ctx.beginPath();
          ctx.moveTo(x + blockWidth - 10, y + blockHeight / 2);
          ctx.lineTo(x + blockWidth, y + blockHeight / 2);
          ctx.stroke();
          
          // Arrow
          ctx.beginPath();
          ctx.moveTo(x + blockWidth - 5, y + blockHeight / 2);
          ctx.lineTo(x + blockWidth - 10, y + blockHeight / 2 - 5);
          ctx.lineTo(x + blockWidth - 10, y + blockHeight / 2 + 5);
          ctx.closePath();
          ctx.fill();
          
          ctx.restore();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [blocks, blockCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`blockchain-visualizer w-full h-full ${className}`}
      style={{ backgroundColor: '#000000' }}
    />
  );
};