'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter 
} from '@/components/layout/Sidebar';
import { Logo } from '@/components/shared/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Shield,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Usuários',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Ordens',
    href: '/admin/orders',
    icon: FileText,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Fila KYC',
    href: '/admin/kyc-queue',
    icon: Shield,
  },
  {
    title: 'Segurança',
    href: '/admin/security',
    icon: Settings,
  },
];

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check if user has admin role
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'MODERATOR';

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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Acesso Negado</h1>
          <p className="text-muted-foreground mb-4">
            Você não tem permissão para acessar o painel administrativo.
          </p>
          <Link href="/dashboard">
            <Button>Voltar ao Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

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
          <Badge variant="destructive" className="text-xs">ADMIN</Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-5 h-5" />
          </Button>
          
          <Avatar 
            src={user.avatar} 
            alt={user.name}
            size="sm"
            fallback={user.name.charAt(0).toUpperCase()}
          />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          position="fixed"
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          collapsed={sidebarCollapsed}
          className="lg:position-sticky lg:translate-x-0 bg-destructive/5 border-destructive/20"
        >
          {/* Sidebar Header */}
          <SidebarHeader className="flex items-center justify-between border-destructive/20">
            <div className="flex items-center space-x-2">
              {!sidebarCollapsed && (
                <>
                  <Logo />
                  <Badge variant="destructive" className="text-xs">ADMIN</Badge>
                </>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1"
            >
              <ChevronLeft className={cn(
                "w-4 h-4 transition-transform",
                sidebarCollapsed && "rotate-180"
              )} />
            </Button>
          </SidebarHeader>

          {/* Sidebar Content */}
          <SidebarContent className="px-3">
            <nav className="space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      isActive 
                        ? 'bg-destructive text-destructive-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                      sidebarCollapsed && 'justify-center'
                    )}
                    title={sidebarCollapsed ? item.title : undefined}
                  >
                    <Icon className={cn(
                      'w-4 h-4 flex-shrink-0',
                      !sidebarCollapsed && 'mr-3'
                    )} />
                    
                    {!sidebarCollapsed && (
                      <span className="flex-1">{item.title}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter className="border-destructive/20">
            {!sidebarCollapsed ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-destructive/5 rounded-lg">
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
                      Administrador
                    </p>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  onClick={logout}
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Avatar 
                  src={user.avatar} 
                  alt={user.name}
                  size="sm"
                  fallback={user.name.charAt(0).toUpperCase()}
                />
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={logout}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className={cn(
          'flex-1 min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}>
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between p-6 border-b border-border bg-card">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">
                Painel Administrativo
              </h1>
              <Badge variant="destructive">ADMIN</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              
              <Avatar 
                src={user.avatar} 
                alt={user.name}
                size="sm"
                fallback={user.name.charAt(0).toUpperCase()}
              />
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

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute requiredRole={['ADMIN', 'MODERATOR']}>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </ProtectedRoute>
  );
}