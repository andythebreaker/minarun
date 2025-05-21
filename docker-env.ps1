# Docker environment manager script for PowerShell

param (
    [string]$Env = "dev",
    [string]$Action = "start",
    [switch]$Help
)

# Display usage information
function Show-Help {
    Write-Host "MinaRun Docker Environment Manager"
    Write-Host "Usage: .\docker-env.ps1 [-Env ENV] [-Action ACTION] [-Help]"
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -Env ENV       Set environment (dev, local, prod)"
    Write-Host "  -Action ACTION Set action (start, stop, build, logs, restart)"
    Write-Host "  -Help          Show this help message"
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "  .\docker-env.ps1 -Env prod -Action start    # Start production environment"
    Write-Host "  .\docker-env.ps1 -Env local -Action stop    # Stop local environment"
    Write-Host "  .\docker-env.ps1 -Env dev -Action logs      # Show logs for development environment"
}

# Show help if requested
if ($Help) {
    Show-Help
    exit 0
}

# Validate environment
if ($Env -notin @("dev", "local", "prod")) {
    Write-Host "Error: Invalid environment '$Env'. Must be 'dev', 'local', or 'prod'." -ForegroundColor Red
    exit 1
}

# Map environment to Docker service name
switch ($Env) {
    "dev" { $Service = "minarun-dev" }
    "local" { $Service = "minarun-local" }
    "prod" { $Service = "minarun-prod" }
}

# Execute requested action
switch ($Action) {
    "start" {
        Write-Host "Starting $Service environment..." -ForegroundColor Cyan
        docker-compose up -d $Service
    }
    "stop" {
        Write-Host "Stopping $Service environment..." -ForegroundColor Cyan
        docker-compose stop $Service
    }
    "build" {
        Write-Host "Building $Service environment..." -ForegroundColor Cyan
        docker-compose build $Service
    }
    "logs" {
        Write-Host "Showing logs for $Service environment..." -ForegroundColor Cyan
        docker-compose logs -f $Service
    }
    "restart" {
        Write-Host "Restarting $Service environment..." -ForegroundColor Cyan
        docker-compose restart $Service
    }
    default {
        Write-Host "Error: Invalid action '$Action'." -ForegroundColor Red
        Show-Help
        exit 1
    }
}

Write-Host "Done!" -ForegroundColor Green
