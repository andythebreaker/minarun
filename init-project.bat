@echo off
REM Project Initialization Script
REM This script will set up the project environment automatically

echo MinaRun Project Initialization
echo ==============================
echo.

REM Check if Node.js is installed
where node > nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js before continuing.
    exit /b 1
)

REM Check if npm is installed
where npm > nul 2>&1
if %errorlevel% neq 0 (
    echo npm is not installed. Please install npm before continuing.
    exit /b 1
)

REM Install dependencies
echo Installing project dependencies...
call npm install

REM Create environment files if they don't exist
echo Checking environment configurations...

set ENV_DEV_FILE=.env.development
set ENV_LOCAL_FILE=.env.local
set ENV_PROD_FILE=.env.production

if not exist %ENV_DEV_FILE% (
    echo Creating %ENV_DEV_FILE%...
    (
        echo PUBLIC_URL=./
        echo HOMEPAGE_URL=http://localhost:3000/./
        echo NODE_ENV=development
    ) > %ENV_DEV_FILE%
)

if not exist %ENV_LOCAL_FILE% (
    echo Creating %ENV_LOCAL_FILE%...
    (
        echo PUBLIC_URL=./
        echo HOMEPAGE_URL=http://192.168.0.101:48489/./
        echo NODE_ENV=development
    ) > %ENV_LOCAL_FILE%
)

if not exist %ENV_PROD_FILE% (
    echo Creating %ENV_PROD_FILE%...
    (
        echo PUBLIC_URL=/minarun
        echo HOMEPAGE_URL=https://gitname.github.io/minarun
        echo NODE_ENV=production
    ) > %ENV_PROD_FILE%
)

REM Set up initial environment
echo Setting up default environment...
call node config/env-manager.js development

echo.
echo Project initialized successfully!
echo.
echo To start the development server:
echo   npm start
echo.
echo To build the project:
echo   npm run build
echo.
echo To use the environment selector GUI:
echo   setup.bat
echo.
