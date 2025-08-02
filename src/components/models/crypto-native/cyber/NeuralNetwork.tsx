'use client';

import { useState, useEffect, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  active: boolean;
  value: number;
  connections: number[];
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  active: boolean;
}

interface NeuralNetworkProps {
  nodes?: number;
  layers?: number;
  animated?: boolean;
  speed?: 'slow' | 'normal' | 'fast' | 'ultra';
  variant?: 'classic' | 'cyberpunk' | 'matrix' | 'hologram';
  showData?: boolean;
  interactive?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

export function NeuralNetwork({
  nodes = 24,
  layers = 3,
  animated = true,
  speed = 'normal',
  variant = 'classic',
  showData = false,
  interactive = false,
  className = '',
  width = 400,
  height = 300
}: NeuralNetworkProps) {
  const [networkNodes, setNetworkNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [animationFrame, setAnimationFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const variants = {
    classic: { nodeColor: '#00ffff', connectionColor: '#ffffff', activeColor: '#ffff00', bgColor: '#000000' },
    cyberpunk: { nodeColor: '#ff00ff', connectionColor: '#00ffff', activeColor: '#ffff00', bgColor: '#1a0a2e' },
    matrix: { nodeColor: '#00ff00', connectionColor: '#00aa00', activeColor: '#ffffff', bgColor: '#000000' },
    hologram: { nodeColor: '#aa44ff', connectionColor: '#4444ff', activeColor: '#ffffff', bgColor: '#0a0a2e' }
  };

  const speedSettings = {
    slow: 150,
    normal: 100,
    fast: 50,
    ultra: 25
  };

  // Initialize network structure
  useEffect(() => {
    const nodesPerLayer = Math.ceil(nodes / layers);
    const newNodes: Node[] = [];
    const newConnections: Connection[] = [];

    // Create nodes
    for (let layer = 0; layer < layers; layer++) {
      const layerNodes = layer === layers - 1 ? nodes - (layer * nodesPerLayer) : nodesPerLayer;
      
      for (let i = 0; i < layerNodes; i++) {
        const nodeId = layer * nodesPerLayer + i;
        const x = (width / (layers + 1)) * (layer + 1);
        const y = (height / (layerNodes + 1)) * (i + 1);
        
        newNodes.push({
          id: nodeId,
          x,
          y,
          active: false,
          value: Math.random(),
          connections: []
        });
      }
    }

    // Create connections between adjacent layers
    for (let layer = 0; layer < layers - 1; layer++) {
      const currentLayerStart = layer * nodesPerLayer;
      const nextLayerStart = (layer + 1) * nodesPerLayer;
      const currentLayerNodes = Math.min(nodesPerLayer, nodes - currentLayerStart);
      const nextLayerNodes = Math.min(nodesPerLayer, nodes - nextLayerStart);

      for (let i = 0; i < currentLayerNodes; i++) {
        const fromNode = currentLayerStart + i;
        
        for (let j = 0; j < nextLayerNodes; j++) {
          const toNode = nextLayerStart + j;
          
          if (Math.random() > 0.3) { // 70% chance of connection
            newConnections.push({
              from: fromNode,
              to: toNode,
              strength: Math.random(),
              active: false
            });

            newNodes[fromNode].connections.push(toNode);
          }
        }
      }
    }

    setNetworkNodes(newNodes);
    setConnections(newConnections);
  }, [nodes, layers, width, height]);

  // Animation loop
  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setAnimationFrame(prev => prev + 1);

      // Activate random nodes
      setNetworkNodes(prev => 
        prev.map(node => ({
          ...node,
          active: Math.random() < 0.1,
          value: Math.max(0, Math.min(1, node.value + (Math.random() - 0.5) * 0.2))
        }))
      );

      // Activate connections based on node activity
      setConnections(prev =>
        prev.map(conn => {
          const fromNode = networkNodes.find(n => n.id === conn.from);
          const toNode = networkNodes.find(n => n.id === conn.to);
          return {
            ...conn,
            active: (fromNode?.active ?? false) && Math.random() < 0.3,
            strength: Math.max(0.1, Math.min(1, conn.strength + (Math.random() - 0.5) * 0.1))
          };
        })
      );
    }, speedSettings[speed]);

    return () => clearInterval(interval);
  }, [animated, speed, networkNodes]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = variants[variant];

