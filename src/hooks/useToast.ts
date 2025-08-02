import React from 'react';

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  duration?: number;
  action?: React.ReactNode;
}

export interface ToastState {
  toasts: ToastItem[];
}

type ToastAction = 
  | { type: 'ADD_TOAST'; toast: ToastItem }
  | { type: 'REMOVE_TOAST'; id: string };

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.id),
      };
    default:
      return state;
  }
};

/**
 * Hook for managing toast notifications
 * 
 * @example
 * ```tsx
 * const { toasts, toast, success, error, dismiss } = useToast();
 * 
 * const handleSuccess = () => {
 *   success('Operation completed successfully!');
 * };
 * ```
 */
export function useToast() {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] });

  const addToast = React.useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    };

    dispatch({ type: 'ADD_TOAST', toast: newToast });

    // Auto dismiss
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', id });
      }, newToast.duration);
    }

    return id;
  }, []);

  const dismiss = React.useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', id });
  }, []);

  const toast = React.useCallback((props: Omit<ToastItem, 'id'>) => {
    return addToast(props);
  }, [addToast]);

  const success = React.useCallback((message: string, options?: Partial<ToastItem>) => {
    return addToast({
      ...options,
      title: options?.title || 'Success',
      description: message,
      variant: 'success',
    });
  }, [addToast]);

  const error = React.useCallback((message: string, options?: Partial<ToastItem>) => {
    return addToast({
      ...options,
      title: options?.title || 'Error',
      description: message,
      variant: 'error',
    });
  }, [addToast]);

  const warning = React.useCallback((message: string, options?: Partial<ToastItem>) => {
    return addToast({
      ...options,
      title: options?.title || 'Warning',
      description: message,
      variant: 'warning',
    });
  }, [addToast]);

  const info = React.useCallback((message: string, options?: Partial<ToastItem>) => {
    return addToast({
      ...options,
      title: options?.title || 'Info',
      description: message,
      variant: 'info',
    });
  }, [addToast]);

  return {
    toasts: state.toasts,
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
  };
}