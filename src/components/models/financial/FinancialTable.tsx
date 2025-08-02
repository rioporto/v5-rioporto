'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FinancialTableColumn<T = any> {
  key: string;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  sortable?: boolean;
  className?: string;
}

export interface FinancialTableProps<T = any> {
  className?: string;
  columns: FinancialTableColumn<T>[];
  data: T[];
  loading?: boolean;
  dense?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  borderless?: boolean;
  onRowClick?: (record: T, index: number) => void;
  emptyMessage?: string;
  maxHeight?: string | number;
}

const FinancialTable = forwardRef<HTMLDivElement, FinancialTableProps>(
  ({
    className,
    columns,
    data,
    loading = false,
    dense = true,
    striped = true,
    hoverable = true,
    borderless = false,
    onRowClick,
    emptyMessage = 'No data available',
    maxHeight,
    ...props
  }, ref) => {
    const getValue = (record: any, key: string) => {
      return key.split('.').reduce((obj, k) => obj?.[k], record);
    };

    const formatValue = (value: any, key: string, type?: string) => {
      if (value === null || value === undefined) return '-';
      
      if (typeof value === 'number') {
        // Price formatting
        if (type === 'price' || key.includes('price') || key.includes('Price')) {
          return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
          }).format(value);
        }
        
        // Percentage formatting
        if (type === 'percentage' || key.includes('change') || key.includes('Change')) {
          const isPositive = value >= 0;
          return (
            <span className={cn(
              'font-mono',
              isPositive ? 'text-success' : 'text-error'
            )}>
              {isPositive ? '+' : ''}{value.toFixed(2)}%
            </span>
          );
        }
        
        // Volume formatting
        if (type === 'volume' || key.includes('volume') || key.includes('Volume')) {
          return new Intl.NumberFormat('pt-BR', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(value);
        }
        
        // Default number formatting
        return new Intl.NumberFormat('pt-BR').format(value);
      }
      
      return value;
    };

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        {...props}
      >
        <div
          className={cn(
            'overflow-auto',
            maxHeight && typeof maxHeight === 'string' 
              ? maxHeight 
              : maxHeight 
                ? `max-h-[${maxHeight}px]` 
                : 'max-h-96'
          )}
        >
          <table className="w-full">
            {/* Header */}
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-border bg-muted/20">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'text-left font-mono text-xs font-medium text-muted-foreground',
                      'uppercase tracking-wide',
                      {
                        'py-1 px-2': dense,
                        'py-2 px-3': !dense,
                        'text-center': column.align === 'center',
                        'text-right': column.align === 'right',
                      },
                      column.className
                    )}
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.title}</span>
                      {column.sortable && (
                        <div className="h-3 w-3 opacity-50">
                          <svg viewBox="0 0 8 8" className="h-full w-full fill-current">
                            <path d="M4 1L7 4H1L4 1ZM4 7L1 4H7L4 7Z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {loading ? (
                // Loading rows
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-b border-border/50">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          {
                            'py-1 px-2': dense,
                            'py-2 px-3': !dense,
                          }
                        )}
                      >
                        <div className="h-4 bg-muted/50 animate-pulse rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data.length === 0 ? (
                // Empty state
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-8 text-center text-muted-foreground font-mono text-sm"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                // Data rows
                data.map((record, index) => (
                  <tr
                    key={index}
                    className={cn(
                      {
                        'border-b border-border/50': !borderless,
                        'bg-muted/10': striped && index % 2 === 1,
                        'hover:bg-muted/30 cursor-pointer': hoverable || onRowClick,
                      }
                    )}
                    onClick={() => onRowClick?.(record, index)}
                  >
                    {columns.map((column) => {
                      const value = getValue(record, column.key);
                      const rendered = column.render 
                        ? column.render(value, record, index)
                        : formatValue(value, column.key);

                      return (
                        <td
                          key={column.key}
                          className={cn(
                            'font-mono text-sm text-foreground',
                            {
                              'py-1 px-2': dense,
                              'py-2 px-3': !dense,
                              'text-center': column.align === 'center',
                              'text-right': column.align === 'right',
                            },
                            column.className
                          )}
                        >
                          {rendered}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

FinancialTable.displayName = 'FinancialTable';

export { FinancialTable };