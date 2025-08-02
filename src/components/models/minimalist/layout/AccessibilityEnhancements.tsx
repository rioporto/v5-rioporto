'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Hook para navegação por teclado
export function useKeyboardNavigation(
  refs: React.RefObject<HTMLElement>[],
  options?: {
    loop?: boolean;
    direction?: 'horizontal' | 'vertical' | 'both';
    onEscape?: () => void;
  }
) {
  const { loop = true, direction = 'both', onEscape } = options || {};
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      const isHorizontal = direction === 'horizontal' || direction === 'both';
      const isVertical = direction === 'vertical' || direction === 'both';

      let nextIndex = focusedIndex;

      if ((key === 'ArrowRight' && isHorizontal) || (key === 'ArrowDown' && isVertical)) {
        event.preventDefault();
        nextIndex = focusedIndex + 1;
        if (nextIndex >= refs.length) {
          nextIndex = loop ? 0 : refs.length - 1;
        }
      } else if ((key === 'ArrowLeft' && isHorizontal) || (key === 'ArrowUp' && isVertical)) {
        event.preventDefault();
        nextIndex = focusedIndex - 1;
        if (nextIndex < 0) {
          nextIndex = loop ? refs.length - 1 : 0;
        }
      } else if (key === 'Home') {
        event.preventDefault();
        nextIndex = 0;
      } else if (key === 'End') {
        event.preventDefault();
        nextIndex = refs.length - 1;
      }

      if (nextIndex !== focusedIndex && refs[nextIndex]?.current) {
        setFocusedIndex(nextIndex);
        refs[nextIndex].current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, refs, loop, direction, onEscape]);

  return { focusedIndex, setFocusedIndex };
}

// Hook para detecção de foco apenas via teclado
export function useKeyboardFocusOnly() {
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setIsKeyboardFocus(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardFocus(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isKeyboardFocus;
}

// Componente de region com landmark
export function AccessibleRegion({
  children,
  label,
  role = 'region',
  className,
  ...props
}: {
  children: React.ReactNode;
  label: string;
  role?: string;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      role={role}
      aria-label={label}
      className={className}
      {...props}
    >
      {children}
    </section>
  );
}

// Componente de skip link
export function SkipLink({
  href = '#main-content',
  children = 'Pular para conteúdo principal',
  className
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2',
        'bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium',
        'z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
    >
      {children}
    </a>
  );
}

// Componente de anúncio para screen readers
export function ScreenReaderAnnouncement({
  message,
  priority = 'polite'
}: {
  message: string;
  priority?: 'polite' | 'assertive';
}) {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      const timer = setTimeout(() => setAnnouncement(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}

// Hook para anúncios de screen reader
export function useScreenReaderAnnouncement() {
  const [message, setMessage] = useState('');

  const announce = (text: string) => {
    setMessage(text);
  };

  return {
    announce,
    ScreenReaderAnnouncement: () => (
      <ScreenReaderAnnouncement message={message} />
    )
  };
}

// Componente de modal acessível
export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  initialFocusRef,
  finalFocusRef
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  finalFocusRef?: React.RefObject<HTMLElement>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focar elemento inicial ou primeiro focável
      setTimeout(() => {
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus();
        } else {
          const firstFocusable = modalRef.current?.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          firstFocusable?.focus();
        }
      }, 0);
    } else {
      // Restaurar foco
      const focusElement = finalFocusRef?.current || previousFocusRef.current;
      focusElement?.focus();
    }
  }, [isOpen, initialFocusRef, finalFocusRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }

      // Trap focus
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeOnOutsideClick ? onClose : undefined}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          'bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 id="modal-title" className="text-lg font-semibold mb-4">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}

// Componente de controle de alto contraste
export function HighContrastToggle({
  className
}: {
  className?: string;
}) {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('high-contrast');
    if (stored) {
      setHighContrast(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-high-contrast',
      highContrast.toString()
    );
    localStorage.setItem('high-contrast', JSON.stringify(highContrast));
  }, [highContrast]);

  return (
    <button
      onClick={() => setHighContrast(!highContrast)}
      className={cn(
        'p-2 rounded-md border border-gray-300 dark:border-gray-600',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        className
      )}
      aria-label={`${highContrast ? 'Desativar' : 'Ativar'} alto contraste`}
      aria-pressed={highContrast}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </button>
  );
}

// Componente de controle de tamanho de fonte
export function FontSizeControl({
  className
}: {
  className?: string;
}) {
  const [fontSize, setFontSize] = useState('medium');

  const fontSizes = {
    small: { label: 'Pequeno', scale: '0.875' },
    medium: { label: 'Médio', scale: '1' },
    large: { label: 'Grande', scale: '1.125' },
    xlarge: { label: 'Muito Grande', scale: '1.25' }
  };

  useEffect(() => {
    const stored = localStorage.getItem('font-size');
    if (stored && stored in fontSizes) {
      setFontSize(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${parseFloat(fontSizes[fontSize as keyof typeof fontSizes].scale)}rem`;
    localStorage.setItem('font-size', fontSize);
  }, [fontSize]);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <label htmlFor="font-size-select" className="text-sm font-medium">
        Tamanho da fonte:
      </label>
      <select
        id="font-size-select"
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
        className={cn(
          'px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md',
          'bg-white dark:bg-gray-800 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500'
        )}
      >
        {Object.entries(fontSizes).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Hook para detecção de preferências de movimento reduzido
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Componente wrapper que respeita preferências de movimento
export function MotionWrapper({
  children,
  fallback,
  className
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion && fallback) {
    return <div className={className}>{fallback}</div>;
  }

  return <div className={className}>{children}</div>;
}

// Hook para validação de contraste de cores
export function useContrastChecker() {
  const checkContrast = (
    foreground: string,
    background: string,
    level: 'AA' | 'AAA' = 'AA'
  ): boolean => {
    // Implementação simplificada - em produção, use uma biblioteca específica
    const getLuminance = (color: string): number => {
      // Converter hex para RGB e calcular luminância
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      const [rs, gs, bs] = [r, g, b].map(c => 
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      );
      
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    
    return level === 'AA' ? contrast >= 4.5 : contrast >= 7;
  };

  return { checkContrast };
}