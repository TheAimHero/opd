import { Hono } from 'hono';
import { createPatientHandler } from './create';
import { getAllPatientHandler, getPatientHandler } from './get';
import { patchPatientHandler } from './patch';

const router = new Hono();

router.post('/', createPatientHandler);

router.patch('/', patchPatientHandler);

router.get('/', getAllPatientHandler);

router.get('/:id', getPatientHandler);

export { router as patientRouter };
