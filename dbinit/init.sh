#!/bin/sh

sleep 30

# Check if any tables are in the database
if [ -z "$(echo "USE $DB_DATABASE; SHOW TABLES" | mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$(cat $DB_PASS_FILE))" ]; then
  mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$(cat $DB_PASS_FILE) $DB_DATABASE < /init.sql
fi