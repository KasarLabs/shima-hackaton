import { Router } from 'express';
import { getAllProvidersController, getProviderByIdController, createProviderController, updateProviderController, deleteProviderController, getNextProviderController, rankProvidersController, rpcRequest, getProvidersByChainIdController } from '../controllers/provider.controller';

const router = Router();

router.get('/providers', getAllProvidersController);
router.get('/providers/:id', getProviderByIdController);
router.post('/providers', createProviderController);
router.put('/providers/:id', updateProviderController);
router.delete('/providers/:id', deleteProviderController);
router.get('/next-provider', getNextProviderController);
router.get('/rank-providers', rankProvidersController);
router.post('/:chainId/:key', rpcRequest)
router.get('/providers/:chainId', getProvidersByChainIdController);
export default router;

