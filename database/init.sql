-- create table

DROP TABLE IF EXISTS movies_meta;

-- IF OBJECT_ID('movies', 'U') IS NOT NULL 
--   DROP TABLE movies; 

CREATE TABLE movies_meta (
    adult boolean,
    budget int,
    original_title VARCHAR(255),
    overview VARCHAR(2000),
    popularity float,
    release_date DATE,
    revenue float,
    runtime int,
    tagline VARCHAR(500),
    title VARCHAR(255),
    vote_average float,
    vote_count int
);

-- TODO: include genres


COPY movies_meta (adult,budget,original_title, overview, popularity, release_date, revenue, runtime, tagline, title, vote_average, vote_count )
FROM E'//docker-entrypoint-initdb.d//movies_metadata.csv' DELIMITER ',' CSV HEADER;

-- (adult,budget,genres,homepage,original_title,popularity, production, release_date, revenue, runtime, tagline, title, vote_average, vote_count )