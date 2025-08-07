// src/utils/errorHandler.ts

import { env } from 'cloudflare:workers';
import type { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { fromError } from 'zod-validation-error';

export const errorHandlerMiddleware = (err: unknown, c: Context) => {
  // Zod Validation Error
  if (err instanceof ZodError) {
    const formattedError = fromError(err);
    c.var.log.error(
      {
        err,
        issues: err.issues,
        path: c.req.path,
        method: c.req.method,
      },
      'Zod validation error'
    );
    c.status(StatusCodes.BAD_REQUEST);
    return c.json({
      type: 'ValidationError',
      message: formattedError.toString(), // Human-readable text
      issues: err.issues,
      userMessage: 'Invalid input. Please check the form and try again.',
      stack: env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }

  // Postgres (Drizzle) Error
  const drizzlePgError = extractPgError(err);
  if (drizzlePgError) {
    const pgCode = drizzlePgError.cause?.code;
    const pgDetail = drizzlePgError.cause?.detail;
    const constraint = drizzlePgError.cause?.constraint_name;
    let userMessage = 'A database error occurred.';

    // Friendly error messages per code (extendable)
    if (pgCode === '23505') {
      userMessage = 'This entry already exists.';
    }

    c.var.log.error(
      {
        err: drizzlePgError,
        code: pgCode,
        detail: pgDetail,
        constraint,
        path: c.req.path,
        method: c.req.method,
      },
      'Postgres (Drizzle) error'
    );

    c.status(StatusCodes.BAD_REQUEST);
    return c.json({
      type: 'DatabaseError',
      message: drizzlePgError.message || 'Database error',
      userMessage,
      detail: pgDetail,
      constraint: drizzlePgError.cause?.constraint_name,
      stack: env.NODE_ENV !== 'production' ? drizzlePgError.stack : undefined,
    });
  }

  c.var.log.error(
    {
      err,
      path: c.req.path,
      method: c.req.method,
    },
    'Unhandled internal server error'
  );

  // Generic / Unknown Error
  c.status(StatusCodes.INTERNAL_SERVER_ERROR);
  return c.json({
    type: 'InternalError',
    message: (err as Error)?.message || 'Something went wrong',
    userMessage: 'Something went wrong. Please try again later.',
    stack: env.NODE_ENV !== 'production' ? (err as Error).stack : undefined,
  });
};

const extractPgError = (err: any) => {
  if (
    err &&
    typeof err === 'object' &&
    err.name === 'Error' &&
    err.cause &&
    typeof err.cause === 'object' &&
    err.cause.name === 'PostgresError'
  ) {
    return err;
  }
  return null;
};
