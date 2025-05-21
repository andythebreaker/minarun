#!/bin/bash
# Auto-detect and launch the appropriate environment selector

echo "Launching MinaRun Environment GUI..."

# Check if Electron is installed
if command -v npx &> /dev/null; then
    # Try to run with Electron
    echo "Launching with Electron..."
    npx electron setup.js
else
    # Fallback to Python GUI
    if command -v python &> /dev/null || command -v python3 &> /dev/null; then
        echo "Launching with Python..."
        
        # Use python3 if available, otherwise use python
        if command -v python3 &> /dev/null; then
            python3 setup.py
        else
            python setup.py
        fi
    else
        echo "Neither Electron nor Python is available."
        echo "Falling back to command-line interface..."
        node config/env-manager.js
    fi
fi
