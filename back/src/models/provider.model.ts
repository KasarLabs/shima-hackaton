import { query } from '../config/dbConfig';

export interface Provider {
    id: number;
    rpc_url: string;
    chain_id: string;
    performance_score: number;
    computation_units: number;
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
    const { rpc_url, chain_id, performance_score, computation_units } = data;
    return new Promise((resolve, reject) => {
        query(
            'INSERT INTO schema_owner.providers (rpc_url, chain_id, performance_score, computation_units) VALUES ($1, $2, $3, $4) RETURNING *',
            [rpc_url, chain_id, performance_score, computation_units],
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
    const { rpc_url, chain_id, performance_score, computation_units } = data;
    return new Promise((resolve, reject) => {
        query(
            'UPDATE schema_owner.providers SET rpc_url = $1, chain_id = $2, performance_score = $3, computation_units = $4 WHERE id = $5 RETURNING *',
            [rpc_url, chain_id, performance_score, computation_units, id],
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

// Function to get providers by chainId
export const getProvidersByChainId = (chainId: string): Promise<Provider[]> => {
    return new Promise((resolve, reject) => {
      query('SELECT * FROM schema_owner.providers WHERE chain_id = $1', [chainId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  };
  

