'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  variant?: 'default' | 'minimal' | 'contrast' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
  offset?: number;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

const variantClasses = {
  default: 'bg-gray-900 text-white border border-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-200',
  minimal: 'bg-white text-gray-900 border border-gray-200 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700',
  contrast: 'bg-black text-white border-0 dark:bg-white dark:text-black',
  ghost: 'bg-gray-50 text-gray-700 border border-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800'
};

const sizeClasses = {
  sm: 'text-xs px-2 py-1 max-w-xs',
  md: 'text-sm px-3 py-2 max-w-sm',
  lg: 'text-sm px-4 py-3 max-w-md'
};

export function DiscreteTooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  variant = 'default',
  size = 'sm',
  delay = 500,
  offset = 8,
  className,
  disabled = false,
  asChild = false
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let x = 0;
    let y = 0;

    // Calcular posição baseada no lado
    switch (side) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + offset;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'right':
        x = triggerRect.right + offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    // Ajustar para alinhamento
    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'start':
          x = triggerRect.left;
          break;
        case 'end':
          x = triggerRect.right - tooltipRect.width;
          break;
      }
    } else {
      switch (align) {
        case 'start':
          y = triggerRect.top;
          break;
        case 'end':
          y = triggerRect.bottom - tooltipRect.height;
          break;
      }
    }

    // Manter dentro da viewport
    x = Math.max(8, Math.min(x, viewport.width - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, viewport.height - tooltipRect.height - 8));

    setPosition({ x, y });
  };

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  const triggerProps = {
    ref: triggerRef,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    'aria-describedby': isVisible ? 'tooltip' : undefined
  };

  const trigger = asChild 
    ? React.cloneElement(children as React.ReactElement, triggerProps)
    : <span {...triggerProps}>{children}</span>;

  return (
    <>
      {trigger}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          className={cn(
            'fixed z-50 rounded-md font-medium pointer-events-none',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          style={{
            left: position.x,
            top: position.y
          }}
        >
          {content}
          
          {/* Seta do tooltip */}
          <div
            className={cn(
              'absolute w-2 h-2 rotate-45',
              variant === 'default' && 'bg-gray-900 border-gray-800 dark:bg-gray-100 dark:border-gray-200',
              variant === 'minimal' && 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700',
              variant === 'contrast' && 'bg-black dark:bg-white',
              variant === 'ghost' && 'bg-gray-50 border-gray-100 dark:bg-gray-900 dark:border-gray-800',
              side === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r',
              side === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2 border-t border-l',
              side === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2 border-t border-r',
              side === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2 border-b border-l'
            )}
          />
        </div>
      )}
    </>
  );
}

// Tooltip simples com texto
export function SimpleTooltip({
  children,
  text,
  ...props
}: Omit<TooltipProps, 'content'> & { text: string }) {
  return (
    <DiscreteTooltip content={text} {...props}>
      {children}
    </DiscreteTooltip>
  );
}

// Tooltip com título e descrição
export function RichTooltip({
  children,
  title,
  description,
  ...props
}: Omit<TooltipProps, 'content'> & { title: string; description?: string }) {
  const content = (
    <div className="space-y-1">
      <div className="font-semibold">{title}</div>
      {description && (
        <div className="text-xs opacity-75">{description}</div>
      )}
    </div>
  );

  return (
    <DiscreteTooltip content={content} size="md" {...props}>
      {children}
    </DiscreteTooltip>
  );
}

// Tooltip com ícone
export function IconTooltip({
  children,
  icon,
  text,
  ...props
}: Omit<TooltipProps, 'content'> & { icon: React.ReactNode; text: string }) {
  const content = (
    <div className="flex items-center gap-2">
      <span className="text-current">{icon}</span>
      <span>{text}</span>
    </div>
  );

  return (
    <DiscreteTooltip content={content} size="md" {...props}>
      {children}
    </DiscreteTooltip>
  );
}

// Hook para controlar tooltip programaticamente
export function useTooltip() {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<React.ReactNode>('');

  const show = (newContent: React.ReactNode) => {
    setContent(newContent);
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  const toggle = (newContent?: React.ReactNode) => {
    if (newContent) setContent(newContent);
    setIsVisible(!isVisible);
  };

  return {
    isVisible,
    content,
    show,
    hide,
    toggle
  };
}

// Provedor de tooltip global
export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="tooltip-provider">
      {children}
    </div>
  );
}

// Tooltip para elementos truncados
export function TruncatedTooltip({
  children,
  text,
  maxWidth = '200px',
  ...props
}: Omit<TooltipProps, 'content'> & { 
  text: string; 
  maxWidth?: string;
}) {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    }
  }, [text]);

  return (
    <DiscreteTooltip
      content={text}
      disabled={!isTruncated}
      {...props}
    >
      <span
        ref={textRef}
        className="truncate block"
        style={{ maxWidth }}
      >
        {text}
      </span>
    </DiscreteTooltip>
  );
}