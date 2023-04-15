"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvidersByChainId = exports.deleteProvider = exports.updateProvider = exports.createProvider = exports.getProviderById = exports.getAllProviders = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Function to get all providers
const getAllProviders = () => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('SELECT * FROM schema_owner.providers', [], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result.rows);
            }
        });
    });
};
exports.getAllProviders = getAllProviders;
// Function to get a provider by ID
const getProviderById = (id) => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('SELECT * FROM schema_owner.providers WHERE id = $1', [id], (err, result) => {
            if (err) {
                reject(err);
            }
            else if (result.rowCount === 0) {
                reject(`Provider with ID ${id} not found.`);
            }
            else {
                resolve(result.rows[0]);
            }
        });
    });
};
exports.getProviderById = getProviderById;
// Function to create a new provider
const createProvider = (data) => {
    const { rpc_url, chain_id, performance_score, computation_units } = data;
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('INSERT INTO schema_owner.providers (rpc_url, chain_id, performance_score, computation_units) VALUES ($1, $2, $3, $4) RETURNING *', [rpc_url, chain_id, performance_score, computation_units], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result.rows[0]);
            }
        });
    });
};
exports.createProvider = createProvider;
// Function to update a provider
const updateProvider = (id, data) => {
    const { rpc_url, chain_id, performance_score, computation_units } = data;
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('UPDATE schema_owner.providers SET rpc_url = $1, chain_id = $2, performance_score = $3, computation_units = $4 WHERE id = $5 RETURNING *', [rpc_url, chain_id, performance_score, computation_units, id], (err, result) => {
            if (err) {
                reject(err);
            }
            else if (result.rowCount === 0) {
                reject(`Provider with ID ${id} not found.`);
            }
            else {
                resolve(result.rows[0]);
            }
        });
    });
};
exports.updateProvider = updateProvider;
// Function to delete a provider
const deleteProvider = (id) => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('DELETE FROM schema_owner.providers WHERE id = $1', [id], (err, result) => {
            if (err) {
                reject(err);
            }
            else if (result.rowCount === 0) {
                reject(`Provider with ID ${id} not found.`);
            }
            else {
                resolve();
            }
        });
    });
};
exports.deleteProvider = deleteProvider;
// Function to get providers by chainId
const getProvidersByChainId = (chainId) => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('SELECT * FROM schema_owner.providers WHERE chain_id = $1', [chainId], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result.rows);
            }
        });
    });
};
exports.getProvidersByChainId = getProvidersByChainId;
