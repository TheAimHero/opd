import { Hono } from 'hono';
import { createDataHandler } from './create';
import { getAllDataHandler, getDataHandler } from './get';

const router = new Hono();

router.post('/', createDataHandler);

router.get('/', getAllDataHandler);

router.get('/:id', getDataHandler);

export { router as dataRouter };
