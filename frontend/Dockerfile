 FROM node:8.12-alpine
 
 WORKDIR /srv/frontend
 
 COPY . /srv/frontend
 
 RUN npm install
 
 USER node
 
 CMD ["npm", "start"]
