# frontend build stage
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
COPY frontend/.env ./
RUN npm install
COPY frontend .
RUN npm run build

# backend build stage
FROM node:18-alpine
WORKDIR /app/backend

COPY backend/package*.json ./
COPY backend/.env ./
RUN npm install
COPY backend .

# Copy frontend/dist from frontend-build stage
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

EXPOSE 5000
CMD ["node", "index.js"]