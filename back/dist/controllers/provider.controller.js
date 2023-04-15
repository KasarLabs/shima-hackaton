"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvidersByChainIdController = exports.rpcRequest = exports.rankProvidersController = exports.getNextProviderController = exports.deleteProviderController = exports.updateProviderController = exports.createProviderController = exports.getProviderByIdController = exports.getAllProvidersController = void 0;
const axios_1 = __importDefault(require("axios"));
const provider_model_1 = require("../models/provider.model");
const user_model_1 = require("../models/user.model");
const utils_1 = require("../utils/utils");
// Get all providers
const getAllProvidersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providers = yield (0, provider_model_1.getAllProviders)();
        res.status(200).json(providers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching providers.' });
    }
});
exports.getAllProvidersController = getAllProvidersController;
// Get a provider by ID
const getProviderByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const provider = yield (0, provider_model_1.getProviderById)(id);
        res.status(200).json(provider);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: `Provider with ID ${id} not found.` });
    }
});
exports.getProviderByIdController = getProviderByIdController;
// Create a new provider
const createProviderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const provider = yield (0, provider_model_1.createProvider)(data);
        res.status(201).json(provider);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the provider.' });
    }
});
exports.createProviderController = createProviderController;
// Update a provider
const updateProviderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const data = req.body;
    try {
        const provider = yield (0, provider_model_1.updateProvider)(id, data);
        res.status(200).json(provider);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: `Provider with ID ${id} not found.` });
    }
});
exports.updateProviderController = updateProviderController;
// Delete a provider
const deleteProviderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield (0, provider_model_1.deleteProvider)(id);
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: `Provider with ID ${id} not found.` });
    }
});
exports.deleteProviderController = deleteProviderController;
// Get the next provider based on performance score
const getNextProviderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providers = yield (0, provider_model_1.getAllProviders)();
        const nextProvider = (0, utils_1.getNextProvider)(providers);
        res.status(200).json(nextProvider);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the next provider.' });
    }
});
exports.getNextProviderController = getNextProviderController;
// Rank providers based on ping time
const rankProvidersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providers = yield (0, provider_model_1.getAllProviders)();
        const rankedProviders = yield (0, utils_1.rankRPCs)(providers);
        res.status(200).json(rankedProviders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while ranking providers.' });
    }
});
exports.rankProvidersController = rankProvidersController;
const rpcRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userKey = req.params.key;
        const chainId = req.params.chainId;
        // Check if the user key exists in the database
        const user = yield (0, user_model_1.getUserByKey)(userKey);
        if (!user) {
            return res.status(401).json({ error: 'Invalid user key' });
        }
        // Get the list of providers from the database or cache
        const providers = yield (0, provider_model_1.getProvidersByChainId)(chainId);
        // Get the next provider using the weighted round-robin algorithm
        const provider = (0, utils_1.getNextProvider)(providers);
        if (!provider) {
            return res.status(500).json({ error: 'No provider available' });
        }
        // update rpc and user computation units
        provider.computation_units += 1;
        yield (0, provider_model_1.updateProvider)(provider.id, provider);
        user.computation_units += 1;
        yield (0, user_model_1.updateUser)(user.id, user);
        // Forward the RPC request to the selected provider
        const response = yield axios_1.default.post(provider.rpc_url, req.body);
        // Return the RPC response back to the user
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the RPC request.' });
    }
});
exports.rpcRequest = rpcRequest;
const getProvidersByChainIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chainId = req.params.chainId;
    try {
        const providers = yield (0, provider_model_1.getProvidersByChainId)(chainId);
        res.status(200).json(providers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred while fetching providers for chain ID ${chainId}.` });
    }
});
exports.getProvidersByChainIdController = getProvidersByChainIdController;
