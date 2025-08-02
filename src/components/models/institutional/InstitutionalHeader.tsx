'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Bell, Search, User, Menu, ChevronDown } from 'lucide-react';

interface InstitutionalHeaderProps {
  className?: string;
  logo?: React.ReactNode;
  title?: string;
  navigation?: NavigationItem[];
  userMenu?: UserMenuProps;
  notifications?: boolean;
  search?: boolean;
  onMenuToggle?: () => void;
}

interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: NavigationItem[];
  active?: boolean;
}

interface UserMenuProps {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
  items?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    divider?: boolean;
  }>;
}

const InstitutionalHeader: React.FC<InstitutionalHeaderProps> = ({
  className,
  logo,
  title = 'RioPorto P2P',
  navigation = [],
  userMenu,
  notifications = true,
  search = true,
  onMenuToggle
}) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  return (
    <header className={cn(
      'bg-card border-b border-border sticky top-0 z-50',
      'shadow-sm',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              {logo || (
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RP</span>
                </div>
              )}
              <h1 className="font-display text-xl font-semibold text-foreground hidden sm:block">
                {title}
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 ml-8">
              {navigation.map((item, index) => (
                <div key={index} className="relative group">
                  <button
                    className={cn(
                      'flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      item.active
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:text-primary hover:bg-muted'
                    )}
                    onClick={item.onClick}
                  >
                    <span>{item.label}</span>
                    {item.children && <ChevronDown className="h-4 w-4" />}
                  </button>

                  {/* Dropdown menu */}
                  {item.children && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        {item.children.map((child, childIndex) => (
                          <button
                            key={childIndex}
                            className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={child.onClick}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {search && (
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Notifications */}
            {notifications && (
              <button
                className="relative p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              </button>
            )}

            {/* User menu */}
            {userMenu && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  {userMenu.avatar ? (
                    <img
                      src={userMenu.avatar}
                      alt={userMenu.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-foreground">
                      {userMenu.name}
                    </div>
                    {userMenu.role && (
                      <div className="text-xs text-muted-foreground">
                        {userMenu.role}
                      </div>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4 text-foreground" />
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-56 bg-card border border-border rounded-md shadow-lg">
                    <div className="px-4 py-3 border-b border-border">
                      <div className="font-medium text-foreground">{userMenu.name}</div>
                      {userMenu.email && (
                        <div className="text-sm text-muted-foreground">{userMenu.email}</div>
                      )}
                    </div>
                    <div className="py-1">
                      {userMenu.items?.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.divider && <div className="border-t border-border my-1" />}
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={item.onClick}
                          >
                            {item.label}
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile search overlay */}
        {searchOpen && (
          <div className="lg:hidden border-t border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default InstitutionalHeader;