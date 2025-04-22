#!/bin/bash

# Stop script on error
set -e

# Variables
# REMOTE_USER="your_username"
# REMOTE_HOST="your_vps_ip"
# REMOTE_PATH="/var/www/your_site"
# LOCAL_DIST="./dist"
REMOTE_USER="root"
REMOTE_HOST="82.180.160.220"
REMOTE_PATH="/var/www/somaletera.com"
LOCAL_DIST="./dist"

# Build the project
npm run build

# Ensure remote directory exists
ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_PATH"

# Transfer files
rsync -avz --delete $LOCAL_DIST/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

# Set permissions
ssh $REMOTE_USER@$REMOTE_HOST "chmod -R 755 $REMOTE_PATH"

echo "Deployment completed successfully!"