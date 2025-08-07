import { Hono } from 'hono';
import { createMedicineHandler } from './create';
import { deleteMedicineHandler } from './delete';
import { getAllMedicineHandler, getMedicineHandler } from './get';

const router = new Hono();

router.post('/', createMedicineHandler);

router.get('/', getAllMedicineHandler);

router.get('/:id', getMedicineHandler);

router.delete('/:id', deleteMedicineHandler);

export { router as medicineRouter };
