#!/bin/bash

echo "Building the project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js could not be found. Please install it."
    exit
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm could not be found. Please install it."
    exit
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Build completed successfully!"
