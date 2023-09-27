FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm run start
EXPOSE 3000
