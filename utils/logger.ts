type LogLevel = 'info' | 'warn' | 'error';

function log(level: LogLevel, message: string, ...args: unknown[]): void {
  const timestamp = new Date().toISOString();
  // eslint-disable-next-line no-console
  console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`, ...args);
}

export const logger = {
  info: (message: string, ...args: unknown[]): void => log('info', message, ...args),
  warn: (message: string, ...args: unknown[]): void => log('warn', message, ...args),
  error: (message: string, ...args: unknown[]): void => log('error', message, ...args),
};
