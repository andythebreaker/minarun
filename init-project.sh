#!/bin/bash
# Project Initialization Script
# This script will set up the project environment automatically

echo "MinaRun Project Initialization"
echo "=============================="
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js before continuing."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm before continuing."
    exit 1
fi

# Install dependencies
echo "Installing project dependencies..."
npm install

# Create environment files if they don't exist
echo "Checking environment configurations..."

ENV_DEV_FILE=".env.development"
ENV_LOCAL_FILE=".env.local"
ENV_PROD_FILE=".env.production"

if [ ! -f "$ENV_DEV_FILE" ]; then
    echo "Creating $ENV_DEV_FILE..."
    cat > "$ENV_DEV_FILE" << EOF
PUBLIC_URL=./
HOMEPAGE_URL=http://localhost:3000/./
NODE_ENV=development
EOF
fi

if [ ! -f "$ENV_LOCAL_FILE" ]; then
    echo "Creating $ENV_LOCAL_FILE..."
    cat > "$ENV_LOCAL_FILE" << EOF
PUBLIC_URL=./
HOMEPAGE_URL=http://192.168.0.101:48489/./
NODE_ENV=development
EOF
fi

if [ ! -f "$ENV_PROD_FILE" ]; then
    echo "Creating $ENV_PROD_FILE..."
    cat > "$ENV_PROD_FILE" << EOF
PUBLIC_URL=/minarun
HOMEPAGE_URL=https://gitname.github.io/minarun
NODE_ENV=production
EOF
fi

# Set up initial environment
echo "Setting up default environment..."
node config/env-manager.js development

echo
echo "Project initialized successfully!"
echo
echo "To start the development server:"
echo "  npm start"
echo
echo "To build the project:"
echo "  npm run build"
echo
echo "To use the environment selector GUI:"
echo "  ./setup.sh (Linux/Mac) or setup.bat (Windows)"
echo
