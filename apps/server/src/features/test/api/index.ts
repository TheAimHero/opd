import { Hono } from 'hono';
import { createTestHandler } from './create';
import { deleteTestHandler } from './delete';
import { getAllTestHandler, getTestHandler } from './get';

const router = new Hono();

router.post('/', createTestHandler);

router.get('/', getAllTestHandler);

router.get('/:id', getTestHandler);

router.delete('/:id', deleteTestHandler);

export { router as testRouter };
