import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp,
  TrendingDown,
  Maximize2,
  Settings,
  Download,
  Camera,
  Grid,
  Activity,
  BarChart2,
  LineChart,
  CandlestickChart,
  PieChart,
  Target,
  Ruler,
  Type,
  Palette,
  Clock,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Move
} from 'lucide-react';
import { 
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Brush
} from 'recharts';

interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma7: number;
  ma25: number;
  ma99: number;
  rsi: number;
}

interface AdvancedChartProps {
  className?: string;
  pair?: string;
  interval?: '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w';
  chartType?: 'candlestick' | 'line' | 'area' | 'bar';
  indicators?: string[];
  onIntervalChange?: (interval: string) => void;
}

const generateMockData = (points: number = 100): ChartData[] => {
  const data: ChartData[] = [];
  let basePrice = 45000;
  
  for (let i = 0; i < points; i++) {
    const date = new Date();
    date.setHours(date.getHours() - (points - i));
    
    const volatility = 0.002;
    const trend = Math.sin(i / 20) * 500;
    const noise = (Math.random() - 0.5) * basePrice * volatility;
    
    const open = basePrice;
    const close = basePrice + trend + noise;
    const high = Math.max(open, close) + Math.random() * 100;
    const low = Math.min(open, close) - Math.random() * 100;
    
    basePrice = close;
    
    data.push({
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      open,
      high,
      low,
      close,
      volume: Math.random() * 1000000 + 500000,
      ma7: basePrice - 50 + Math.random() * 100,
      ma25: basePrice - 100 + Math.random() * 200,
      ma99: basePrice - 150 + Math.random() * 300,
      rsi: 30 + Math.random() * 40
    });
  }
  
  return data;
};

