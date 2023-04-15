"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDapp = exports.updateDapp = exports.createDapp = exports.getDappByUserId = exports.getAllDapps = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Function to retrieve all dapps
const getAllDapps = () => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('SELECT * FROM schema_owner.dapp', [], (error, results) => {
            if (error) {
                console.error('Error getting all dapps:', error);
                reject(error);
            }
            console.log('Retrieved all dapps from database');
            resolve(results.rows);
        });
    });
};
exports.getAllDapps = getAllDapps;
// Function to retrieve a dapp by user_id
const getDappByUserId = (user_id) => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('SELECT * FROM schema_owner.dapp WHERE user_id = $1', [user_id], (error, results) => {
            if (error) {
                console.error(`Error getting dapp with user ID ${user_id}:`, error);
                reject(error);
            }
            if (results.rows.length === 0) {
                console.error(`Dapp with user ID ${user_id} not found`);
                reject(new Error(`Dapp with user ID ${user_id} not found`));
            }
            console.log(`Retrieved dapp with user ID ${user_id} from database`);
            resolve(results.rows[0]);
        });
    });
};
exports.getDappByUserId = getDappByUserId;
// Function to create a dapp
const createDapp = (dapp) => {
    const { network, nom, user_id, url } = dapp;
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('INSERT INTO schema_owner.dapp (network, nom, user_id, url) VALUES ($1, $2, $3, $4) RETURNING *', [network, nom, user_id, url], (error, results) => {
            if (error) {
                console.error('Error creating dapp:', error);
                reject(error);
            }
            console.log(`Created dapp with user ID ${user_id}`);
            resolve(results.rows[0]);
        });
    });
};
exports.createDapp = createDapp;
// Function to update a dapp
const updateDapp = (user_id, dapp) => {
    const { network, nom, url } = dapp;
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('UPDATE schema_owner.dapp SET network = $1, nom = $2, url = $3 WHERE user_id = $4 RETURNING *', [network, nom, url, user_id], (error, results) => {
            if (error) {
                console.error(`Error updating dapp with user ID ${user_id}:`, error);
                reject(error);
            }
            if (results.rows.length === 0) {
                console.error(`Dapp with user ID ${user_id} not found`);
                reject(new Error(`Dapp with user ID ${user_id} not found`));
            }
            console.log(`Updated dapp with user ID ${user_id}`);
            resolve(results.rows[0]);
        });
    });
};
exports.updateDapp = updateDapp;
// Function to delete a dapp
const deleteDapp = (user_id) => {
    return new Promise((resolve, reject) => {
        (0, dbConfig_1.query)('DELETE FROM schema_owner.dapp WHERE user_id = $1', [user_id], (error) => {
            if (error) {
                console.error(`Error deleting dapp with user ID ${user_id}:`, error);
                reject(error);
            }
            console.log(`Deleted dapp with user ID ${user_id}`);
            resolve();
        });
    });
};
exports.deleteDapp = deleteDapp;
