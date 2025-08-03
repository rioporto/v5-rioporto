import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Filter,
  Search,
  Calendar,
  Shield,
  Users,
  DollarSign,
  Activity,
  X,
  ChevronDown,
  Check,
  Globe,
  Clock,
  TrendingUp,
  UserCheck,
  UserX,
  AlertCircle
} from 'lucide-react';

interface UserFiltersProps {
  className?: string;
  onFiltersChange?: (filters: FilterState) => void;
  totalUsers?: number;
  filteredUsers?: number;
}

interface FilterState {
  search: string;
  status: string[];
  role: string[];
  kycLevel: number[];
  dateRange: { from: Date | null; to: Date | null };
  volumeRange: { min: number; max: number };
  location: string[];
  lastActive: string;
}

export function UserFilters({ 
  className,
  onFiltersChange,
  totalUsers = 45231,
  filteredUsers = 12543
}: UserFiltersProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterState>({
    search: '',
    status: [],
    role: [],
    kycLevel: [],
    dateRange: { from: null, to: null },
    volumeRange: { min: 0, max: 1000000 },
    location: [],
    lastActive: 'all'
  });

  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const filterOptions = {
    status: [
      { value: 'active', label: 'Active', icon: <UserCheck className="w-4 h-4" />, color: 'text-green-500' },
      { value: 'suspended', label: 'Suspended', icon: <UserX className="w-4 h-4" />, color: 'text-red-500' },
      { value: 'pending', label: 'Pending', icon: <Clock className="w-4 h-4" />, color: 'text-yellow-500' }
    ],
    role: [
      { value: 'admin', label: 'Admin', count: 12 },
      { value: 'moderator', label: 'Moderator', count: 45 },
      { value: 'user', label: 'User', count: 44174 }
    ],
    kycLevel: [
      { value: 0, label: 'Level 0', count: 5231 },
      { value: 1, label: 'Level 1', count: 15420 },
      { value: 2, label: 'Level 2', count: 18563 },
      { value: 3, label: 'Level 3', count: 6017 }
    ],
    lastActive: [
      { value: '24h', label: 'Last 24 hours' },
      { value: '7d', label: 'Last 7 days' },
      { value: '30d', label: 'Last 30 days' },
      { value: '90d', label: 'Last 90 days' },
      { value: 'all', label: 'All time' }
    ]
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const toggleArrayFilter = (key: 'status' | 'role' | 'kycLevel' | 'location', value: any) => {
    const currentValues = filters[key] as any[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleFilterChange(key, newValues);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      search: '',
      status: [],
      role: [],
      kycLevel: [],
      dateRange: { from: null, to: null },
      volumeRange: { min: 0, max: 1000000 },
      location: [],
      lastActive: 'all'
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const activeFilterCount = 
    filters.status.length + 
    filters.role.length + 
    filters.kycLevel.length + 
    filters.location.length +
    (filters.search ? 1 : 0) +
    (filters.dateRange.from ? 1 : 0) +
    (filters.lastActive !== 'all' ? 1 : 0);

  return (
    <Card className={cn('p-6', className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">User Filters</h3>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFilterCount} active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear all
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDown className={cn(
                'w-4 h-4 transition-transform',
                isExpanded && 'rotate-180'
              )} />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search users by name, email, or ID..."
            className="pl-10"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Status */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')}
              className={cn(
                filters.status.length > 0 && 'border-primary'
              )}
            >
              <Users className="w-4 h-4 mr-2" />
              Status
              {filters.status.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filters.status.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            
            {activeDropdown === 'status' && (
              <div className="absolute top-full mt-2 left-0 w-56 bg-popover border border-border rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {filterOptions.status.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleArrayFilter('status', option.value)}
                      className={cn(
                        'w-full flex items-center justify-between p-2 rounded hover:bg-muted',
                        filters.status.includes(option.value) && 'bg-muted'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className={option.color}>{option.icon}</div>
                        <span className="text-sm">{option.label}</span>
                      </div>
                      {filters.status.includes(option.value) && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveDropdown(activeDropdown === 'role' ? null : 'role')}
              className={cn(
                filters.role.length > 0 && 'border-primary'
              )}
            >
              <Shield className="w-4 h-4 mr-2" />
              Role
              {filters.role.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filters.role.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            
            {activeDropdown === 'role' && (
              <div className="absolute top-full mt-2 left-0 w-56 bg-popover border border-border rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {filterOptions.role.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleArrayFilter('role', option.value)}
                      className={cn(
                        'w-full flex items-center justify-between p-2 rounded hover:bg-muted',
                        filters.role.includes(option.value) && 'bg-muted'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{option.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {option.count}
                        </Badge>
                      </div>
                      {filters.role.includes(option.value) && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* KYC Level */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveDropdown(activeDropdown === 'kyc' ? null : 'kyc')}
              className={cn(
                filters.kycLevel.length > 0 && 'border-primary'
              )}
            >
              <Shield className="w-4 h-4 mr-2" />
              KYC Level
              {filters.kycLevel.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filters.kycLevel.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            
            {activeDropdown === 'kyc' && (
              <div className="absolute top-full mt-2 left-0 w-56 bg-popover border border-border rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {filterOptions.kycLevel.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleArrayFilter('kycLevel', option.value)}
                      className={cn(
                        'w-full flex items-center justify-between p-2 rounded hover:bg-muted',
                        filters.kycLevel.includes(option.value) && 'bg-muted'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{option.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {option.count}
                        </Badge>
                      </div>
                      {filters.kycLevel.includes(option.value) && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Last Active */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveDropdown(activeDropdown === 'active' ? null : 'active')}
              className={cn(
                filters.lastActive !== 'all' && 'border-primary'
              )}
            >
              <Activity className="w-4 h-4 mr-2" />
              Last Active
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            
            {activeDropdown === 'active' && (
              <div className="absolute top-full mt-2 left-0 w-56 bg-popover border border-border rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {filterOptions.lastActive.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        handleFilterChange('lastActive', option.value);
                        setActiveDropdown(null);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between p-2 rounded hover:bg-muted',
                        filters.lastActive === option.value && 'bg-muted'
                      )}
                    >
                      <span className="text-sm">{option.label}</span>
                      {filters.lastActive === option.value && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date Range */}
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>

          {/* Volume Range */}
          <Button variant="outline" size="sm">
            <DollarSign className="w-4 h-4 mr-2" />
            Volume
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>

          {/* Location */}
          <Button variant="outline" size="sm">
            <Globe className="w-4 h-4 mr-2" />
            Location
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            {filters.search && (
              <Badge variant="secondary" className="gap-1">
                Search: {filters.search}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => handleFilterChange('search', '')}
                />
              </Badge>
            )}
            {filters.status.map((status) => (
              <Badge key={status} variant="secondary" className="gap-1 capitalize">
                Status: {status}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => toggleArrayFilter('status', status)}
                />
              </Badge>
            ))}
            {filters.role.map((role) => (
              <Badge key={role} variant="secondary" className="gap-1 capitalize">
                Role: {role}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => toggleArrayFilter('role', role)}
                />
              </Badge>
            ))}
            {filters.kycLevel.map((level) => (
              <Badge key={level} variant="secondary" className="gap-1">
                KYC Level: {level}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => toggleArrayFilter('kycLevel', level)}
                />
              </Badge>
            ))}
            {filters.lastActive !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Active: {filterOptions.lastActive.find(o => o.value === filters.lastActive)?.label}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => handleFilterChange('lastActive', 'all')}
                />
              </Badge>
            )}
          </div>
        )}

        {/* Results Summary */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredUsers.toLocaleString()}</span> of {totalUsers.toLocaleString()} users
              </span>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  Save Filter
                </Button>
                <Button size="sm">
                  Export Results
                </Button>
              </div>
            </div>
            
            {/* Filter Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  Most Common Status
                </div>
                <p className="text-sm font-medium mt-1">Active (78%)</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  Top Location
                </div>
                <p className="text-sm font-medium mt-1">United States (42%)</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  Avg. Volume
                </div>
                <p className="text-sm font-medium mt-1">$125,430</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </Card>
  );
}