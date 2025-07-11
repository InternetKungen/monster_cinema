# backend build stage
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .

EXPOSE 5000
CMD ["node", "index.js"]