    // Clear canvas
    ctx.fillStyle = colors.bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw connections
    connections.forEach(conn => {
      const fromNode = networkNodes.find(n => n.id === conn.from);
      const toNode = networkNodes.find(n => n.id === conn.to);

      if (!fromNode || !toNode) return;

      ctx.strokeStyle = conn.active ? colors.activeColor : colors.connectionColor;
      ctx.lineWidth = conn.active ? 2 : 1;
      ctx.globalAlpha = conn.strength * (conn.active ? 1 : 0.3);

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();

      // Draw data packets for active connections
      if (conn.active && animated) {
        const progress = (animationFrame * 0.05) % 1;
        const packetX = fromNode.x + (toNode.x - fromNode.x) * progress;
        const packetY = fromNode.y + (toNode.y - fromNode.y) * progress;

        ctx.fillStyle = colors.activeColor;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw nodes
    networkNodes.forEach(node => {
      ctx.fillStyle = node.active ? colors.activeColor : colors.nodeColor;
      ctx.globalAlpha = node.active ? 1 : 0.7;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.active ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw node border
      ctx.strokeStyle = colors.nodeColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 1;
      ctx.stroke();

      // Show data values
      if (showData) {
        ctx.fillStyle = colors.nodeColor;
        ctx.font = '10px monospace';
        ctx.globalAlpha = 0.8;
        ctx.fillText(
          node.value.toFixed(2),
          node.x - 10,
          node.y - 10
        );
      }
    });

    ctx.globalAlpha = 1;
  }, [networkNodes, connections, animationFrame, variant, showData, width, height]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Find clicked node
    const clickedNode = networkNodes.find(node => {
      const distance = Math.sqrt((clickX - node.x) ** 2 + (clickY - node.y) ** 2);
      return distance <= 10;
    });

    if (clickedNode) {
      // Activate clicked node and its connections
      setNetworkNodes(prev =>
        prev.map(node =>
          node.id === clickedNode.id ? { ...node, active: true } : node
        )
      );

      setConnections(prev =>
        prev.map(conn =>
          conn.from === clickedNode.id || conn.to === clickedNode.id
            ? { ...conn, active: true }
            : conn
        )
      );
    }
  };

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        className={`border border-gray-700 ${interactive ? 'cursor-pointer' : ''}`}
        style={{ background: variants[variant].bgColor }}
      />

      {/* Overlay effects */}
      {variant === 'matrix' && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none" />
      )}

      {variant === 'hologram' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse pointer-events-none" />
      )}

      {/* Info overlay */}
      <div className="absolute top-2 left-2 text-xs font-mono text-cyan-400 bg-black/50 p-2 rounded">
        <div>Nodes: {networkNodes.filter(n => n.active).length}/{nodes}</div>
        <div>Connections: {connections.filter(c => c.active).length}/{connections.length}</div>
        {showData && <div>Frame: {animationFrame}</div>}
      </div>
    </div>
  );
}

// Brain Network Visualization
interface BrainNetworkProps extends Omit<NeuralNetworkProps, 'nodes' | 'layers'> {
  complexity?: 'simple' | 'medium' | 'complex';
}

export function BrainNetwork({
  complexity = 'medium',
  className = '',
  ...props
}: BrainNetworkProps) {
  const complexitySettings = {
    simple: { nodes: 12, layers: 3 },
    medium: { nodes: 24, layers: 4 },
    complex: { nodes: 48, layers: 5 }
  };

  const settings = complexitySettings[complexity];

  return (
    <NeuralNetwork
      nodes={settings.nodes}
      layers={settings.layers}
      className={`brain-network ${className}`}
      {...props}
    />
  );
}

// AI Processing Indicator
interface AIProcessingProps {
  isProcessing?: boolean;
  label?: string;
  className?: string;
}

export function AIProcessing({
  isProcessing = false,
  label = 'AI Processing',
  className = ''
}: AIProcessingProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative">
        <NeuralNetwork
          nodes={16}
          layers={3}
          animated={isProcessing}
          speed="fast"
          variant="cyberpunk"
          width={120}
          height={80}
          className="rounded border border-purple-500/30"
        />
        {isProcessing && (
          <div className="absolute inset-0 bg-purple-500/20 animate-pulse rounded" />
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-sm font-semibold text-purple-400">
          {label}
        </div>
        <div className="text-xs text-muted-foreground">
          {isProcessing ? 'Active' : 'Idle'}
        </div>
      </div>
    </div>
  );
}

// Network Stats Dashboard
interface NetworkStatsProps {
  stats?: {
    throughput: number;
    latency: number;
    efficiency: number;
    errorRate: number;
  };
  className?: string;
}

export function NetworkStats({
  stats = {
    throughput: 95,
    latency: 12,
    efficiency: 87,
    errorRate: 0.3
  },
  className = ''
}: NetworkStatsProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Throughput</div>
        <div className="text-xl font-bold text-green-400">{stats.throughput}%</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Latency</div>
        <div className="text-xl font-bold text-cyan-400">{stats.latency}ms</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Efficiency</div>
        <div className="text-xl font-bold text-purple-400">{stats.efficiency}%</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Error Rate</div>
        <div className="text-xl font-bold text-red-400">{stats.errorRate}%</div>
      </div>
    </div>
  );
}