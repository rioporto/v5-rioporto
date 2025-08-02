'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface NotificationProps {
  id?: string;
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  variant?: 'toast' | 'banner' | 'inline' | 'minimal';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  duration?: number;
  persistent?: boolean;
  dismissible?: boolean;
  showIcon?: boolean;
  showProgress?: boolean;
  onDismiss?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

const typeStyles = {
  info: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    classes: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200'
  },
  success: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    classes: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
  },
  warning: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.598 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    classes: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200'
  },
  error: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    classes: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
  }
};

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
};

const variantStyles = {
  toast: 'rounded-lg shadow-lg border backdrop-blur-sm',
  banner: 'rounded-none border-l-4 border-y-0 border-r-0',
  inline: 'rounded-md border',
  minimal: 'rounded border-0 bg-transparent'
};

export function SubtleNotification({
  id,
  title,
  message,
  type = 'info',
  variant = 'toast',
  position = 'top-right',
  duration = 5000,
  persistent = false,
  dismissible = true,
  showIcon = true,
  showProgress = false,
  onDismiss,
  onAction,
  actionLabel,
  className
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(), 300);
  }, [onDismiss]);

  useEffect(() => {
    if (!persistent && duration > 0) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const decrement = 100 / (duration / 100);
          return Math.max(0, prev - decrement);
        });
      }, 100);

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [duration, persistent, handleDismiss]);

  if (!isVisible) return null;

  const typeStyle = typeStyles[type];

  return (
    <div
      className={cn(
        'relative max-w-sm p-4 transition-all duration-300',
        'animate-in slide-in-from-top-2 fade-in-0',
        !isVisible && 'animate-out slide-out-to-top-2 fade-out-0',
        variant === 'toast' && 'fixed z-50',
        variant === 'toast' && positionClasses[position],
        variantStyles[variant],
        variant !== 'minimal' && typeStyle.classes,
        variant === 'minimal' && `text-${type === 'info' ? 'blue' : type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'red'}-600 dark:text-${type === 'info' ? 'blue' : type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'red'}-400`,
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {showIcon && (
          <div className="flex-shrink-0 mt-0.5">
            {typeStyle.icon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-medium mb-1">{title}</h4>
          )}
          <p className="text-sm opacity-90">{message}</p>
          
          {(actionLabel || dismissible) && (
            <div className="flex items-center gap-2 mt-3">
              {actionLabel && onAction && (
                <button
                  onClick={onAction}
                  className="text-xs font-medium hover:underline focus:outline-none focus:underline"
                >
                  {actionLabel}
                </button>
              )}
              
              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="text-xs opacity-60 hover:opacity-80 transition-opacity focus:outline-none focus:opacity-80"
                >
                  Dispensar
                </button>
              )}
            </div>
          )}
        </div>
        
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 opacity-60 hover:opacity-80 transition-opacity focus:outline-none focus:opacity-80"
            aria-label="Fechar notificação"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {showProgress && !persistent && duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 rounded-b">
          <div
            className="h-full bg-current opacity-30 transition-all duration-100 ease-linear rounded-b"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

// Componente de lista de notificações
export function NotificationList({
  notifications,
  maxVisible = 5,
  position = 'top-right',
  className
}: {
  notifications: NotificationProps[];
  maxVisible?: number;
  position?: NotificationProps['position'];
  className?: string;
}) {
  const visibleNotifications = notifications.slice(0, maxVisible);

  return (
    <div
      className={cn(
        'fixed z-50 space-y-2',
        positionClasses[position!],
        className
      )}
    >
      {visibleNotifications.map((notification, index) => (
        <SubtleNotification
          key={notification.id || index}
          {...notification}
          variant="toast"
          position={position}
        />
      ))}
    </div>
  );
}

// Hook para gerenciar notificações
export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationProps, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Funções de conveniência
  const success = useCallback((message: string, options?: Partial<NotificationProps>) => {
    return addNotification({ message, type: 'success', ...options });
  }, [addNotification]);

  const error = useCallback((message: string, options?: Partial<NotificationProps>) => {
    return addNotification({ message, type: 'error', ...options });
  }, [addNotification]);

  const warning = useCallback((message: string, options?: Partial<NotificationProps>) => {
    return addNotification({ message, type: 'warning', ...options });
  }, [addNotification]);

  const info = useCallback((message: string, options?: Partial<NotificationProps>) => {
    return addNotification({ message, type: 'info', ...options });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };
}

// Notificação inline simples
export function InlineNotification({
  message,
  type = 'info',
  dismissible = true,
  onDismiss,
  className
}: {
  message: string;
  type?: NotificationProps['type'];
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <SubtleNotification
      message={message}
      type={type}
      variant="inline"
      dismissible={dismissible}
      onDismiss={handleDismiss}
      persistent
      className={className}
    />
  );
}

// Banner de notificação
export function NotificationBanner({
  message,
  type = 'info',
  action,
  onAction,
  onDismiss,
  className
}: {
  message: string;
  type?: NotificationProps['type'];
  action?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}) {
  return (
    <SubtleNotification
      message={message}
      type={type}
      variant="banner"
      actionLabel={action}
      onAction={onAction}
      onDismiss={onDismiss}
      persistent
      className={cn('w-full rounded-none', className)}
    />
  );
}