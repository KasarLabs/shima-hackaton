import { Request, Response } from 'express';
import { Dapp, getAllDapps, getDappByUserId, createDapp, updateDapp, deleteDapp } from '../models/dapp.model';

// Get all dapps
export const getAllDappsController = async (req: Request, res: Response) => {
  try {
    const dapps = await getAllDapps();
    res.status(200).json(dapps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching dapps.' });
  }
};

// Get dapp by user ID
export const getDappByUserIdController = async (req: Request, res: Response) => {
  const userId = Number(req.params.user_id);
  try {
    const dapp = await getDappByUserId(userId);
    res.status(200).json(dapp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while fetching dapp with user ID ${userId}.` });
  }
};

// Create dapp
export const createDappController = async (req: Request, res: Response) => {
  const dapp: Dapp = req.body;
  try {
    const createdDapp = await createDapp(dapp);
    res.status(201).json(createdDapp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating dapp.' });
  }
};

// Update dapp
export const updateDappController = async (req: Request, res: Response) => {
  const userId = Number(req.params.user_id);
  const dapp: Dapp = req.body;
  try {
    const updatedDapp = await updateDapp(userId, dapp);
    res.status(200).json(updatedDapp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while updating dapp with user ID ${userId}.` });
  }
};

// Delete dapp
export const deleteDappController = async (req: Request, res: Response) => {
  const userId = Number(req.params.user_id);
  try {
    await deleteDapp(userId);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while deleting dapp with user ID ${userId}.` });
  }
};
