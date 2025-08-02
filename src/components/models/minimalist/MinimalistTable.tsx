'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  sortable?: boolean;
}

export interface MinimalistTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn[];
  data: Record<string, any>[];
  loading?: boolean;
  emptyMessage?: string;
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
}

const MinimalistTable = forwardRef<HTMLDivElement, MinimalistTableProps>(
  ({ 
    className, 
    columns, 
    data, 
    loading = false,
    emptyMessage = 'No data available',
    onSort,
    sortKey,
    sortDirection,
    ...props 
  }, ref) => {
    const handleSort = (key: string) => {
      if (onSort) {
        onSort(key);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('overflow-hidden rounded-lg bg-card', className)}
        {...props}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header */}
            <thead className="bg-secondary/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'px-6 py-3 text-sm font-medium text-foreground',
                      {
                        'text-left': column.align === 'left' || !column.align,
                        'text-center': column.align === 'center',
                        'text-right': column.align === 'right',
                      },
                      column.sortable && 'cursor-pointer select-none hover:bg-secondary/70'
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <span className="ml-1">
                          {sortKey === column.key ? (
                            sortDirection === 'asc' ? '↑' : '↓'
                          ) : (
                            '↕'
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span className="text-sm text-muted">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-8 text-center">
                    <span className="text-sm text-muted">{emptyMessage}</span>
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex}
                    className="hover:bg-secondary/30 transition-colors duration-150"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          'px-6 py-4 text-sm text-foreground',
                          {
                            'text-left': column.align === 'left' || !column.align,
                            'text-center': column.align === 'center',
                            'text-right': column.align === 'right',
                          }
                        )}
                      >
                        {row[column.key]}
                      </td>
                    ))}
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

MinimalistTable.displayName = 'MinimalistTable';

// Simple data list component for key-value pairs
interface MinimalistDataListProps {
  data: Array<{
    label: string;
    value: React.ReactNode;
  }>;
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

const MinimalistDataList = forwardRef<HTMLDListElement | HTMLDivElement, MinimalistDataListProps>(
  ({ className, data, variant = 'horizontal' }, ref) => {
    if (variant === 'vertical') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn('space-y-4', className)}
        >
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <dt className="text-sm font-medium text-muted">{item.label}</dt>
              <dd className="text-sm text-foreground">{item.value}</dd>
            </div>
          ))}
        </div>
      );
    }

    return (
      <dl
        ref={ref as React.Ref<HTMLDListElement>}
        className={cn('divide-y divide-border', className)}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <dt className="text-sm font-medium text-muted">{item.label}</dt>
            <dd className="text-sm text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>
    );
  }
);

MinimalistDataList.displayName = 'MinimalistDataList';

export {
  MinimalistTable,
  MinimalistDataList,
};