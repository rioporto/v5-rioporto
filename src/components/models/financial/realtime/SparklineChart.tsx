'use client';

import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface SparklineChartProps {
  data: Array<{ value: number; timestamp?: number }>;
  color?: string;
  type?: 'line' | 'area';
  height?: number;
  strokeWidth?: number;
  showDots?: boolean;
  animate?: boolean;
}

export default function SparklineChart({
  data,
  color = '#3b82f6',
  type = 'line',
  height = 40,
  strokeWidth = 2,
  showDots = false,
  animate = true
}: SparklineChartProps) {
  if (!data.length) return null;

  const Chart = type === 'area' ? AreaChart : LineChart;
  const Element = type === 'area' ? Area : Line;

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data}>
          <Element
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={strokeWidth}
            dot={showDots}
            fill={type === 'area' ? color : undefined}
            fillOpacity={type === 'area' ? 0.3 : undefined}
            isAnimationActive={animate}
            animationDuration={animate ? 300 : 0}
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}