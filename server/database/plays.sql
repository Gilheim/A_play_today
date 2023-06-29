

DROP TABLE IF EXISTS theatres;
DROP TABLE IF EXISTS shows;

CREATE TABLE theatres (
    theatre_id INT GENERATED ALWAYS AS IDENTITY,
    theatre_name VARCHAR UNIQUE NOT NULL,
    location VARCHAR UNIQUE NOT NULL,
    capacity INT NOT NULL,
    PRIMARY KEY (theatre_id)
);

CREATE TABLE shows (
    show_id INT GENERATED ALWAYS AS IDENTITY,
    show_name VARCHAR UNIQUE NOT NULL,
    show_description VARCHAR NOT NULL,
    ticket_price_£ INT NOT NULL,
    end_date VARCHAR NOT NULL,
    genre VARCHAR,
    show_duration VARCHAR,
    poster_url VARCHAR,
    theatre_id INT NOT NULL,
    PRIMARY KEY (show_id),
    FOREIGN KEY (theatre_id) REFERENCES theatres("theatre_id")

);

INSERT INTO theatres
    (theatre_name, location, capacity)
VALUES 
    ('The Other Palace', '12 Palace St, London SW1E 5JA, United Kingdom', 312);

INSERT INTO shows
    (show_name, show_description, ticket_price_£, end_date, genre, show_duration, poster_url, theatre_id)
VALUES
    ('Heathers the Musical', 'Tom''s favourite musical', 30, '03/09/2023', 'musical', '2h 15m', 'https://m.media-amazon.com/images/M/MV5BOGQ1YmM5OWUtY2VmOS00NWU2LWE3NzQtNjY5ZDQ3OTZiYzQyXkEyXkFqcGdeQXVyNzkyMDA5MTc@._V1_FMjpg_UX1000_.jpg', 1);