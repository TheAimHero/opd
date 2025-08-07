import { Hono } from 'hono';
import { createSurgeryHandler } from './create';
import { getAllSurgeryHandler, getSurgeryHandler } from './get';

const router = new Hono();

router.post('/', createSurgeryHandler);

router.get('/', getAllSurgeryHandler);

router.get('/:id', getSurgeryHandler);

export { router as surgeryRouter };
