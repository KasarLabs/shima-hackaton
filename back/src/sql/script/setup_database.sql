CREATE SCHEMA IF NOT EXISTS schema_owner;

-- Create the provider table
CREATE TABLE IF NOT EXISTS schema_owner.providers (
    id SERIAL PRIMARY KEY,
    rpc_url VARCHAR(255) UNIQUE NOT NULL,
    performance_score INT NOT NULL,
);

-- Create the user table
CREATE TABLE IF NOT EXISTS schema_owner.users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    key VARCHAR(255) NOT NULL
);

-- Insert some sample providers
INSERT INTO schema_owner.providers (rpc_url, performance_score)
VALUES
    ('https://eth.llamarpc.com', 10),
    ('https://rpc.flashbots.net', 20),
    ('https://cloudflare-eth.com', 15);

-- Insert some sample users
INSERT INTO schema_owner.users (wallet_address, key)
VALUES
    ('0x123456789abcdef0123456789abcdef01234567', 'user_key_1'),
    ('0xabcdef0123456789abcdef0123456789abcdef0', 'user_key_2'),
    ('0x789abcdef0123456789abcdef0123456789abcde', 'user_key_3');


--- to run it use: psql -U bora -d test_shima -f setup_database.sql