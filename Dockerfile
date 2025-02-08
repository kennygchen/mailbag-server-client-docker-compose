# Use a base image for Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json files separately for efficient caching
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN cd server && npm install
RUN cd client && npm install

# Copy both frontend and backend files
COPY server/ ./server/
COPY client/ ./client/

# Build frontend
RUN cd client && npm run build

# Expose backend port
EXPOSE 3000