"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByKey = exports.getUserByWalletAddress = exports.getUserById = exports.getAllUsers = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Function to retrieve all users
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('SELECT * FROM schema_owner.users', [], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
};
exports.getAllUsers = getAllUsers;
// Function to retrieve a user by ID
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('SELECT * FROM schema_owner.users WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length === 0) {
                throw new Error(`User with ID ${id} not found`);
            }
            resolve(results.rows[0]);
        });
    });
};
exports.getUserById = getUserById;
const getUserByWalletAddress = (wallet_address) => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('SELECT * FROM schema_owner.users WHERE wallet_address = $1', [wallet_address], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length === 0) {
                throw new Error(`User with wallet_address ${wallet_address} not found`);
            }
            resolve(results.rows[0]);
        });
    });
};
exports.getUserByWalletAddress = getUserByWalletAddress;
const getUserByKey = (key) => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('SELECT * FROM schema_owner.users WHERE key = $1', [key], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length === 0) {
                resolve(null);
            }
            else {
                resolve(results.rows[0]);
            }
        });
    });
};
exports.getUserByKey = getUserByKey;
// Function to create a user
const createUser = (user) => {
    const { wallet_address, key, computation_units } = user;
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('INSERT INTO schema_owner.users (wallet_address, key, computation_units) VALUES ($1, $2, $3) RETURNING *', [wallet_address, key, computation_units], (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results.rows[0]);
            }
        });
    });
};
exports.createUser = createUser;
// Function to update a user
const updateUser = (id, user) => {
    const { wallet_address, key, computation_units } = user;
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('UPDATE schema_owner.users SET wallet_address = $1, key = $2, computation_units = $3 WHERE id = $4 RETURNING *', [wallet_address, key, computation_units, id], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length === 0) {
                throw new Error(`User with ID ${id} not found`);
            }
            else {
                resolve(results.rows[0]);
            }
        });
    });
};
exports.updateUser = updateUser;
// Function to delete a user
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('DELETE FROM schema_owner.users WHERE id = $1', [id], (error) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });
};
exports.deleteUser = deleteUser;
