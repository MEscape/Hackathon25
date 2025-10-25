#!/bin/bash

# Create pgpass file for automatic password authentication
cat <<EOF > /tmp/pgpassfile
postgres:5432:*:$POSTGRES_USER:$POSTGRES_PASSWORD
EOF
chmod 600 /tmp/pgpassfile

# Generate servers.json with env vars
cat <<EOF > /tmp/servers.json
{
  "Servers": {
    "1": {
      "Name": "Postgres - SafeNet",
      "Group": "Servers",
      "Host": "postgres",
      "Port": 5432,
      "MaintenanceDB": "postgres",
      "Username": "$POSTGRES_USER",
      "SSLMode": "prefer",
      "PassFile": "/tmp/pgpassfile"
    }
  }
}
EOF

# Set the environment variable for PgAdmin to import
export PGADMIN_SERVER_JSON_FILE=/tmp/servers.json

# Start PgAdmin
exec /entrypoint.sh