# Use the official image as a parent image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install --global pm2

# Copy the file from your host to your current location
COPY package*.json ./

# Run the command inside your image filesystem
RUN npm install --legacy-peer-deps && npm cache clean --force

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 4002

# Run the specified command within the container.
CMD [ "pm2-runtime", "index.js", "-i", "max"]