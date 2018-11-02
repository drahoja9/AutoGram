# AutoGram frontned

The web interface of AutoGram is communicating with our REST API, sending input from user and displaying the result in some form.
We're using React components with Redux reducers.

### How to run

There are 2 ways to run the frontend part:

##### 1. Docker mode

1. Make sure you have Docker installed on your computer: 
```
docker --version
```
2. Build an image from Dockerfile in current directory  ("frontend" is name of the image to be built): 
```
docker build -t frontend .
```
3. Run the previously built image in container and map container's port 3000 to your host machine's port 3000: 
```
run -p 3000:3000 frontend
```
 
Depending on your Docker settings, all commands above may need to be run as root (with `sudo`). 

##### 2. Standalone mode

1. Make sure you have Node and npm installed on your computer:
```
node --version; npm --version
```
2. Install all packages that are needed:
```
npm install
```
3. Run the app:
```
npm start
```
