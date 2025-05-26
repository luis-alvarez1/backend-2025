# Use an official Node.js runtime as the base image
# Specify the version (e.g., 18, 20, etc.) based on your needs
FROM node:22.16.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
# This is done separately to leverage Docker cache
COPY package*.json ./

# Install dependencies
# Use npm ci for production (requires package-lock.json)
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run your application
CMD ["npm", "start"]

# Alternative if using npm start script:
# CMD ["npm", "start"]
