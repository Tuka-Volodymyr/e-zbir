FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm start
COPY . .
EXPOSE 3000
CMD ["npm", "start"]