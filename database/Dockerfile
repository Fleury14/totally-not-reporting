FROM clkao/postgres-plv8:latest

ADD init.sql /docker-entrypoint-initdb.d/

ADD tnr-data.sql /docker-entrypoint-initdb.d/

COPY . /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/init.sql

RUN chmod +x /docker-entrypoint-initdb.d/tnr-data.sql

# RUN mkdir docker-entrypoint-initdb.d

