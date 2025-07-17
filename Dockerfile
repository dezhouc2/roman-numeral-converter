# Use Node.js 18 Alpine image for smaller size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install backend dependencies
RUN cd backend && npm install --only=production

# Install frontend dependencies
RUN cd frontend && npm install

# Copy source code
COPY backend/src ./backend/src
COPY frontend/src ./frontend/src
COPY frontend/public ./frontend/public

# Build frontend for production
RUN cd frontend && npm run build

# Expose port 8080
EXPOSE 8080

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the backend server
CMD ["node", "backend/src/server.js"]