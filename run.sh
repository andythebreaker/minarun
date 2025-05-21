#!/bin/bash
# Environment Selector for MinaRun
# This script provides a simple interface to select and configure the environment

echo "MinaRun Environment Configurator"
echo "==============================="
echo

select_env() {
    echo "Select an environment:"
    echo "1. Development (localhost)"
    echo "2. Local Network"
    echo "3. Production (GitHub Pages)"
    echo
    read -p "Enter your choice (1-3): " choice
    
    case $choice in
        1) 
            echo "Setting up Development environment..."
            npm run env:dev
            ;;
        2)
            echo "Setting up Local Network environment..."
            npm run env:local
            ;;
        3)
            echo "Setting up Production environment..."
            npm run env:prod
            ;;
        *)
            echo "Invalid choice. Using Development as default."
            npm run env:dev
            ;;
    esac
}

select_action() {
    echo
    echo "Select an action:"
    echo "1. Start development server"
    echo "2. Build"
    echo "3. Build and serve"
    echo "4. Exit"
    echo
    
    read -p "Enter your choice (1-4): " action
    
    case $action in
        1)
            echo "Starting development server..."
            npm start
            ;;
        2)
            echo "Building application..."
            npm run build
            ;;
        3)
            echo "Building and serving application..."
            npm run serve
            ;;
        4|*)
            echo "Exiting..."
            ;;
    esac
}

# Main execution
select_env
select_action

echo
echo "Done!"
