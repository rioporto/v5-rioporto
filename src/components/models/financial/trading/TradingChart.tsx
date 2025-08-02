'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, 
  Settings, 
  Maximize2,
  BarChart3,
  Activity
} from 'lucide-react';

interface TradingChartProps {
  pair: string;
  fullscreen?: boolean;
}

export function TradingChart({ pair, fullscreen = false }: TradingChartProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Chart Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="font-semibold">{pair}</h3>
            <Badge variant="outline" className="bg-success/10 text-success">
              <Activity className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-mono font-semibold">R$ 342,156.78</span>
              <span className="text-success">+2.34%</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            {!fullscreen && (
              <Button variant="ghost" size="sm">
                <Maximize2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 p-4 flex items-center justify-center bg-muted/20">
        <div className="text-center text-muted-foreground">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h4 className="font-medium mb-2">TradingView Chart</h4>
          <p className="text-sm">
            Advanced charting with technical indicators would be integrated here
          </p>
          <p className="text-xs mt-2">
            Real-time data for {pair}
          </p>
        </div>
      </div>

      {/* Chart Footer */}
      <div className="p-2 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Volume: 1,234.56 BTC</span>
            <span>24h High: R$ 345,000</span>
            <span>24h Low: R$ 338,500</span>
          </div>
          <div>
            Last Update: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}