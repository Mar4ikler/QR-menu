CREATE TABLE users
(
    user_id   int identity (1,1) PRIMARY KEY,
    username   varchar(250)  NOT NULL,
    email      varchar(250)  NOT NULL,
    password   varchar(250)   NOT NULL,
);
INSERT INTO users (username, email, [password])
                   values ('admin', 'marklevsha4@gmail.com', '1111');
drop table users;
select * from users;


CREATE TABLE restaurants
(
    restaurant_id         int PRIMARY KEY,
    restaurant_name       varchar(250)    NOT NULL,
    description        varchar(500)   NOT NULL,
);
drop table restaurants;
select * from restaurants;
INSERT INTO restaurants (restaurant_id, restaurant_name, description)
VALUES (1, 'Pizza Tempo', 'Welcome!');
DELETE from restaurants where restaurant_id=1;

CREATE TABLE categories
(
    category_id   int identity (1,1) PRIMARY KEY,
    category_name varchar(250) NOT NULL,
    restaurant_id  int NOT NULL,
);
drop table categories;
select * from categories;


CREATE TABLE dishes
(
    dish_id     int identity (1,1) PRIMARY KEY,
    dish_name    varchar(250)  NOT NULL,
    description       varchar(500)  NOT NULL,
    price    decimal(10, 2) NOT NULL,
    category_id   int NOT NULL,
);
drop table dishes;
select * from dishes;

ALTER TABLE users
DROP CONSTRAINT uemail;

ALTER TABLE restaurants
    ADD CONSTRAINT restaurant_ibfk_1 FOREIGN KEY (restaurant_id) REFERENCES users (user_id);
ALTER TABLE categories
    ADD CONSTRAINT category_ibfk_1 FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id) ON DELETE CASCADE;
ALTER TABLE dishes
    ADD CONSTRAINT dish_ibfk_1 FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE;

ALTER TABLE categories
    ADD CONSTRAINT ucategory_name UNIQUE (category_name);
ALTER TABLE dishes
    ADD CONSTRAINT udish_name UNIQUE (dish_name);
ALTER TABLE users
    ADD CONSTRAINT uemail UNIQUE (email);





