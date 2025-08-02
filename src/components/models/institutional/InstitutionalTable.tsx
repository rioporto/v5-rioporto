'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ArrowUpDown, Search, Filter, Download } from 'lucide-react';

interface Column<T = any> {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

interface InstitutionalTableProps<T = any> {
  className?: string;
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  sortConfig?: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  rowSelection?: {
    selectedRowKeys: string[];
    onChange: (selectedKeys: string[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
}

const InstitutionalTable = <T extends Record<string, any>>({
  className,
  columns,
  data,
  loading = false,
  pagination,
  sortConfig,
  onSort,
  rowSelection,
  searchable = false,
  filterable = false,
  exportable = false,
  title,
  size = 'md',
  bordered = true,
  striped = true,
  hoverable = true
}: InstitutionalTableProps<T>) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);

  React.useEffect(() => {
    if (searchable && searchTerm) {
      const filtered = data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, searchTerm, searchable]);

  const handleSort = (columnKey: string) => {
    if (!onSort) return;
    
    const direction = sortConfig?.key === columnKey && sortConfig.direction === 'asc' 
      ? 'desc' 
      : 'asc';
    
    onSort(columnKey, direction);
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-primary" />
      : <ChevronDown className="h-4 w-4 text-primary" />;
  };

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const paddingClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4'
  };

  return (
    <div className={cn('bg-card rounded-md border border-border shadow-sm', className)}>
      {/* Header */}
      {(title || searchable || filterable || exportable) && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {searchable && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}
              
              {filterable && (
                <button className="p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                  <Filter className="h-4 w-4" />
                </button>
              )}
              
              {exportable && (
                <button className="p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {rowSelection && (
                <th className={cn('text-left font-semibold text-foreground', paddingClasses[size])}>
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    onChange={(e) => {
                      const allKeys = data.map((_, index) => index.toString());
                      rowSelection.onChange(e.target.checked ? allKeys : []);
                    }}
                    checked={rowSelection.selectedRowKeys.length === data.length && data.length > 0}
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'text-left font-semibold text-foreground',
                    paddingClasses[size],
                    sizeClasses[size],
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.className
                  )}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.dataIndex)}
                        className="hover:bg-muted rounded p-1 transition-colors"
                      >
                        {getSortIcon(column.dataIndex)}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="text-center py-8">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="text-center py-8 text-muted-foreground">
                  No data available
                </td>
              </tr>
            ) : (
              filteredData.map((record, index) => (
                <tr
                  key={index}
                  className={cn(
                    'transition-colors',
                    bordered && 'border-b border-border',
                    striped && index % 2 === 0 && 'bg-muted/25',
                    hoverable && 'hover:bg-muted/50'
                  )}
                >
                  {rowSelection && (
                    <td className={paddingClasses[size]}>
                      <input
                        type="checkbox"
                        className="rounded border-border"
                        checked={rowSelection.selectedRowKeys.includes(index.toString())}
                        onChange={(e) => {
                          const currentKeys = rowSelection.selectedRowKeys;
                          const key = index.toString();
                          
                          if (e.target.checked) {
                            rowSelection.onChange([...currentKeys, key]);
                          } else {
                            rowSelection.onChange(currentKeys.filter(k => k !== key));
                          }
                        }}
                        {...(rowSelection.getCheckboxProps?.(record) || {})}
                      />
                    </td>
                  )}
                  
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'text-foreground',
                        paddingClasses[size],
                        sizeClasses[size],
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right',
                        column.className
                      )}
                    >
                      {column.render 
                        ? column.render(record[column.dataIndex], record, index)
                        : record[column.dataIndex]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min((pagination.current - 1) * pagination.pageSize + 1, pagination.total)} to{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} of {pagination.total} entries
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
              disabled={pagination.current === 1}
              className="px-3 py-1 border border-border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              Previous
            </button>
            
            <span className="px-3 py-1 text-sm">
              Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            
            <button
              onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
              disabled={pagination.current === Math.ceil(pagination.total / pagination.pageSize)}
              className="px-3 py-1 border border-border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionalTable;