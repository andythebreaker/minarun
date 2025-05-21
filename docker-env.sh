#!/bin/bash
# Docker environment manager script

# Default settings
ENV="dev"
ACTION="start"

# Display usage information
function show_help() {
  echo "MinaRun Docker Environment Manager"
  echo "Usage: ./docker-env.sh [options]"
  echo ""
  echo "Options:"
  echo "  -e, --env ENV       Set environment (dev, local, prod)"
  echo "  -a, --action ACTION Set action (start, stop, build, logs, restart)"
  echo "  -h, --help          Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./docker-env.sh -e prod -a start    # Start production environment"
  echo "  ./docker-env.sh -e local -a stop    # Stop local environment"
  echo "  ./docker-env.sh -e dev -a logs      # Show logs for development environment"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -e|--env)
      ENV="$2"
      shift 2
      ;;
    -a|--action)
      ACTION="$2"
      shift 2
      ;;
    -h|--help)
      show_help
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Validate environment
if [[ "$ENV" != "dev" && "$ENV" != "local" && "$ENV" != "prod" ]]; then
  echo "Error: Invalid environment '$ENV'. Must be 'dev', 'local', or 'prod'."
  exit 1
fi

# Map environment to Docker service name
case $ENV in
  dev)
    SERVICE="minarun-dev"
    ;;
  local)
    SERVICE="minarun-local"
    ;;
  prod)
    SERVICE="minarun-prod"
    ;;
esac

# Execute requested action
case $ACTION in
  start)
    echo "Starting $SERVICE environment..."
    docker-compose up -d $SERVICE
    ;;
  stop)
    echo "Stopping $SERVICE environment..."
    docker-compose stop $SERVICE
    ;;
  build)
    echo "Building $SERVICE environment..."
    docker-compose build $SERVICE
    ;;
  logs)
    echo "Showing logs for $SERVICE environment..."
    docker-compose logs -f $SERVICE
    ;;
  restart)
    echo "Restarting $SERVICE environment..."
    docker-compose restart $SERVICE
    ;;
  *)
    echo "Error: Invalid action '$ACTION'."
    show_help
    exit 1
    ;;
esac

echo "Done!"
