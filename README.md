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
3. You will be promted to login to your school account. This is because we use 
Docker image from another FIT CTU GitLab Registry, so for now this application is
available only to students/employees of our faculty. (Your credentials will be
saved, so you have to login only for the first itme. For more information see
[Docker documentation](https://docs.docker.com/engine/reference/commandline/login/#credentials-store)).
4. After successful login the application should be up and running (you will see that there are also tests running with each start. If they do not pass for some reason, please, let us know).
