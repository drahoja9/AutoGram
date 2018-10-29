FROM pet3rmatta/alibc AS build

RUN apk add --no-cache build-base \
                        libexecinfo-dev \
                        libxml2-dev

COPY . /srv/Backend

WORKDIR /srv/Backend

RUN make interface

# Runtime stage
FROM python:3.6.5-alpine AS runtime

RUN apk add --no-cache libstdc++ libxml2-dev

COPY --from=build /srv/Backend /srv/Backend
COPY --from=build /usr/lib/libalib2*.so /usr/lib/

WORKDIR /srv/Backend

RUN pip install --upgrade pip && \
    pip install -r requirements.txt
