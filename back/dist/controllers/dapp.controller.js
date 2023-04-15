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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDappController = exports.updateDappController = exports.createDappController = exports.getDappByUserIdController = exports.getAllDappsController = void 0;
const dapp_model_1 = require("../models/dapp.model");
// Get all dapps
const getAllDappsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dapps = yield (0, dapp_model_1.getAllDapps)();
        res.status(200).json(dapps);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching dapps.' });
    }
});
exports.getAllDappsController = getAllDappsController;
// Get dapp by user ID
const getDappByUserIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.user_id);
    try {
        const dapp = yield (0, dapp_model_1.getDappByUserId)(userId);
        res.status(200).json(dapp);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred while fetching dapp with user ID ${userId}.` });
    }
});
exports.getDappByUserIdController = getDappByUserIdController;
// Create dapp
const createDappController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dapp = req.body;
    try {
        const createdDapp = yield (0, dapp_model_1.createDapp)(dapp);
        res.status(201).json(createdDapp);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating dapp.' });
    }
});
exports.createDappController = createDappController;
// Update dapp
const updateDappController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.user_id);
    const dapp = req.body;
    try {
        const updatedDapp = yield (0, dapp_model_1.updateDapp)(userId, dapp);
        res.status(200).json(updatedDapp);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred while updating dapp with user ID ${userId}.` });
    }
});
exports.updateDappController = updateDappController;
// Delete dapp
const deleteDappController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.user_id);
    try {
        yield (0, dapp_model_1.deleteDapp)(userId);
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred while deleting dapp with user ID ${userId}.` });
    }
});
exports.deleteDappController = deleteDappController;
