# AutoGram backend

Basically, the whole backend is just REST API (Flask) communicating with [ALT (Algorithms Library Toolkit)][alt_gitlab] through Python interface.

[alt_gitlab]: https://gitlab.fit.cvut.cz/algorithms-library-toolkit/automata-library


### How to run

There are two ways to run this app:

##### 1. Docker mode

This is very simple method how to run this application and is STRONGLY RECOMMENDED over the second one. There are only three steps:
1. Make sure you have Docker and Docker-compose installed on your computer: `docker --version` and `docker-compose --version`
2. Run our app through Docker-compose: `docker-compose up` (append the `-d` at the end to run in background)
 
Depending on your Docker settings, all commands above may need to be run as root (with `sudo`). 

##### 2. Standalone mode

In this case, you'll have to download the ALT library, compile it and edit our Makefile so it matches the path where you have the ALT library on your computer. Then you just:
1. Create virtual environment in the working directory (optional, but recommended): `python3.6 -m venv venv`
2. Activate it: `source venv/bin/activate`
3. Ïnstall the dependencies: `pip install -r requirements.txt`
4. Compile our C++ interface for ALT library: `make interface`
5. Run the app ether via `make run` or `python bin/run.py`

Note that THIS OPTION IS STRONGLY DISCOURAGED.

Either way, your application should be up and running by now.


### Docs

To generate docs, you have to have a Sphinx installed. (`pip install sphinx` to install it globally). Then just type in `make docs` and that's it.

Generated documentation can be found inside docs/build (by default).