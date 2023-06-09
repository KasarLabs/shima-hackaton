CREATE SCHEMA IF NOT EXISTS schema_owner;

-- Create the provider table
CREATE TABLE IF NOT EXISTS schema_owner.providers (
    id SERIAL PRIMARY KEY,
    rpc_url VARCHAR(255) UNIQUE NOT NULL,
    chain_id VARCHAR(255) NOT NULL,
    performance_score INT NOT NULL,
    computation_units INT NOT NULL
);

-- Create the user table
CREATE TABLE IF NOT EXISTS schema_owner.users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    key VARCHAR(255) NOT NULL,
    computation_units INT NOT NULL
);

-- Insert some sample providers
INSERT INTO schema_owner.providers (rpc_url, chain_id, performance_score, computation_units)
VALUES
    ('https://eth.llamarpc.com', '1', 0, 0),
    ('https://ethereum.rpc.thirdweb.com/', '1', 0, 0),
    ('https://rpc.flashbots.net', '1',0, 0),
    ('https://cloudflare-eth.com', '1',0, 0),
    ('https://polygon.llamarpc.com', '137', 0, 0),
    ('https://rpc.testnet.mantle.xyz', '5001', 0, 0),
    ('https://rpc.a2.taiko.xyz', '167004', 0, 0),
    ('https://rpc.ankr.com/gnosis', '100', 0, 0),
    ('https://rpc.ankr.com/celo', '42220', 0, 0),
    ('https://celo.rpc.thirdweb.com/', '42220', 0, 0);

-- Insert some sample users
INSERT INTO schema_owner.users (wallet_address, key, computation_units)
VALUES
    ('0x123456789abcdef0123456789abcdef01234567', 'user_key_1', 0),
    ('0xabcdef0123456789abcdef0123456789abcdef0', 'user_key_2', 0),
    ('0x789abcdef0123456789abcdef0123456789abcde', 'user_key_3', 0);


--- to run it use: psql -U bora -d test_shima -f setup_database.sql