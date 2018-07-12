-- create table

DROP TABLE IF EXISTS movies_meta;

-- IF OBJECT_ID('movies', 'U') IS NOT NULL 
--   DROP TABLE movies; 

CREATE TABLE movies_meta (
    adult boolean,
    budget int,
    movie_id int,
    original_title VARCHAR(255),
    overview VARCHAR(2000),
    popularity float,
    release_date DATE,
    revenue float,
    runtime int,
    tagline VARCHAR(500),
    title VARCHAR(255)
);

DROP TABLE IF EXISTS movies_credits;

CREATE TABLE movies_credits (
    movie_cast VARCHAR(32768),
    crew VARCHAR(32768),
    credit_id int
);
-- TODO: include genres

DROP TABLE IF EXISTS movie_vote;

CREATE TABLE movies_vote (
    vote_id int,
    vote_average float,
    vote_count int
);

DROP TABLE IF EXISTS movie_posters;

CREATE TABLE movie_posters (
    poster_id int,
    poster_path VARCHAR(500),
    poster_title VARCHAR(500)
);



COPY movies_meta (adult,budget, movie_id, original_title, overview, popularity, release_date, revenue, runtime, tagline, title )
FROM E'//docker-entrypoint-initdb.d//movies_metadata-dos.csv' DELIMITER ',' CSV HEADER;

COPY movies_credits (movie_cast, crew, credit_id )
FROM E'//docker-entrypoint-initdb.d//movies_credits.csv' DELIMITER ',' CSV HEADER;

COPY movies_vote (vote_id, vote_average, vote_count )
FROM E'//docker-entrypoint-initdb.d//movies_vote_info.csv' DELIMITER ',' CSV HEADER;

COPY movie_posters (poster_id, poster_path, poster_title )
FROM E'//docker-entrypoint-initdb.d//movies_posters2.csv' DELIMITER ',' CSV HEADER;
-- (adult,budget,genres,homepage,original_title,popularity, production, release_date, revenue, runtime, tagline, title, vote_average, vote_count )