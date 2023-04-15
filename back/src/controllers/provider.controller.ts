import { Request, Response } from 'express';
import axios from 'axios';
import {
    Provider,
    getAllProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider,
    getProvidersByChainId,
} from '../models/provider.model';
import { getUserByKey, updateUser } from '../models/user.model';
import { getNextProvider, rankRPCs } from '../utils/utils';

// Get all providers
export const getAllProvidersController = async (req: Request, res: Response) => {
    try {
        const providers = await getAllProviders();
        res.status(200).json(providers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching providers.' });
    }
};

// Get a provider by ID
export const getProviderByIdController = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const provider = await getProviderById(id);
        res.status(200).json(provider);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: `Provider with ID ${id} not found.` });
    }
};

// Create a new provider
export const createProviderController = async (req: Request, res: Response) => {
    const data: Provider = req.body;
    try {
        const provider = await createProvider(data);
        res.status(201).json(provider);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the provider.' });
    }
};

// Update a provider
export const updateProviderController = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data: Provider = req.body;
    try {
        const provider = await updateProvider(id, data);
        res.status(200).json(provider);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: `Provider with ID ${id} not found.` });
    }
};

// Delete a provider
export const deleteProviderController = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await deleteProvider(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: `Provider with ID ${id} not found.` });
    }
};

// Get the next provider based on performance score
export const getNextProviderController = async (req: Request, res: Response) => {
    try {
        const providers = await getAllProviders();
        const nextProvider = getNextProvider(providers);
        res.status(200).json(nextProvider);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the next provider.' });
    }
};

// Rank providers based on ping time
export const rankProvidersController = async (req: Request, res: Response) => {
    try {
        const providers = await getAllProviders();
        const rankedProviders = await rankRPCs(providers);
        res.status(200).json(rankedProviders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while ranking providers.' });
    }
};

export const rpcRequest = async (req: Request, res: Response) => {
    try {
        const userKey = req.params.key;
        const chainId = req.params.chainId;
        // Check if the user key exists in the database
        const user = await getUserByKey(userKey);
        if (!user) {
            return res.status(401).json({ error: 'Invalid user key' });
        }

        // Get the list of providers from the database or cache
        const providers = await getProvidersByChainId(chainId);

        // Get the next provider using the weighted round-robin algorithm
        const provider = getNextProvider(providers);

        if (!provider) {
            return res.status(500).json({ error: 'No provider available' });
        }

        // update rpc and user computation units
        provider.computation_units += 1;
        await updateProvider(provider.id, provider);
        user.computation_units += 1;
        await updateUser(user.id, user);

        // Forward the RPC request to the selected provider
        const response = await axios.post(provider.rpc_url, req.body);

        // Return the RPC response back to the user
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the RPC request.' });
    }
};


export const getProvidersByChainIdController = async (req: Request, res: Response) => {
    const chainId = req.params.chainId;
    try {
        const providers = await getProvidersByChainId(chainId);
        res.status(200).json(providers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred while fetching providers for chain ID ${chainId}.` });
    }
};
