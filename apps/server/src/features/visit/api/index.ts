import { Hono } from 'hono';
import { createVisitHandler } from './create';
import { deleteVisitHandler } from './delete';
import { getAllVisitHandler, getVisitHandler } from './get';

const router = new Hono();

router.post('/', createVisitHandler);

router.get('/', getAllVisitHandler);

router.get('/:id', getVisitHandler);

router.delete('/:id', deleteVisitHandler);

export { router as visitRouter };
