# Stage 1: Build the Node.js application
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

# RUN npm run tsc

# FROM node:14-alpine

# WORKDIR /app

# COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
