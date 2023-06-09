import { query } from '../config/dbConfig';

export interface User {
    id: number;
    wallet_address: string;
    key: string;
    computation_units: number;
}

// Function to retrieve all users
export const getAllUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        query('SELECT * FROM schema_owner.users', [], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

// Function to retrieve a user by ID
export const getUserById = (id: number): Promise<User> => {
    return new Promise((resolve, reject) => {
        query('SELECT * FROM schema_owner.users WHERE id = $1', [id], (error, results) => {
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

export const getUserByWalletAddress = (wallet_address: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        query('SELECT * FROM schema_owner.users WHERE wallet_address = $1', [wallet_address], (error, results) => {
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

export const getUserByKey = (key: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      query('SELECT * FROM schema_owner.users WHERE key = $1', [key], (error, results) => {
        if (error) {
          reject(error);
        }
        if (results.rows.length === 0) {
          resolve(null);
        } else {
          resolve(results.rows[0]);
        }
      });
    });
  };

// Function to create a user
export const createUser = (user: User): Promise<User> => {
    const { wallet_address, key, computation_units } = user;
    return new Promise((resolve, reject) => {
        query(
            'INSERT INTO schema_owner.users (wallet_address, key, computation_units) VALUES ($1, $2, $3) RETURNING *',
            [wallet_address, key, computation_units],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.rows[0]);
                }
            }
        );
    });
};

// Function to update a user
export const updateUser = (id: number, user: User): Promise<User> => {
    const { wallet_address, key, computation_units } = user;
    return new Promise((resolve, reject) => {
        query(
            'UPDATE schema_owner.users SET wallet_address = $1, key = $2, computation_units = $3 WHERE id = $4 RETURNING *',
            [wallet_address, key, computation_units, id],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results.rows.length === 0) {
                    throw new Error(`User with ID ${id} not found`);
                } else {
                    resolve(results.rows[0]);
                }
            }
        );
    });
};

// Function to delete a user
export const deleteUser = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        query('DELETE FROM schema_owner.users WHERE id = $1', [id], (error) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });
};
