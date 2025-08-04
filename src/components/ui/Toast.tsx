import React from 'react';

interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  className = ''
}) => {
  return (
    <div className={`toast toast-${type} ${className}`}>
      <div className="toast-content">
        <span className="toast-message">{message}</span>
        {onClose && (
          <button 
            className="toast-close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};
