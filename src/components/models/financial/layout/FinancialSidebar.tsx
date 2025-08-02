'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Target,
  History,
  BarChart3,
  Calculator,
  Shield,
  Bell,
  Settings,
  BookOpen,
  Users,
  Zap,
  PieChart,
  Activity,
  Layers
} from 'lucide-react';

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  isNew?: boolean;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard/financial',
    icon: LayoutDashboard,
  },
  {
    title: 'Trading Terminal',
    href: '/dashboard/financial/trading',
    icon: TrendingUp,
    badge: 'LIVE',
  },
  {
    title: 'Positions',
    href: '/dashboard/financial/positions',
    icon: Target,
    badge: 8,
  },
  {
    title: 'Orders',
    href: '/dashboard/financial/orders',
    icon: History,
    badge: 3,
  },
  {
    title: 'Analytics',
    href: '/dashboard/financial/analytics',
    icon: BarChart3,
  },
  {
    title: 'Tools',
    href: '#',
    icon: Calculator,
    children: [
      {
        title: 'Profit Calculator',
        href: '/dashboard/financial/tools/profit-calculator',
        icon: Calculator,
      },
      {
        title: 'Risk Manager',
        href: '/dashboard/financial/tools/risk-manager',
        icon: Shield,
      },
      {
        title: 'Position Sizer',
        href: '/dashboard/financial/tools/position-sizer',
        icon: PieChart,
      },
      {
        title: 'Backtester',
        href: '/dashboard/financial/tools/backtester',
        icon: Activity,
        isNew: true,
      },
    ],
  },
  {
    title: 'Market Data',
    href: '#',
    icon: Layers,
    children: [
      {
        title: 'Watchlists',
        href: '/dashboard/financial/watchlists',
        icon: BookOpen,
      },
      {
        title: 'Screener',
        href: '/dashboard/financial/screener',
        icon: Zap,
      },
      {
        title: 'Economic Calendar',
        href: '/dashboard/financial/calendar',
        icon: Bell,
      },
    ],
  },
  {
    title: 'Social Trading',
    href: '/dashboard/financial/social',
    icon: Users,
    isNew: true,
  },
  {
    title: 'Settings',
    href: '/dashboard/financial/settings',
    icon: Settings,
  },
];

interface FinancialSidebarProps {
  collapsed: boolean;
}

export function FinancialSidebar({ collapsed }: FinancialSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn(
      'fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-card border-r border-border transition-all duration-300 z-30',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <NavigationItemComponent
              key={item.href}
              item={item}
              pathname={pathname}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className={cn(
          'p-3 border-t border-border',
          collapsed ? 'text-center' : ''
        )}>
          {collapsed ? (
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-success rounded-full" />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Market Open</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Trading session: 09:00 - 18:00 BRT
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface NavigationItemComponentProps {
  item: NavigationItem;
  pathname: string;
  collapsed: boolean;
  level?: number;
}

function NavigationItemComponent({ 
  item, 
  pathname, 
  collapsed, 
  level = 0 
}: NavigationItemComponentProps) {
  const Icon = item.icon;
  const isActive = pathname === item.href || (item.children && item.children.some(child => pathname === child.href));
  const hasChildren = item.children && item.children.length > 0;
  const isParentActive = hasChildren && item.children.some(child => pathname === child.href);

  if (hasChildren && !collapsed) {
    return (
      <div className="space-y-1">
        <div className={cn(
          'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer',
          (isActive || isParentActive) 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        )}>
          <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
          <span className="flex-1">{item.title}</span>
          {item.badge && (
            <Badge 
              variant={typeof item.badge === 'string' ? 'default' : 'secondary'}
              size="sm"
              className="text-xs"
            >
              {item.badge}
            </Badge>
          )}
          {item.isNew && (
            <Badge variant="default" size="sm" className="text-xs bg-success">
              NEW
            </Badge>
          )}
        </div>
        
        <div className="ml-4 space-y-1 border-l border-border pl-3">
          {item.children.map((child) => (
            <NavigationItemComponent
              key={child.href}
              item={child}
              pathname={pathname}
              collapsed={collapsed}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
        pathname === item.href
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent',
        collapsed && 'justify-center p-2',
        level > 0 && !collapsed && 'text-xs'
      )}
      title={collapsed ? item.title : undefined}
    >
      <Icon className={cn(
        'w-4 h-4 flex-shrink-0',
        !collapsed && 'mr-3'
      )} />
      
      {!collapsed && (
        <>
          <span className="flex-1">{item.title}</span>
          <div className="flex items-center space-x-1">
            {item.badge && (
              <Badge 
                variant={typeof item.badge === 'string' ? 'default' : 'secondary'}
                size="sm"
                className="text-xs"
              >
                {item.badge}
              </Badge>
            )}
            {item.isNew && (
              <Badge variant="default" size="sm" className="text-xs bg-success">
                NEW
              </Badge>
            )}
          </div>
        </>
      )}
    </Link>
  );
}