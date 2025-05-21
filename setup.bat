@echo off
REM Auto-detect and launch the appropriate environment selector

echo Launching MinaRun Environment GUI...

REM Check if Electron is installed
where npx > nul 2>&1
if %errorlevel% equ 0 (
    REM Try to run with Electron
    echo Launching with Electron...
    npx electron setup.js
) else (
    REM Fallback to Python GUI
    where python > nul 2>&1
    if %errorlevel% equ 0 (
        echo Launching with Python...
        python setup.py
    ) else (
        echo Neither Electron nor Python is available.
        echo Falling back to command-line interface...
        node config/env-manager.js
    )
)
