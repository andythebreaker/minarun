@echo off
REM Environment Selector for MinaRun
REM This script provides a simple GUI to select and configure the environment

echo MinaRun Environment Configurator
echo ===============================
echo.
echo Select an environment:
echo 1. Development (localhost)
echo 2. Local Network
echo 3. Production (GitHub Pages)
echo.
choice /C 123 /N /M "Enter your choice (1-3): "

if errorlevel 3 goto :production
if errorlevel 2 goto :local
if errorlevel 1 goto :development

:development
echo.
echo Setting up Development environment...
call npm run env:dev
goto :chooseaction

:local
echo.
echo Setting up Local Network environment...
call npm run env:local
goto :chooseaction

:production
echo.
echo Setting up Production environment...
call npm run env:prod
goto :chooseaction

:chooseaction
echo.
echo Select an action:
echo 1. Start development server
echo 2. Build
echo 3. Build and serve
echo 4. Exit
echo.
choice /C 1234 /N /M "Enter your choice (1-4): "

if errorlevel 4 goto :end
if errorlevel 3 goto :serve
if errorlevel 2 goto :build
if errorlevel 1 goto :start

:start
echo.
echo Starting development server...
call npm start
goto :end

:build
echo.
echo Building application...
call npm run build
goto :end

:serve
echo.
echo Building and serving application...
call npm run serve
goto :end

:end
echo.
echo Done!
