# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV BASE_URL=https://api.bunny.net
ENV VIDEO_URL=https://video.bunnycdn.com

# Start the application
CMD ["npm", "start"]