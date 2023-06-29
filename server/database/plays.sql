BEGIN;
DROP TABLE IF EXISTS shows;
DROP TABLE IF EXISTS theatres;

CREATE TABLE theatres (
    theatre_id SERIAL PRIMARY KEY,
    theatre_name VARCHAR UNIQUE NOT NULL,
    location VARCHAR UNIQUE NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE shows (
    show_id SERIAL PRIMARY KEY,
    show_name VARCHAR UNIQUE NOT NULL,
    show_description VARCHAR NOT NULL,
    ticket_price INT NOT NULL,
    end_date VARCHAR NOT NULL,
    genre VARCHAR,
    show_duration VARCHAR,
    poster_url VARCHAR,
    theatre_id INT REFERENCES theatres(theatre_id)
);

INSERT INTO theatres
    (theatre_name, location, capacity)
VALUES 
    ('The Other Palace', '12 Palace St, London SW1E 5JA, United Kingdom', 312),
    ('Theatre Royal Drury Lane', 'Catherine St, London WC2B 5JF, United Kingdom', 2196),
    ('Shakespeares Globe', '21 New Globe Walk, London SE1 9DT, United Kingdom', 1500),
    ('The Phantom Theatre', '123 Phantom Ln, London WC2B 5JF, United Kingdom', 2500),
    ('Victoria Palace Theatre', 'Victoria Palace , London, United Kingdom , SW1E 5EA', 1517);

INSERT INTO shows
    (show_name, show_description, ticket_price, end_date, genre, show_duration, poster_url, theatre_id)
VALUES
    ('Heathers the Musical', 'Toms favourite musical', 30, '03/09/2023', 'musical', '2h 15m', 'https://m.media-amazon.com/images/M/MV5BOGQ1YmM5OWUtY2VmOS00NWU2LWE3NzQtNjY5ZDQ3OTZiYzQyXkEyXkFqcGdeQXVyNzkyMDA5MTc@._V1_FMjpg_UX1000_.jpg', 1),
    ('Frozen the Musical', 'Open up the gates and walk into a winter wonderland at the Disney musical.', 37, '03/12/2023', 'musical', '2h 15m', 'https://s.yimg.com/ny/api/res/1.2/P0ZOW6x1do9g7vJp4uzrDA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTg3NA--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2020-03/97523e80-5d5e-11ea-adef-c32f9a0dbd16', 2),
    ('The Tempest', 'Shakespeares masterpiece set on a remote island, where Prospero, the rightful Duke of Milan, plots to restore his daughter Miranda to her rightful place.', 20, '03/10/2023', 'play', '2h 30m', 'https://images.ctfassets.net/6pezt69ih962/4FhmbBZHDMjIzOSXWSJTad/c8da2698575ff5d9dfda12ca6b7f0c6d/Globe_TheTempest22_TodayTix_480x720.png', 3),
    ('Phantom of the Opera', 'A haunting musical about a disfigured musician who lives in the bowels of the Paris Opera House.', 50, '03/12/2023', 'musical', '2h 45m', 'https://alternativemovieposters.com/wp-content/uploads/2012/12/phantombg.jpg', 4),
    ('Hamilton', 'Watch the revolutionary create the USA in Lin-Manuel Mirandas historic musical.', 101, 'Indefinite', 'musical', '2h 40m', 'https://m.media-amazon.com/images/I/91JBfHSGuaL._AC_UF894,1000_QL80_.jpg', 5);

COMMIT;
