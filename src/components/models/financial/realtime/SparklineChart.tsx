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

  if (type === 'area') {
    return (
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={strokeWidth}
              dot={showDots}
              fill={color}
              fillOpacity={0.3}
              isAnimationActive={animate}
              animationDuration={animate ? 300 : 0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={strokeWidth}
            dot={showDots}
            isAnimationActive={animate}
            animationDuration={animate ? 300 : 0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}