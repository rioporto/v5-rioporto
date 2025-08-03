import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp,
  TrendingDown,
  Maximize2,
  Settings,
  Download,
  Camera,
  Activity,
  BarChart3,
  CandlestickChart
} from 'lucide-react';

interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma7?: number;
  ma25?: number;
  ma99?: number;
}

interface TradingChartProps {
  className?: string;
  data?: ChartData[];
  chartType?: 'line' | 'candlestick' | 'area';
  indicators?: string[];
  timeframe?: string;
  pair?: string;
}

const generateMockData = (): ChartData[] => {
  const data: ChartData[] = [];
  const basePrice = 45000;
  const now = new Date();
  
  for (let i = 96; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15 * 60 * 1000);
    const randomWalk = (Math.random() - 0.5) * 500;
    const trend = i < 48 ? 200 : -100;
    
    const close = basePrice + randomWalk + trend * (96 - i) / 96;
    const open = close + (Math.random() - 0.5) * 100;
    const high = Math.max(open, close) + Math.random() * 100;
    const low = Math.min(open, close) - Math.random() * 100;
    const volume = Math.random() * 1000000 + 500000;
    
    // Moving averages
    const ma7 = close + (Math.random() - 0.5) * 50;
    const ma25 = close + (Math.random() - 0.5) * 100;
    const ma99 = close + (Math.random() - 0.5) * 150;
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Number(volume.toFixed(0)),
      ma7: Number(ma7.toFixed(2)),
      ma25: Number(ma25.toFixed(2)),
      ma99: Number(ma99.toFixed(2))
    });
  }
  
  return data;
};

export function TradingChart({ 
  className,
  data = generateMockData(),
  chartType = 'candlestick',
  indicators = ['MA7', 'MA25', 'Volume'],
  timeframe = '15m',
  pair = 'BTC/USDT'
}: TradingChartProps) {
  const [selectedIndicators, setSelectedIndicators] = React.useState(indicators);
  const [fullscreen, setFullscreen] = React.useState(false);
  
  const lastDataPoint = data[data.length - 1];
  const firstDataPoint = data[0];
  const priceChange = lastDataPoint.close - firstDataPoint.close;
  const priceChangePercent = (priceChange / firstDataPoint.close) * 100;

  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'];
  const availableIndicators = ['MA7', 'MA25', 'MA99', 'RSI', 'MACD', 'Volume', 'Bollinger'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover p-3 rounded shadow-lg border border-border">
          <p className="text-xs text-muted-foreground mb-2">{label}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Open:</span>
              <span className="font-medium">${data.open}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">High:</span>
              <span className="font-medium text-green-500">${data.high}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Low:</span>
              <span className="font-medium text-red-500">${data.low}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Close:</span>
              <span className="font-medium">${data.close}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Volume:</span>
              <span className="font-medium">{(data.volume / 1000000).toFixed(2)}M</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="time" 
            className="text-xs"
            tick={{ fill: 'currentColor' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            className="text-xs"
            tick={{ fill: 'currentColor' }}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
          />
          {selectedIndicators.includes('MA7') && (
            <Line
              type="monotone"
              dataKey="ma7"
              stroke="#10B981"
              strokeWidth={1}
              dot={false}
              strokeDasharray="5 5"
            />
          )}
          {selectedIndicators.includes('MA25') && (
            <Line
              type="monotone"
              dataKey="ma25"
              stroke="#F59E0B"
              strokeWidth={1}
              dot={false}
              strokeDasharray="5 5"
            />
          )}
        </LineChart>
      );
    }

    if (chartType === 'area') {
      return (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="time" 
            className="text-xs"
            tick={{ fill: 'currentColor' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            className="text-xs"
            tick={{ fill: 'currentColor' }}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      );
    }

    // Default: Candlestick (simulated with bars)
    return (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="time" 
          className="text-xs"
          tick={{ fill: 'currentColor' }}
          interval="preserveStartEnd"
        />
        <YAxis 
          className="text-xs"
          tick={{ fill: 'currentColor' }}
          domain={['dataMin - 100', 'dataMax + 100']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="high"
          fill="#10B981"
          opacity={0.8}
        />
        <Bar
          dataKey="low"
          fill="#EF4444"
          opacity={0.8}
        />
      </BarChart>
    );
  };

  return (
    <Card className={cn('p-4', className, fullscreen && 'fixed inset-4 z-50')}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {pair}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold">
                ${lastDataPoint.close.toLocaleString()}
              </span>
              <Badge 
                variant="outline" 
                className={cn(
                  'text-xs',
                  priceChange >= 0 
                    ? 'border-green-500/20 text-green-500' 
                    : 'border-red-500/20 text-red-500'
                )}
              >
                {priceChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 p-1 bg-muted rounded">
            {['line', 'area', 'candlestick'].map((type) => (
              <Button
                key={type}
                variant={chartType === type ? 'primary' : 'ghost'}
                size="sm"
                className="p-1"
                onClick={() => {}}
              >
                {type === 'line' && <Activity className="w-4 h-4" />}
                {type === 'area' && <BarChart3 className="w-4 h-4" />}
                {type === 'candlestick' && <CandlestickChart className="w-4 h-4" />}
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Camera className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setFullscreen(!fullscreen)}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Timeframe Selection */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex gap-1">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? 'primary' : 'ghost'}
              size="sm"
              className="px-2 h-7 text-xs"
            >
              {tf}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          {availableIndicators.slice(0, 4).map((indicator) => (
            <Badge
              key={indicator}
              variant={selectedIndicators.includes(indicator) ? 'success' : 'outline'}
              className="cursor-pointer text-xs"
              onClick={() => {
                if (selectedIndicators.includes(indicator)) {
                  setSelectedIndicators(selectedIndicators.filter(i => i !== indicator));
                } else {
                  setSelectedIndicators([...selectedIndicators, indicator]);
                }
              }}
            >
              {indicator}
            </Badge>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className={cn('w-full', fullscreen ? 'h-[calc(100%-120px)]' : 'h-[400px]')}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      {selectedIndicators.includes('Volume') && (
        <div className="h-[100px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="time" 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                formatter={(value: number) => `${(value / 1000000).toFixed(2)}M`}
              />
              <Bar
                dataKey="volume"
                fill="#8B5CF6"
                opacity={0.6}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}