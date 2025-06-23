# Use Ubuntu as the base image
FROM ubuntu:20.04

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install || cp /root/.npm/_logs/*.log /usr/src/app/npm-error.log

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (optional, for documentation purposes)
EXPOSE 4000

# Start the application
ENTRYPOINT ["node", "app.js"]