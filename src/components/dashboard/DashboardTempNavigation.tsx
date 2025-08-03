'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Wallet, 
  Brain,
  ShoppingCart, 
  DollarSign,
  History, 
  Activity, 
  Wrench, 
  Settings,
  User,
  Shield,
  Layers,
  Image,
  Users,
  Globe,
  FileCheck,
  CreditCard,
  Key,
  LineChart,
  Lock,
  GraduationCap,
  UserCog
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
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Portfolio',
    href: '/dashboard/portfolio',
    icon: Wallet,
  },
  {
    title: 'Intelligence',
    href: '/dashboard/portfolio-intelligence',
    icon: Brain,
    badge: 'AI'
  },
  {
    title: 'Trading',
    href: '/dashboard/trading',
    icon: LineChart,
    badge: 'NEW'
  },
  {
    title: 'Security Center',
    href: '/dashboard/security',
    icon: Lock,
  },
  {
    title: 'Academy',
    href: '/dashboard/academy',
    icon: GraduationCap,
  },
  {
    title: 'Admin',
    href: '/dashboard/admin',
    icon: UserCog,
    badge: 'ADMIN'
  },
  {
    title: 'Buy Crypto',
    href: '/dashboard/buy',
    icon: ShoppingCart,
  },
  {
    title: 'Sell Crypto',
    href: '/dashboard/sell',
    icon: DollarSign,
  },
  {
    title: 'Transactions',
    href: '/dashboard/transactions',
    icon: History,
  },
  {
    title: 'Indicators',
    href: '/dashboard/indicators',
    icon: Activity,
  },
  {
    title: 'Tools',
    href: '/dashboard/tools',
    icon: Wrench,
  },
  {
    title: 'DeFi',
    href: '/dashboard/defi',
    icon: Layers,
  },
  {
    title: 'NFT',
    href: '/dashboard/nft',
    icon: Image,
  },
  {
    title: 'DAO',
    href: '/dashboard/dao',
    icon: Users,
  },
  {
    title: 'Metaverse',
    href: '/dashboard/metaverse',
    icon: Globe,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    children: [
      {
        title: 'Profile',
        href: '/dashboard/settings',
        icon: User,
      },
      {
        title: 'Security',
        href: '/dashboard/settings/security',
        icon: Shield,
      },
      {
        title: 'Sessions',
        href: '/dashboard/settings/sessions',
        icon: Key,
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
        title: 'Wallets',
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