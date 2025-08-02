'use client';

import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

  const getChartData = () => {
    switch (type) {
      case 'line':
        return {
          labels: timeframe || data.map(d => d.label),
          datasets: [
            {
              label: title,
              data: data.map(d => d.value),
              borderColor: colors[0],
              backgroundColor: `${colors[0]}20`,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: colors[0],
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 4,
            },
            ...(comparison ? [{
              label: comparison.label,
              data: comparison.data,
              borderColor: comparison.color || colors[1],
              backgroundColor: `${comparison.color || colors[1]}20`,
              fill: false,
              tension: 0.4,
              pointBackgroundColor: comparison.color || colors[1],
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 4,
            }] : [])
          ]
        };

      case 'bar':
        return {
          labels: data.map(d => d.label),
          datasets: [
            {
              label: title,
              data: data.map(d => d.value),
              backgroundColor: data.map((d, i) => d.color || colors[i % colors.length]),
              borderColor: data.map((d, i) => d.color || colors[i % colors.length]),
              borderWidth: 1,
            }
          ]
        };

      case 'doughnut':
        return {
          labels: data.map(d => d.label),
          datasets: [
            {
              data: data.map(d => d.value),
              backgroundColor: data.map((d, i) => d.color || colors[i % colors.length]),
              borderColor: '#ffffff',
              borderWidth: 2,
            }
          ]
        };

      default:
        return { labels: [], datasets: [] };
    }
  };

  const getChartOptions = () => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: showLegend,
          position: 'top' as const,
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
            }
          }
        },
        tooltip: {
          backgroundColor: '#374151',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: (context: any) => {
              const value = context.parsed.y || context.parsed;
              return `${context.dataset.label}: ${new Intl.NumberFormat('pt-BR').format(value)}`;
            }
          }
        }
      }
    };

    if (type === 'doughnut') {
      return {
        ...baseOptions,
        cutout: '60%',
        plugins: {
          ...baseOptions.plugins,
          legend: {
            ...baseOptions.plugins.legend,
            position: 'right' as const,
          }
        }
      };
    }

    return {
      ...baseOptions,
      scales: {
        x: {
          display: true,
          grid: {
            display: showGrid,
            color: '#F3F4F6',
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 11,
            }
          }
        },
        y: {
          display: true,
          grid: {
            display: showGrid,
            color: '#F3F4F6',
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 11,
            },
            callback: (value: any) => {
              return new Intl.NumberFormat('pt-BR', {
                notation: 'compact',
                maximumFractionDigits: 1
              }).format(value);
            }
          }
        }
      }
    };
  };

  const renderChart = () => {
    const chartData = getChartData();
    const options = getChartOptions();

    switch (type) {
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={options} />;
      default:
        return null;
    }
  };

  const calculateTotalValue = () => {
    return data.reduce((total, item) => total + item.value, 0);
  };

  const calculateChange = () => {
    if (data.length < 2) return null;
    const latest = data[data.length - 1].value;
    const previous = data[data.length - 2].value;
    const change = ((latest - previous) / previous) * 100;
    return change;
  };

  const change = calculateChange();

  return (
    <div className={`bg-white shadow-sm border border-gray-200 rounded-lg p-6 print:shadow-none print:border-gray-400 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 print:text-black">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-600 print:text-gray-800 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 print:text-black">
              {new Intl.NumberFormat('pt-BR').format(calculateTotalValue())}
            </p>
            {change !== null && (
              <p className={`text-sm flex items-center justify-end ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              } print:text-black`}>
                <span className="mr-1">
                  {change >= 0 ? '↗' : '↘'}
                </span>
                {Math.abs(change).toFixed(2)}%
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: `${height}px` }} className="print:h-64">
        {renderChart()}
      </div>

      {/* Chart Legend for Print */}
      {type === 'doughnut' && (
        <div className="mt-4 hidden print:block">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded mr-2"
                  style={{ backgroundColor: item.color || colors[index % colors.length] }}
                />
                <span>{item.label}: {new Intl.NumberFormat('pt-BR').format(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}