/**
 * Logger utility para desenvolvimento
 * Em produção, todos os logs são desabilitados automaticamente
 */

const isDevelopment = process.env.NODE_ENV === 'development';

// Salva as referências originais
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

// Logger customizado que só funciona em desenvolvimento
export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      originalConsole.log('[LOG]', ...args);
    }
  },
  
  error: (...args: any[]) => {
    // Erros sempre são logados, mas com controle
    if (isDevelopment) {
      originalConsole.error('[ERROR]', ...args);
    } else {
      // Em produção, poderia enviar para serviço de monitoramento
      originalConsole.error(...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (isDevelopment) {
      originalConsole.warn('[WARN]', ...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDevelopment) {
      originalConsole.info('[INFO]', ...args);
    }
  },
  
  debug: (...args: any[]) => {
    if (isDevelopment) {
      originalConsole.debug('[DEBUG]', ...args);
    }
  },
  
  // Método para logs sensíveis que NUNCA devem aparecer em produção
  dev: (...args: any[]) => {
    if (isDevelopment) {
      originalConsole.log('[DEV-ONLY]', ...args);
    }
  }
};

// Sobrescreve console global em produção (opcional)
if (!isDevelopment && typeof window === 'undefined') {
  // Apenas no servidor em produção
  console.log = () => {};
  console.info = () => {};
  console.debug = () => {};
  console.warn = () => {};
  // Mantém console.error para debugging crítico
}

// Hook para usar em componentes React
export function useLogger(componentName: string) {
  return {
    log: (...args: any[]) => logger.log(`[${componentName}]`, ...args),
    error: (...args: any[]) => logger.error(`[${componentName}]`, ...args),
    warn: (...args: any[]) => logger.warn(`[${componentName}]`, ...args),
    info: (...args: any[]) => logger.info(`[${componentName}]`, ...args),
    debug: (...args: any[]) => logger.debug(`[${componentName}]`, ...args),
  };
}

export default logger;