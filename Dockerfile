# Step 1: Build the React app using Vite
FROM node:22 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the React app using Vite
RUN npm run build

# Step 2: Install 'serve' and serve the app
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the build output from the 'build' stage to the working directory
COPY --from=build /app/dist/bundle /app

# Install 'serve' globally to serve static files
RUN npm install -g serve

# Expose port 3000 (or any port you want to serve from)
EXPOSE 3000

# Start the 'serve' static file server
CMD ["serve", "-s", ".", "-l", "3000"]
