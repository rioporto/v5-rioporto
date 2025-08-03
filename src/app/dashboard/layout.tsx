'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter 
} from '@/components/layout/Sidebar';
import { DashboardNavigation } from '@/components/dashboard/DashboardTempNavigation';
import { Logo } from '@/components/shared/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownContent, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { 
  Menu, 
  X, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { currentTheme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const searchParams = useSearchParams();

  // Aplicar tema baseado no parâmetro de busca
  useEffect(() => {
    const theme = searchParams.get('theme');
    if (theme && ['minimalist', 'financial', 'crypto-native', 'institutional', 'gaming'].includes(theme)) {
      setTheme(theme as any);
    }
  }, [searchParams, setTheme]);

  // Fechar sidebar mobile em telas grandes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) {
    return <LoadingScreen />;
  }

  const userMenuItems = [
    {
      label: 'Perfil',
      href: '/dashboard/settings',
      icon: User,
    },
    {
      label: 'Configurações',
      href: '/dashboard/settings',
      icon: Settings,
    },
    {
      type: 'divider' as const,
    },
    {
      label: 'Sair',
      onClick: logout,
      icon: LogOut,
      variant: 'error' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <Logo />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-5 h-5" />
          </Button>
          
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
                    key={item.label}
                    onClick={item.onClick || (() => item.href && router.push(item.href))}
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

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          position="fixed"
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          collapsed={sidebarCollapsed}
          className="lg:position-sticky lg:translate-x-0"
        >
          {/* Sidebar Header */}
          <SidebarHeader className="flex items-center justify-between">
            {!sidebarCollapsed && <Logo />}
            
            {/* Desktop collapse button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </SidebarHeader>

          {/* Sidebar Content */}
          <SidebarContent className="px-3">
            <DashboardNavigation collapsed={sidebarCollapsed} />
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter className="space-y-3">
            {!sidebarCollapsed ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                  <Avatar 
                    src={user.avatar} 
                    alt={user.name}
                    size="sm"
                    fallback={user.name.charAt(0).toUpperCase()}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between">
                  <ThemeToggle currentTheme={currentTheme} onThemeChange={setTheme} />
                  
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
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
                            key={item.label}
                            onClick={item.onClick || (() => item.href && router.push(item.href))}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownContent>
                  </Dropdown>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Avatar 
                  src={user.avatar} 
                  alt={user.name}
                  size="sm"
                  fallback={user.name.charAt(0).toUpperCase()}
                />
                <ThemeToggle currentTheme={currentTheme} onThemeChange={setTheme} />
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className={cn(
          'flex-1 min-h-screen transition-all duration-300',
          'lg:ml-0', // No margin needed as sidebar is sticky/fixed
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}>
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between p-6 border-b border-border bg-card">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              
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
                        key={item.label}
                        onClick={item.onClick || (() => item.href && router.push(item.href))}
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

          {/* Page Content */}
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
    </ProtectedRoute>
  );
}