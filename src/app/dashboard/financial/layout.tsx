'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { FinancialNavigation } from '@/components/models/financial/navigation/FinancialNavigation';
import { FinancialHeader } from '@/components/models/financial/layout/FinancialHeader';
import { FinancialSidebar } from '@/components/models/financial/layout/FinancialSidebar';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { cn } from '@/lib/utils';

interface FinancialLayoutProps {
  children: React.ReactNode;
}

function FinancialLayoutContent({ children }: FinancialLayoutProps) {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Financial Header */}
      <FinancialHeader 
        user={user}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        rightPanelOpen={rightPanelOpen}
        onToggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <FinancialSidebar 
          collapsed={sidebarCollapsed}
        />
        
        {/* Main Content */}
        <main className={cn(
          'flex-1 flex flex-col overflow-hidden transition-all duration-300',
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        )}>
          {children}
        </main>
        
        {/* Right Panel (Watchlist, News, etc.) */}
        <div className={cn(
          'w-80 bg-card border-l border-border flex-col transition-all duration-300',
          rightPanelOpen ? 'flex' : 'hidden'
        )}>
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Market Watch
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Watchlist and market data will go here */}
            <div className="p-4 text-sm text-muted-foreground">
              Market data panel coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinancialLayout({ children }: FinancialLayoutProps) {
  return (
    <ProtectedRoute>
      <FinancialLayoutContent>
        {children}
      </FinancialLayoutContent>
    </ProtectedRoute>
  );
}