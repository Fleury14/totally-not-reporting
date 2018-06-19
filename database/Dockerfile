FROM postgres:latest

ADD init.sql /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/init.sql

# RUN mkdir docker-entrypoint-initdb.d

