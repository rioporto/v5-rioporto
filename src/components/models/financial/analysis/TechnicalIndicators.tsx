'use client';

import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { WidgetProps, RSIData, MACDData, BollingerBandsData, TechnicalIndicator } from '@/types/financial';

interface TechnicalIndicatorsProps extends WidgetProps {
  data: {
    rsi: RSIData[];
    macd: MACDData[];
    bollinger: BollingerBandsData[];
    indicators: TechnicalIndicator[];
  };
}

const RSIChart = ({ data }: { data: RSIData[] }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const rsiData = payload[0].payload;

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          {new Date(label).toLocaleString()}
        </p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">RSI:</span>
            <span className="font-mono font-medium">{rsiData.value.toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">Signal:</span>
            <Badge
              variant={rsiData.overbought ? 'error' : rsiData.oversold ? 'success' : 'default'}
            >
              {rsiData.overbought ? 'Overbought' : rsiData.oversold ? 'Oversold' : 'Neutral'}
            </Badge>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
          <XAxis
            dataKey="timestamp"
            type="number"
            scale="time"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            stroke="#6b7280"
            className="dark:stroke-gray-400"
          />
          <YAxis
            domain={[0, 100]}
            stroke="#6b7280"
            className="dark:stroke-gray-400"
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Overbought line */}
          <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="5 5" />
          <ReferenceLine y={30} stroke="#10b981" strokeDasharray="5 5" />
          <ReferenceLine y={50} stroke="#6b7280" strokeDasharray="2 2" />
          
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="RSI"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const MACDChart = ({ data }: { data: MACDData[] }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const macdData = payload[0].payload;

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          {new Date(label).toLocaleString()}
        </p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">MACD:</span>
            <span className="font-mono font-medium">{macdData.macd.toFixed(4)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">Signal:</span>
            <span className="font-mono font-medium">{macdData.signal.toFixed(4)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">Histogram:</span>
            <span className={`font-mono font-medium ${
              macdData.histogram >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {macdData.histogram.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
          <XAxis
            dataKey="timestamp"
            type="number"
            scale="time"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            stroke="#6b7280"
            className="dark:stroke-gray-400"
          />
          <YAxis
            stroke="#6b7280"
            className="dark:stroke-gray-400"
          />
          <Tooltip content={<CustomTooltip />} />
          
          <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="2 2" />
          
          <Line
            type="monotone"
            dataKey="macd"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="MACD"
          />
          <Line
            type="monotone"
            dataKey="signal"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Signal"
          />
          <Line
            type="monotone"
            dataKey="histogram"
            stroke="#10b981"
            strokeWidth={1}
            dot={false}
            name="Histogram"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const BollingerChart = ({ data }: { data: BollingerBandsData[] }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const bollingerData = payload[0].payload;

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          {new Date(label).toLocaleString()}
        </p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">Price:</span>
            <span className="font-mono font-medium">${bollingerData.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">Upper:</span>
            <span className="font-mono font-medium">${bollingerData.upper.toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">Middle:</span>
            <span className="font-mono font-medium">${bollingerData.middle.toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">Lower:</span>
            <span className="font-mono font-medium">${bollingerData.lower.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
          <XAxis
            dataKey="timestamp"
            type="number"
            scale="time"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            stroke="#6b7280"
            className="dark:stroke-gray-400"
          />
          <YAxis
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            stroke="#6b7280"
            className="dark:stroke-gray-400"
          />
          <Tooltip content={<CustomTooltip />} />
          
          <Line
            type="monotone"
            dataKey="upper"
            stroke="#ef4444"
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
            name="Upper Band"
          />
          <Line
            type="monotone"
            dataKey="middle"
            stroke="#6b7280"
            strokeWidth={1}
            dot={false}
            name="Middle Band"
          />
          <Line
            type="monotone"
            dataKey="lower"
            stroke="#10b981"
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
            name="Lower Band"
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const IndicatorsSummary = ({ indicators }: { indicators: TechnicalIndicator[] }) => {
  const summary = useMemo(() => {
    const buySignals = indicators.filter(i => i.signal === 'BUY').length;
    const sellSignals = indicators.filter(i => i.signal === 'SELL').length;
    const neutralSignals = indicators.filter(i => i.signal === 'NEUTRAL').length;
    
    const overallSignal = buySignals > sellSignals ? 'BUY' : 
                         sellSignals > buySignals ? 'SELL' : 'NEUTRAL';
    
    const avgStrength = indicators.reduce((sum, i) => sum + i.strength, 0) / indicators.length;
    
    return { buySignals, sellSignals, neutralSignals, overallSignal, avgStrength };
  }, [indicators]);

  return (
    <div className="space-y-4">
      {/* Overall Signal */}
      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overall Signal</div>
        <Badge
          variant={summary.overallSignal === 'BUY' ? 'success' : 
                  summary.overallSignal === 'SELL' ? 'error' : 'default'}
          size="lg"
        >
          {summary.overallSignal}
        </Badge>
        <div className="text-xs text-gray-500 mt-1">
          Strength: {summary.avgStrength.toFixed(0)}%
        </div>
      </div>

      {/* Signal Distribution */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
          <div className="font-medium text-green-600">{summary.buySignals}</div>
          <div className="text-xs text-green-500">Buy</div>
        </div>
        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <div className="font-medium text-gray-600">{summary.neutralSignals}</div>
          <div className="text-xs text-gray-500">Neutral</div>
        </div>
        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
          <div className="font-medium text-red-600">{summary.sellSignals}</div>
          <div className="text-xs text-red-500">Sell</div>
        </div>
      </div>

      {/* Individual Indicators */}
      <div className="space-y-2">
        {indicators.map((indicator, index) => (
          <div key={index} className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded">
            <div className="flex-1">
              <div className="font-medium text-sm">{indicator.name}</div>
              <div className="text-xs text-gray-500">{indicator.description}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-mono">{indicator.value.toFixed(2)}</div>
              <Badge
                variant={indicator.signal === 'BUY' ? 'success' : 
                        indicator.signal === 'SELL' ? 'error' : 'default'}
                size="sm"
              >
                {indicator.signal}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TechnicalIndicators({ 
  data,
  loading = false, 
  error,
  className = ""
}: TechnicalIndicatorsProps) {
  const [activeTab, setActiveTab] = useState('summary');

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-32 text-red-500">
          Error loading technical indicators: {error}
        </div>
      </Card>
    );
  }

  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'rsi', label: 'RSI' },
    { id: 'macd', label: 'MACD' },
    { id: 'bollinger', label: 'Bollinger' },
  ];

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Technical Indicators
        </h3>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === 'summary' && (
          <IndicatorsSummary indicators={data.indicators} />
        )}
        
        {activeTab === 'rsi' && (
          <div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Relative Strength Index (RSI)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Measures overbought/oversold conditions. Above 70 = overbought, below 30 = oversold.
              </p>
            </div>
            <RSIChart data={data.rsi} />
          </div>
        )}
        
        {activeTab === 'macd' && (
          <div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">MACD (Moving Average Convergence Divergence)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Shows relationship between two moving averages. When MACD crosses above signal line, it's bullish.
              </p>
            </div>
            <MACDChart data={data.macd} />
          </div>
        )}
        
        {activeTab === 'bollinger' && (
          <div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Bollinger Bands</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Price channel with upper and lower bands. Price touching bands indicates potential reversal.
              </p>
            </div>
            <BollingerChart data={data.bollinger} />
          </div>
        )}
      </div>
    </Card>
  );
}