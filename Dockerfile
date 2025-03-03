# Use the official Node.js image as the base
FROM node:23.7.0

# Create the working directory inside the container
WORKDIR /usr/app

# Copy the package.json file to the working directory
COPY package.json ./

# Install the dependencies
RUN npm install

# Copy the remaining files into the container
COPY . .

# Compile the TypeScript code
RUN npm run build

# Expose the port that your application will use
EXPOSE 3000

# Command to start the application when the container starts
CMD ["node", "dist/main"]
