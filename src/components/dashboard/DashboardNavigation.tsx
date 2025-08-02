'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  TrendingUp, 
  ShoppingCart, 
  ShoppingBag,
  History, 
  BarChart3, 
  Wrench, 
  Settings,
  User,
  Shield,
  Monitor,
  CreditCard,
  Wallet,
  FileCheck
} from 'lucide-react';

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Portfolio',
    href: '/dashboard/portfolio',
    icon: TrendingUp,
  },
  {
    title: 'Comprar',
    href: '/dashboard/buy',
    icon: ShoppingCart,
  },
  {
    title: 'Vender',
    href: '/dashboard/sell',
    icon: ShoppingBag,
  },
  {
    title: 'Transações',
    href: '/dashboard/transactions',
    icon: History,
  },
  {
    title: 'Indicadores',
    href: '/dashboard/indicators',
    icon: BarChart3,
  },
  {
    title: 'Ferramentas',
    href: '/dashboard/tools',
    icon: Wrench,
  },
  {
    title: 'Configurações',
    href: '/dashboard/settings',
    icon: Settings,
    children: [
      {
        title: 'Perfil',
        href: '/dashboard/settings',
        icon: User,
      },
      {
        title: 'Segurança',
        href: '/dashboard/settings/security',
        icon: Shield,
      },
      {
        title: 'Sessões',
        href: '/dashboard/settings/sessions',
        icon: Monitor,
      },
      {
        title: 'KYC',
        href: '/dashboard/settings/kyc',
        icon: FileCheck,
      },
      {
        title: 'PIX',
        href: '/dashboard/settings/pix',
        icon: CreditCard,
      },
      {
        title: 'Carteiras',
        href: '/dashboard/settings/wallets',
        icon: Wallet,
      },
    ],
  },
];

interface DashboardNavigationProps {
  collapsed?: boolean;
}

export function DashboardNavigation({ collapsed = false }: DashboardNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => (
        <NavigationItemComponent
          key={item.href}
          item={item}
          pathname={pathname}
          collapsed={collapsed}
        />
      ))}
    </nav>
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
  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;
  const isParentActive = hasChildren && item.children?.some(child => pathname === child.href);

  if (hasChildren && !collapsed) {
    return (
      <div className="space-y-1">
        <div className={cn(
          'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
          (isActive || isParentActive) 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-accent',
          level > 0 && 'ml-4'
        )}>
          <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
          <span className="flex-1">{item.title}</span>
          {item.badge && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
              {item.badge}
            </span>
          )}
        </div>
        
        <div className="ml-4 space-y-1">
          {item.children?.map((child) => (
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
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent',
        collapsed && 'justify-center',
        level > 0 && !collapsed && 'ml-4'
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
          {item.badge && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}