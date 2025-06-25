# Build stage for client
FROM node:16-alpine as client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Build stage for server
FROM node:16-alpine as server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
RUN npm run build

# Production stage
FROM node:16-alpine
WORKDIR /app

# Copy built client files
COPY --from=client-build /app/client/build ./client/build

# Copy server files and install production dependencies
WORKDIR /app/server
COPY --from=server-build /app/server/dist ./dist
COPY server/package*.json ./
RUN npm ci --only=production

# Copy .env file if it exists
COPY server/.env* ./

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
