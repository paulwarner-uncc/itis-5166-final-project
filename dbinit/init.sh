#!/bin/sh

# Give the db time to start, probably reimplement as a healthcheck or something
sleep 30

# Check if any tables are in the database
if [ -z "$(echo "USE $DB_DATABASE; SHOW TABLES" | mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS)" ]; then
  mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS $DB_DATABASE < /init.sql
fi