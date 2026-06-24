sql
-- 1. Kutubxona a'zolari

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    membership_type VARCHAR(20) DEFAULT 'Oddiy'
);

INSERT INTO members (full_name, phone_number)
VALUES ('Anvar', '998901111111');

INSERT INTO members (full_name, phone_number)
VALUES ('Dilshod', '998902222222');

-- UNIQUE xato beradi
INSERT INTO members (full_name, phone_number)
VALUES ('Sardor', '998901111111');


-- 2. Avtomobil ijarasi

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    model VARCHAR(50),
    price_per_day INT CHECK(price_per_day >= 100000)
);


INSERT INTO cars (model, price_per_day)
VALUES ('Cobalt', 120000);

INSERT INTO cars (model, price_per_day)
VALUES ('Malibu', 200000);

-- CHECK xato beradi
INSERT INTO cars (model, price_per_day)
VALUES ('Spark', 90000);


-- 3. Kasalxona tizimi

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100)
);

CREATE TABLE medical_cards (
    id SERIAL PRIMARY KEY,
    card_number VARCHAR(20),
    patient_id INT UNIQUE REFERENCES patients(id)
);

INSERT INTO patients (full_name)
VALUES ('Jamshid');

INSERT INTO medical_cards (card_number, patient_id)
VALUES ('MC001', 1);

-- UNIQUE sababli xato beradi
INSERT INTO medical_cards (card_number, patient_id)
VALUES ('MC002', 1);


-- 4. Restoran va taomlar

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    dish_name VARCHAR(100),
    restaurant_id INT REFERENCES restaurants(id)
);

INSERT INTO restaurants (name)
VALUES ('Milliy Taomlar');

INSERT INTO dishes (dish_name, restaurant_id)
VALUES
('Osh',1),
('Shashlik',1),
('Manti',1);


-- 5. Kino platformasi

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100)
);

CREATE TABLE actors (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100)
);

CREATE TABLE movie_actors (
    movie_id INT REFERENCES movies(id),
    actor_id INT REFERENCES actors(id),
    PRIMARY KEY(movie_id, actor_id)
);


-- 6. Do'kon va xaridlar

CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    shop_name VARCHAR(100)
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    shop_id INT REFERENCES shops(id)
);

INSERT INTO shops (shop_name)
VALUES ('Tech Store'),
       ('Market 24');

INSERT INTO sales (product_name, shop_id)
VALUES ('Laptop',1),
       ('Telefon',1),
       ('Suv',2);

SELECT s.shop_name,
       sa.product_name
FROM shops s
INNER JOIN sales sa
ON s.id = sa.shop_id;


-- 7. FULL JOIN

SELECT s.shop_name,
       sa.product_name
FROM shops s
FULL JOIN sales sa
ON s.id = sa.shop_id;


-- 8. Alias (AS)

SELECT AVG(price_per_day) AS average_price
FROM cars;


-- 9. Subquery

SELECT *
FROM cars
WHERE price_per_day >
(
    SELECT AVG(price_per_day)
    FROM cars
);


-- 10. DATE, TIME, TIMESTAMP

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    flight_date DATE,
    flight_time TIME,
    departure_time TIMESTAMP
);

INSERT INTO flights
(flight_date, flight_time, departure_time)
VALUES
('2025-06-20',
 '14:30:00',
 '2025-06-20 14:30:00');


-- 11. DEFAULT NOW()

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO comments (comment_text)
VALUES ('Ajoyib maqola');


-- 12. Indexlar

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100)
);

INSERT INTO customers(full_name)
SELECT 'Customer ' || generate_series(1,100000);

EXPLAIN ANALYZE
SELECT *
FROM customers
WHERE full_name = 'Customer 50000';

CREATE INDEX idx_customers_name
ON customers(full_name);

EXPLAIN ANALYZE
SELECT *
FROM customers
WHERE full_name = 'Customer 50000';


-- Challenge

CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    hotel_name VARCHAR(100),
    city VARCHAR(50)
);

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    room_number VARCHAR(20),
    price_per_night NUMERIC(10,2),
    hotel_id INT REFERENCES hotels(id)
);

CREATE TABLE bookings_customers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES bookings_customers(id),
    room_id INT REFERENCES rooms(id),
    check_in DATE,
    check_out DATE
);

