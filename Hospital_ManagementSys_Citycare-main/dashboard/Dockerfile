# Stage 1: Build the dashboard
FROM node:22.11-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project (generates the `dist` folder)
RUN npm run build

# Stage 2: Serve the built files with Nginx
FROM nginx:stable-alpine

# Copy the `dist` folder from the builder stage to Nginx's default directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
