# # Stage 1: Build the React app
FROM node:alpine
# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

CMD ["npm", "run", "dev"]
