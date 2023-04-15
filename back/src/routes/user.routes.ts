import { Router } from 'express';
import { getAllUsersController, getUserByIdController, createUserController, updateUserController, deleteUserController } from '../controllers/user.controller';

const router = Router();

router.get('/users', getAllUsersController);
router.get('/users/:id', getUserByIdController);
router.post('/users', createUserController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

export default router;
