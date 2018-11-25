# Build stage
#FROM gitlab.fit.cvut.cz:5000/algorithms-library-toolkit/automata-library:v0.0.1 AS build
FROM pet3rmatta/alibc AS build

WORKDIR /srv/Backend

COPY ./backend/cpp_interface.cpp /srv/Backend/backend/cpp_interface.cpp
COPY ./Makefile /srv/Backend/Makefile

# Install tools required to build a C++ interface for ALT library
# Run `docker build --no-cache .` to update dependencies
RUN apk add --no-cache build-base \
                        libexecinfo-dev \
                        libxml2-dev
                        
# Compiling C++ interface as separate command as this can change more frequently
# than dependency libraries
RUN make interface

        
# Runtime stage
FROM python:3.6.5-alpine AS runtime

WORKDIR /srv/Backend

ENV FLASK_APP=backend/api.py

# Install libraries necessary for application to run
# These will probably never change, so we leverage the cache
RUN apk add --no-cache libstdc++ libxml2-dev

# Copying from previous stage (build) the built interface and the whole ALT library
# This won't probably change either, so same as above
COPY --from=build /srv/Backend/build /srv/Backend/build
COPY --from=build /usr/lib/libalib2*.so* /usr/lib/

# Copy list of required packages and install them through pip
# This way,  copying and installing the packages is re-done only when something changes in requirements.txt
COPY ./requirements.txt /srv/Backend/requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt 

# Copying rest of the project (source code mainly ) at last as this will change most frequently
COPY . /srv/Backend

ENTRYPOINT ["flask", "run"]
