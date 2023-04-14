import { Router } from 'express';
import { getAllDappsController, getDappByUserIdController, createDappController, updateDappController, deleteDappController } from '../controllers/dapp.controller';

const router = Router();

router.get('/dapps', getAllDappsController);
router.get('/dapps/:user_id', getDappByUserIdController);
router.post('/dapps', createDappController);
router.put('/dapps/:user_id', updateDappController);
router.delete('/dapps/:user_id', deleteDappController);

export default router;
