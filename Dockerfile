# Use the official Node.js 20.6.0 image as the base image
FROM node:20.6.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port (replace 3000 with your application's port)
EXPOSE 3000

# Start the application
CMD [ "node", "discord-bot" ]