#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Navigate to the project root directory
cd "$(dirname "$0")/.."

# Build the project
echo "Building the project..."
npm run build

# Deploy to the server
echo "Deploying to the server..."

# Example using rsync (replace with your actual deployment method)
# Replace with your server details
SERVER_USER="your_server_user"
SERVER_IP="your_server_ip"
SERVER_PATH="/path/to/your/server/directory"

rsync -avz --delete ./dist/ ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}

echo "Deployment completed successfully!"