export function AdvancedChart({ 
  className,
  pair = 'BTC/USDT',
  interval = '1h',
  chartType = 'candlestick',
  indicators = ['MA7', 'MA25', 'Volume'],
  onIntervalChange
}: AdvancedChartProps) {
  const [data] = React.useState(generateMockData());
  const [selectedIndicators, setSelectedIndicators] = React.useState(indicators);
  const [showSettings, setShowSettings] = React.useState(false);
  const [selectedInterval, setSelectedInterval] = React.useState(interval);
  const [selectedChartType, setSelectedChartType] = React.useState(chartType);
  const [drawingMode, setDrawingMode] = React.useState<string | null>(null);
  
  const currentPrice = data[data.length - 1]?.close || 0;
  const priceChange = currentPrice - (data[data.length - 2]?.close || currentPrice);
  const priceChangePercent = (priceChange / (data[data.length - 2]?.close || 1)) * 100;

  const intervals = [
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '30m', label: '30m' },
    { value: '1h', label: '1H' },
    { value: '4h', label: '4H' },
    { value: '1d', label: '1D' },
    { value: '1w', label: '1W' }
  ];

  const chartTypes = [
    { value: 'candlestick', label: 'Candles', icon: <CandlestickChart className="w-4 h-4" /> },
    { value: 'line', label: 'Line', icon: <LineChart className="w-4 h-4" /> },
    { value: 'area', label: 'Area', icon: <Activity className="w-4 h-4" /> },
    { value: 'bar', label: 'Bars', icon: <BarChart2 className="w-4 h-4" /> }
  ];

  const availableIndicators = [
    { value: 'MA7', label: 'MA 7', color: '#3B82F6' },
    { value: 'MA25', label: 'MA 25', color: '#10B981' },
    { value: 'MA99', label: 'MA 99', color: '#F59E0B' },
    { value: 'Volume', label: 'Volume', color: '#8B5CF6' },
    { value: 'RSI', label: 'RSI', color: '#EF4444' },
    { value: 'MACD', label: 'MACD', color: '#06B6D4' },
    { value: 'BB', label: 'Bollinger', color: '#F97316' }
  ];

  const drawingTools = [
    { value: 'line', label: 'Line', icon: <Ruler className="w-4 h-4" /> },
    { value: 'hline', label: 'H-Line', icon: <Ruler className="w-4 h-4 rotate-90" /> },
    { value: 'rect', label: 'Rectangle', icon: <Grid className="w-4 h-4" /> },
    { value: 'text', label: 'Text', icon: <Type className="w-4 h-4" /> },
    { value: 'target', label: 'Target', icon: <Target className="w-4 h-4" /> }
  ];

  const handleIntervalChange = (newInterval: string) => {
    setSelectedInterval(newInterval);
    onIntervalChange?.(newInterval);
  };

  const toggleIndicator = (indicator: string) => {
    setSelectedIndicators(prev => 
      prev.includes(indicator) 
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-2">{label}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Open:</span>
              <span className="font-medium">${data.open.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">High:</span>
              <span className="font-medium">${data.high.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Low:</span>
              <span className="font-medium">${data.low.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Close:</span>
              <span className="font-medium">${data.close.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Volume:</span>
              <span className="font-medium">{(data.volume / 1000).toFixed(1)}K</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCandlestick = (props: any) => {
    const { x, y, width, height, payload } = props;
    const isGreen = payload.close > payload.open;
    const color = isGreen ? '#10B981' : '#EF4444';
    
    const candleHeight = Math.abs(y.close - y.open);
    const wickTop = Math.min(y.open, y.close);
    const wickBottom = Math.max(y.open, y.close);
    
    return (
      <g>
        {/* Wick */}
        <line
          x1={x + width / 2}
          y1={y.high}
          x2={x + width / 2}
          y2={y.low}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={x}
          y={Math.min(y.open, y.close)}
          width={width}
          height={candleHeight || 1}
          fill={color}
          fillOpacity={0.8}
        />
      </g>
    );
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold">{pair}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold">${currentPrice.toFixed(2)}</span>
              <Badge 
                variant={priceChange > 0 ? 'default' : 'destructive'}
                className="gap-1"
              >
                {priceChange > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
              </Badge>
            </div>
          </div>
        </div>

        {/* Intervals */}
        <div className="flex items-center gap-2">
          {intervals.map((int) => (
            <Button
              key={int.value}
              variant={selectedInterval === int.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleIntervalChange(int.value)}
            >
              {int.label}
            </Button>
          ))}
        </div>

        {/* Chart Type & Tools */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-border rounded-lg p-1">
            {chartTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedChartType === type.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedChartType(type.value as any)}
                className="gap-1"
              >
                {type.icon}
                <span className="hidden lg:inline">{type.label}</span>
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Indicators Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Indicators:</span>
          {availableIndicators.slice(0, 5).map((ind) => (
            <Button
              key={ind.value}
              variant={selectedIndicators.includes(ind.value) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleIndicator(ind.value)}
              className="h-7 text-xs"
            >
              <div 
                className="w-2 h-2 rounded-full mr-1" 
                style={{ backgroundColor: ind.color }}
              />
              {ind.label}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="h-7">
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>

        {/* Drawing Tools */}
        <div className="flex items-center gap-1">
          {drawingTools.map((tool) => (
            <Button
              key={tool.value}
              variant={drawingMode === tool.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDrawingMode(drawingMode === tool.value ? null : tool.value)}
              title={tool.label}
            >
              {tool.icon}
            </Button>
          ))}
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="sm">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Camera className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[500px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
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
            
            {/* Price Chart */}
            {selectedChartType === 'line' && (
              <Line
                type="monotone"
                dataKey="close"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
            )}
            
            {selectedChartType === 'area' && (
              <Area
                type="monotone"
                dataKey="close"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="#3B82F6"
                fillOpacity={0.1}
              />
            )}
            
            {selectedChartType === 'candlestick' && (
              <Bar
                dataKey="close"
                shape={renderCandlestick}
                isAnimationActive={false}
              />
            )}
            
            {/* Moving Averages */}
            {selectedIndicators.includes('MA7') && (
              <Line
                type="monotone"
                dataKey="ma7"
                stroke="#3B82F6"
                strokeWidth={1}
                dot={false}
                strokeDasharray="3 3"
              />
            )}
            
            {selectedIndicators.includes('MA25') && (
              <Line
                type="monotone"
                dataKey="ma25"
                stroke="#10B981"
                strokeWidth={1}
                dot={false}
                strokeDasharray="3 3"
              />
            )}
            
            {selectedIndicators.includes('MA99') && (
              <Line
                type="monotone"
                dataKey="ma99"
                stroke="#F59E0B"
                strokeWidth={1}
                dot={false}
                strokeDasharray="3 3"
              />
            )}

            {/* Volume */}
            {selectedIndicators.includes('Volume') && (
              <Bar
                dataKey="volume"
                fill="#8B5CF6"
                fillOpacity={0.3}
                yAxisId="volume"
              />
            )}
            
            <Brush dataKey="time" height={30} />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Settings Panel */}
        {showSettings && (
          <Card className="absolute top-4 right-4 w-64 p-4 shadow-lg">
            <h4 className="font-medium mb-3">Chart Settings</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Theme</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Light</Button>
                  <Button variant="default" size="sm">Dark</Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Grid</p>
                <div className="flex gap-2">
                  <Button variant="default" size="sm">Show</Button>
                  <Button variant="outline" size="sm">Hide</Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Colors</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Palette className="w-4 h-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}