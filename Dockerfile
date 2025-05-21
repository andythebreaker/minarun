FROM node:16

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variable based on build argument
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Run the environment setup script
RUN node config/env-manager.js ${NODE_ENV}

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000
EXPOSE 48489

# Command to run the application
CMD ["npm", "run", "serve"]
