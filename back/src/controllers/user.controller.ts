import { Request, Response } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, User } from '../models/user.model';

// Get all users
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
};

// Get user by ID
export const getUserByIdController = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  try {
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while fetching user with ID ${userId}.` });
  }
};

// Create user
export const createUserController = async (req: Request, res: Response) => {
  const user: User = req.body;
  try {
    const createdUser = await createUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating user.' });
  }
};

// Update user
export const updateUserController = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const user: User = req.body;
  try {
    const updatedUser = await updateUser(userId, user);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while updating user with ID ${userId}.` });
  }
};

// Delete user
export const deleteUserController = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  try {
    await deleteUser(userId);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while deleting user with ID ${userId}.` });
  }
};
