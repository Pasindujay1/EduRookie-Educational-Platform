FROM node:18-alpine

#Install nodemon globally
RUN npm install -g nodemon

#set the working directory
WORKDIR /app

#copy source files in to new folder called app
COPY . .

#Install dependencies
RUN npm install 

#Export the port
EXPOSE 8003

#command to run the application
CMD ["npm", "run", "dev"]