 FROM node:8.12-alpine
 
 # Using non-root user for security reasons
 USER node
 
 # Can be any other path, but this is by default owned by our user
 WORKDIR /home/node
 
 # COPY command ignores the USER command, so we have to specify owner and group of copied files
 COPY --chown=node:node ./package.json ./package-lock.json ./
 
 RUN npm install
 
 # Copy the rest of the app
 # This way, the previous layers will rebuild only if package.json or package-lock.json change
 COPY --chown=node:node . .
 
 CMD ["npm", "start"]
