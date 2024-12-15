# Step 1: Use the official Node.js 22 image for building the React app
FROM node:22 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the entire React app and build it
COPY . .
RUN npm run build

# Step 5: Use a lightweight Nginx image to serve the React app
FROM nginx:1.23
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
