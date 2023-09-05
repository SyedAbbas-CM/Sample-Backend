# 1. Use the official Node.js image as the base image
FROM node:18-alpine

# NOT REQUIRED - Volume already mapped
# 3. Copy the local project directory to the container
COPY . /app

# 2. Set the working directory
WORKDIR /app

# 4. Install nest.js globally
RUN npm install -g @nestjs/cli

# 5. Install the dependencies
RUN npm install

# 8. Start the app
CMD ["npm", "run", "start:debug"]