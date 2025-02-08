# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the server runs on
ENV PORT=8080
EXPOSE 8080

# Start the application
CMD ["npm", "run", "compile"]