import { query } from '../config/dbConfig';

export interface Dapp {
    network: string;
    nom: string;
    user_id: number;
    url: string;
}

// Function to retrieve all dapps
export const getAllDapps = (): Promise<Dapp[]> => {
    return new Promise((resolve, reject) => {
        query('SELECT * FROM schema_owner.dapp', [], (error, results) => {
            if (error) {
                console.error('Error getting all dapps:', error);
                reject(error);
            }
            console.log('Retrieved all dapps from database');
            resolve(results.rows);
        });
    });
};

// Function to retrieve a dapp by user_id
export const getDappByUserId = (user_id: number): Promise<Dapp> => {
    return new Promise((resolve, reject) => {
        query('SELECT * FROM schema_owner.dapp WHERE user_id = $1', [user_id], (error, results) => {
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

// Function to create a dapp
export const createDapp = (dapp: Dapp): Promise<Dapp> => {
    const { network, nom, user_id, url } = dapp;
    return new Promise((resolve, reject) => {
        query(
            'INSERT INTO schema_owner.dapp (network, nom, user_id, url) VALUES ($1, $2, $3, $4) RETURNING *',
            [network, nom, user_id, url],
            (error, results) => {
                if (error) {
                    console.error('Error creating dapp:', error);
                    reject(error);
                }
                console.log(`Created dapp with user ID ${user_id}`);
                resolve(results.rows[0]);
            }
        );
    });
};

// Function to update a dapp
export const updateDapp = (user_id: number, dapp: Dapp): Promise<Dapp> => {
    const { network, nom, url } = dapp;
    return new Promise((resolve, reject) => {
        query(
            'UPDATE schema_owner.dapp SET network = $1, nom = $2, url = $3 WHERE user_id = $4 RETURNING *',
            [network, nom, url, user_id],
            (error, results) => {
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
            }
        );
    });
};

// Function to delete a dapp
export const deleteDapp = (user_id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        query('DELETE FROM schema_owner.dapp WHERE user_id = $1', [user_id], (error) => {
            if (error) {
                console.error(`Error deleting dapp with user ID ${user_id}:`, error);
                reject(error);
            }
            console.log(`Deleted dapp with user ID ${user_id}`);
            resolve();
        });
    });
};
