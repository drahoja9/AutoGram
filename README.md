# Autogram

Autogram is a web based app aimed to help with education and understanding of automata and grammars
and algorithms associated with them.

## Project structure

- Frontend

- Backend


Each, frontend and backend, have their own build tools with instructions in their own folders.
They can be built separately, but it is preferred (and easier) to built them together with `docker-compose`.

To learn more, please read `README`s in `frontend` and `backend` folders.

## How to run

1. Make sure you have Docker and Docker-compose installed on your machine:
```
docker --version; docker-compose --version
```
(We use Compose file version 3.2, so make sure you have Docker Engine release 17.04.0+)

2. Build the Docker images for frontend and backend and run them simultaneously:
```
docker-compose up
```
(You will see that there are also tests running with each start. If they do not pass for some reason, please, let us know.)
