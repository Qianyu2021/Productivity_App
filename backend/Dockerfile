#backend/Dockerfile
FROM node:22-alpine

#Create app directory
WORKDIR /usr/src/app/backend

# Copy package.json and package-lock.json
COPY package*.json ./
#COPY .env ./.env
#COPY prisma ./prisma

COPY . .
RUN echo DATABASE_URL="postgresql://productivity:great@db:5434/productivity_web" > .env
RUN npm i -g prisma


RUN npm install
# Expose the application port
EXPOSE 8800

# Start the application
CMD npm start

