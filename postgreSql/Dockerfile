ARG POSTGRES_VERSION=17

FROM postgres:${POSTGRES_VERSION}-trixie

ENV POSTGRES_DB=demo_db \
    POSTGRES_USER=demo_user \
    POSTGRES_PASSWORD=demo_pass

COPY init.sql /docker-entrypoint-initdb.d/01-init.sql

EXPOSE 5432

VOLUME ["/var/lib/postgresql/data"]