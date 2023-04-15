createdb shima 
psql -d shima -f db/db.sql &> db/setupDb.log
PATHPSQL=$(psql shima -c "SHOW data_directory;" | grep /usr/)
echo "\nexpose your port in this file:${PATHPSQL}/postgresql.conf
uncomment line 64 (optionnally you can change your port)"
echo "Add this line:
--------------------------------------------------------------------
host    all             all             0.0.0.0/0               md5
--------------------------------------------------------------------
In this file:${PATHPSQL}/pg_hba.conf" 

echo "\nAfter this restart postgresql"
