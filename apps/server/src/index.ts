import { env } from 'cloudflare:workers';
import { auth } from './lib/auth';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { honoRpcRouter } from './oprc/router';
import { patientRouter } from './features/patient/api';
import { dataRouter } from './features/data/api';
import { medicineRouter } from './features/medicine/api';
import { surgeryRouter } from './features/surgery/api';
import { testRouter } from './features/test/api';
import { visitRouter } from './features/visit/api';
import { randomDelayMiddleware } from './middlewares/timing';
import { secureHeaders } from 'hono/secure-headers';

const app = new Hono({ strict: false });

app.use(logger());
app.use(secureHeaders());

app.use(randomDelayMiddleware(100, 300));

app.use(
  cors({
    origin: env.CORS_ORIGIN || '',
    allowMethods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

app.use('/rpc/*', honoRpcRouter);

app.route('/patient', patientRouter);
app.route('/data', dataRouter);
app.route('/medicine', medicineRouter);
app.route('/surgery', surgeryRouter);
app.route('/test', testRouter);
app.route('/visit', visitRouter);

app.get('/checkhealth', (c) => {
  return c.text('OK');
});

// app.onError(errorHandlerMiddleware);

export default app;
