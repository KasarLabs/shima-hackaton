import { query } from '../config/dbConfig';

export interface User {
    id: number;
    wallet_address: string;
    key: string;
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

// Function to create a user
export const createUser = (user: User): Promise<User> => {
    const { wallet_address, key } = user;
    return new Promise((resolve, reject) => {
        query(
            'INSERT INTO schema_owner.users (wallet_address, key) VALUES ($1, $2) RETURNING *',
            [wallet_address, key],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0]);
            }
        );
    });
};

// Function to update a user
export const updateUser = (id: number, user: User): Promise<User> => {
    const { wallet_address, key } = user;
    return new Promise((resolve, reject) => {
        query(
            'UPDATE schema_owner.users SET wallet_address = $1, key = $2 WHERE id = $3 RETURNING *',
            [wallet_address, key, id],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results.rows.length === 0) {
                    throw new Error(`User with ID ${id} not found`);
                }
                resolve(results.rows[0]);
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
