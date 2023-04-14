import { query } from '../config/dbConfig';

export interface Provider {
    id: number;
    rpc_url: string;
    performance_score: number;
}

// Function to get all providers
export const getAllProviders = (): Promise<Provider[]> => {
    return new Promise((resolve, reject) => {
        query('SELECT * FROM schema_owner.providers', [], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

// Function to get a provider by ID
export const getProviderById = (id: number): Promise<Provider> => {
    return new Promise((resolve, reject) => {
        query('SELECT * FROM schema_owner.providers WHERE id = $1', [id], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.rowCount === 0) {
                reject(`Provider with ID ${id} not found.`);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

// Function to create a new provider
export const createProvider = (data: Provider): Promise<Provider> => {
    const { rpc_url, performance_score } = data;
    return new Promise((resolve, reject) => {
        query(
            'INSERT INTO schema_owner.providers (rpc_url, performance_score) VALUES ($1, $2) RETURNING *',
            [rpc_url, performance_score],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            }
        );
    });
};

// Function to update a provider
export const updateProvider = (id: number, data: Provider): Promise<Provider> => {
    const { rpc_url, performance_score } = data;
    return new Promise((resolve, reject) => {
        query(
            'UPDATE schema_owner.providers SET rpc_url = $1, performance_score = $2 WHERE id = $3 RETURNING *',
            [rpc_url, performance_score, id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.rowCount === 0) {
                    reject(`Provider with ID ${id} not found.`);
                } else {
                    resolve(result.rows[0]);
                }
            }
        );
    });
};

// Function to delete a provider
export const deleteProvider = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        query('DELETE FROM schema_owner.providers WHERE id = $1', [id], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.rowCount === 0) {
                reject(`Provider with ID ${id} not found.`);
            } else {
                resolve();
            }
        });
    });
};

