FROM pet3rmatta/alibc AS build

RUN apk add --no-cache build-base \
                        libexecinfo-dev \
                        libxml2-dev

COPY . /srv/backend

WORKDIR /srv/backend

RUN make interface

# Runtime stage
FROM python:3.6.5-alpine AS runtime

RUN apk add --no-cache libstdc++ libxml2-dev

COPY --from=build /srv/backend /srv/backend
COPY --from=build /usr/lib/libalib2*.so /usr/lib/

WORKDIR /srv/backend

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

CMD [ "python", "bin/run.py" ]

