'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Activity, 
  FileText, 
  TrendingUp, 
  Settings,
  Wallet,
  DollarSign,
  PieChart
} from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard/financial', icon: BarChart3 },
  { name: 'Trading', href: '/dashboard/financial/trading', icon: Activity },
  { name: 'Orders', href: '/dashboard/financial/orders', icon: FileText },
  { name: 'Positions', href: '/dashboard/financial/positions', icon: TrendingUp },
  { name: 'Analytics', href: '/dashboard/financial/analytics', icon: PieChart },
  { name: 'Wallet', href: '/dashboard/financial/wallet', icon: Wallet },
  { name: 'Settings', href: '/dashboard/financial/settings', icon: Settings },
];

interface FinancialNavigationProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function FinancialNavigation({ 
  className, 
  orientation = 'horizontal' 
}: FinancialNavigationProps) {
  const pathname = usePathname();

  if (orientation === 'vertical') {
    return (
      <nav className={cn('flex flex-col space-y-1', className)}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
              {item.badge && (
                <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className={cn('flex items-center space-x-1', className)}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{item.name}</span>
            {item.badge && (
              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}