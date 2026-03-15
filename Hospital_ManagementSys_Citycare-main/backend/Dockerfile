# Use a Node.js base image
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the application files
COPY . .

# Expose the application port (adjust if necessary)
EXPOSE 4000

# Start the application
CMD ["npx", "nodemon", "server.js"]
