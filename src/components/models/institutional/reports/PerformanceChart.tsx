'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface PerformanceChartProps {
  title: string;
  subtitle?: string;
  type: 'line' | 'bar' | 'doughnut';
  data: ChartDataPoint[];
  timeframe?: string[];
  comparison?: {
    label: string;
    data: number[];
    color?: string;
  };
  showLegend?: boolean;
  showGrid?: boolean;
  height?: number;
  className?: string;
}

export default function PerformanceChart({
  title,
  subtitle,
  type,
  data,
  timeframe,
  comparison,
  showLegend = true,
  showGrid = true,
  height = 300,
  className = ''
}: PerformanceChartProps) {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ];

  // Transform data for recharts
  const chartData = data.map((item, index) => ({
    name: timeframe ? timeframe[index] : item.label,
    value: item.value,
    ...(comparison && { comparison: comparison.data[index] })
  }));

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#374151', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#ffffff' 
                }}
              />
              {showLegend && <Legend />}
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={colors[0]} 
                strokeWidth={2}
                dot={{ fill: colors[0], r: 4 }}
                name={title}
              />
              {comparison && (
                <Line 
                  type="monotone" 
                  dataKey="comparison" 
                  stroke={comparison.color || colors[1]} 
                  strokeWidth={2}
                  dot={{ fill: comparison.color || colors[1], r: 4 }}
                  name={comparison.label}
                  strokeDasharray="5 5"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={chartData}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#374151', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#ffffff' 
                }}
              />
              {showLegend && <Legend />}
              <Bar 
                dataKey="value" 
                name={title}
                fill={colors[0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={data[index]?.color || colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'doughnut':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={data[index]?.color || colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#374151', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#ffffff' 
                }}
              />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      
      {renderChart()}
    </div>
  );
}