ALTER TABLE schema_owner.providers
ADD COLUMN compute_units INTEGER DEFAULT 0;

ALTER TABLE schema_owner.users
ADD COLUMN compute_units INTEGER DEFAULT 0;