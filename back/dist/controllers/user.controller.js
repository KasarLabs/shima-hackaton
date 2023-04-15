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
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getAllUsersController = void 0;
const user_model_1 = require("../models/user.model");
// Get all users
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_model_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
});
exports.getAllUsersController = getAllUsersController;
// Get user by ID
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    try {
        const user = yield (0, user_model_1.getUserById)(userId);
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred while fetching user with ID ${userId}.` });
    }
});
exports.getUserByIdController = getUserByIdController;
// Create user
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const createdUser = yield (0, user_model_1.createUser)(user);
        res.status(201).json(createdUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating user.' });
    }
});
exports.createUserController = createUserController;
// Update user
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    const user = req.body;
    try {
        const updatedUser = yield (0, user_model_1.updateUser)(userId, user);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred while updating user with ID ${userId}.` });
    }
});
exports.updateUserController = updateUserController;
// Delete user
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    try {
        yield (0, user_model_1.deleteUser)(userId);
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred while deleting user with ID ${userId}.` });
    }
});
exports.deleteUserController = deleteUserController;
