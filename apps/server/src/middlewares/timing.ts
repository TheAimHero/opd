import type { MiddlewareHandler } from 'hono';

export const randomDelayMiddleware = (
  min = 100,
  max = 1000
): MiddlewareHandler => {
  return async (_c, next) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise((resolve) => setTimeout(resolve, delay));
    await next();
  };
};
