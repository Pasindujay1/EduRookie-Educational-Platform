FROM node:18-alpine

#working directory
WORKDIR /app    

COPY package.json .

#Install dependencies
RUN npm install

#copy source files in to new folder called app
COPY . .

#Export the port
EXPOSE 3000

CMD [ "npm","start" ]