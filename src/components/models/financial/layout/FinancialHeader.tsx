'use client';

import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown, DropdownContent, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown';
import { Badge } from '@/components/ui/Badge';
import { 
  Menu, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  ChevronLeft,
  ChevronRight,
  PanelRightOpen,
  PanelRightClose,
  Activity,
  Wifi,
  WifiOff
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface FinancialHeaderProps {
  user: User;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  rightPanelOpen: boolean;
  onToggleRightPanel: () => void;
}

export function FinancialHeader({
  user,
  sidebarCollapsed,
  onToggleSidebar,
  rightPanelOpen,
  onToggleRightPanel,
}: FinancialHeaderProps) {
  const userMenuItems = [
    {
      label: 'Profile',
      href: '/dashboard/settings',
      icon: User,
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
    {
      type: 'divider' as const,
    },
    {
      label: 'Sign Out',
      onClick: () => console.log('logout'),
      icon: LogOut,
      variant: 'error' as const,
    },
  ];

  return (
    <div className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="p-2"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>

        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">RP</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold">RioPorto Financial</h1>
            <div className="text-xs text-muted-foreground">Professional Trading Terminal</div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live Market Data</span>
          </div>
          
          <div className="h-4 w-px bg-border" />
          
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">WebSocket Connected</span>
          </div>
        </div>
      </div>

      {/* Center Section - Market Overview */}
      <div className="hidden xl:flex items-center space-x-6 flex-1 justify-center">
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-center">
            <div className="text-muted-foreground text-xs">BTC/BRL</div>
            <div className="font-mono font-semibold">R$ 342,156.78</div>
            <div className="text-success text-xs">+2.34%</div>
          </div>
          
          <div className="text-center">
            <div className="text-muted-foreground text-xs">ETH/BRL</div>
            <div className="font-mono font-semibold">R$ 12,650.45</div>
            <div className="text-error text-xs">-1.25%</div>
          </div>
          
          <div className="text-center">
            <div className="text-muted-foreground text-xs">Market Cap</div>
            <div className="font-mono font-semibold">$2.1T</div>
            <div className="text-success text-xs">+0.85%</div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Connection Status */}
        <div className="hidden md:flex items-center space-x-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <Wifi className="w-3 h-3 mr-1" />
            Online
          </Badge>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full" />
        </Button>

        {/* Right Panel Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleRightPanel}
          className="p-2"
        >
          {rightPanelOpen ? (
            <PanelRightClose className="w-4 h-4" />
          ) : (
            <PanelRightOpen className="w-4 h-4" />
          )}
        </Button>

        {/* User Menu */}
        <Dropdown
          trigger={
            <Button variant="ghost" size="sm" className="p-1">
              <Avatar 
                src={user.avatar} 
                alt={user.name}
                size="sm"
                fallback={user.name.charAt(0).toUpperCase()}
              />
            </Button>
          }
        >
          <DropdownContent>
            {userMenuItems.map((item, index) => {
              if (item.type === 'divider') {
                return <DropdownSeparator key={index} />;
              }
              
              const Icon = item.icon;
              return (
                <DropdownItem 
                  key={index}
                  onClick={item.onClick}
                  className={item.variant === 'error' ? 'text-red-600' : ''}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </DropdownItem>
              );
            })}
          </DropdownContent>
        </Dropdown>
      </div>
    </div>
  );
}