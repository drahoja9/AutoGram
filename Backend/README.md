# AutoGram backend

Basically, the whole backend is just REST API (Flask) communicating with [ALT (Algorithms Library Toolkit)][alt_gitlab] through Python interface.

[alt_gitlab]: https://gitlab.fit.cvut.cz/algorithms-library-toolkit/automata-library


### How to run

There are two ways to run this app:

##### 1. Docker mode

This is very simple method how to run this application and is STRONGLY RECOMMENDED over the second one. There are only three steps:
1. Make sure you have Docker installed on your computer: 
```
docker --version
```
2. Build an image from Dockerfile in current directory  ("backend" is name of the image to be built): 
```
docker build -t backend .
```
3. Run the previously built image in container and map container's port 5000 to your host machine's port 5000: 
```
run -p 5000:5000 backend
```
 
Depending on your Docker settings, all commands above may need to be run as root (with `sudo`). 

##### 2. Standalone mode

In this case, you'll have to download the ALT library, compile it and edit our Makefile so it matches the path where you have the ALT library on your computer. Then you just:
1. Create virtual environment in the working directory (optional, but recommended): 
```
python3.6 -m venv venv
```
2. Activate it: 
```
source venv/bin/activate
```
3. Ïnstall the dependencies: 
```
pip install -r requirements.txt
```
4. Compile our C++ interface for ALT library: 
```
make interface
```
5. Run the app ether via:
```
python bin/run.py
```

Note that THIS OPTION IS STRONGLY DISCOURAGED.

Either way, your application should be up and running by now.


### Docs

To generate docs, you have to have a Sphinx installed. To install it globally:
```
pip install sphinx
``` 
Then just type in 
```
make docs
```
and that's it.

Generated documentation can be found inside docs/build (by default).
