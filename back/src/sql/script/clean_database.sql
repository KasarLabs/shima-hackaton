-- Truncate tables
TRUNCATE schema_owner.users CASCADE;
TRUNCATE schema_owner.providers CASCADE;

-- Drop tables
DROP TABLE schema_owner.users;
DROP TABLE schema_owner.providers;

DROP SCHEMA schema_owner;