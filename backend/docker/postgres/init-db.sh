#!/bin/bash
set -e

echo "Creating databases and user from env variables..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
  -- Create role if not exists
  DO
  \$do\$
  BEGIN
     IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${POSTGRES_USER}') THEN
        CREATE ROLE ${POSTGRES_USER} WITH LOGIN PASSWORD '${POSTGRES_PASSWORD}';
     END IF;
  END
  \$do\$;

  -- Create userdb if not exists
  SELECT 'CREATE DATABASE ${POSTGRES_DB}'
  WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${POSTGRES_DB}') \gexec

  -- Create keycloakdb if not exists
  SELECT 'CREATE DATABASE ${POSTGRES_KEYCLOAK_DB}'
  WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${POSTGRES_KEYCLOAK_DB}') \gexec

  -- Grant privileges
  GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DB} TO ${POSTGRES_USER};
  GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_KEYCLOAK_DB} TO ${POSTGRES_USER};
EOSQL

echo "Databases and role ready."
