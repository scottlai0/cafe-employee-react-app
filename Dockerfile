# Use the official Node.js image.
FROM node:18 AS build

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application files.
COPY . .

# Build the application.
RUN npm run build

# Use Nginx to serve the app.
FROM nginx:alpine

# Copy the build files to the Nginx public directory.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80.
EXPOSE 80

# Start Nginx server.
CMD ["nginx", "-g", "daemon off;"]
