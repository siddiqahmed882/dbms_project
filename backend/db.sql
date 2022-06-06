-- create database
CREATE DATABASE proshop;

-- switch database 
\c proshop;

-- create user table
CREATE TABLE users(
    user_id BIGSERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_tel VARCHAR(11) NOT NULL CHECK(LENGTH(user_tel) = 11),
    user_address VARCHAR(255) NOT NULL,
    user_avatar VARCHAR(255) NOT NULL,
    user_type VARCHAR(10) DEFAULT 'customer',
    refresh_token VARCHAR(255)
);

CREATE TABLE admin(
    user_type VARCHAR(10) DEFAULT 'admin'
) INHERITS(users);

-- create category table
CREATE TABLE categories(
    category_id BIGSERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

-- create products table
CREATE TABLE products(
    product_id BIGSERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_price INT NOT NULL CHECK(product_price >= 0),
    product_image VARCHAR(255) NOT NULL,
    product_description TEXT NOT NULL,
    product_count_in_stock INT NOT NULL,
    product_brand VARCHAR(50) NOT NULL,
    category_id BIGINT,
    CONSTRAINT fk_category 
        FOREIGN KEY(category_id) 
            REFERENCES categories(category_id) 
                ON DELETE SET NULL
);

-- create reviews table
CREATE TABLE reviews(
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    review_body TEXT NOT NULL,
    review_date_time TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
            REFERENCES users(user_id) 
                ON DELETE CASCADE,
    CONSTRAINT fk_product 
        FOREIGN KEY(product_id) 
            REFERENCES products(product_id) 
                ON DELETE CASCADE,
    PRIMARY KEY(user_id, product_id)
);

-- create users table
CREATE TABLE orders(
    order_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_date_time TIMESTAMP NOT NULL DEFAULT NOW(),
    order_status VARCHAR(10) NOT NULL DEFAULT 'pending',
    order_total_price INT NOT NULL CHECK(order_total_price >= 0),
    order_shipping_address VARCHAR(255) NOT NULL,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
            REFERENCES users(user_id) 
                ON DELETE CASCADE
);

-- create order items table
CREATE TABLE order_item(
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    order_item_qty INT NOT NULL CHECK(order_item_qty > 0),
    CONSTRAINT fk_order 
        FOREIGN KEY(order_id) 
            REFERENCES orders(order_id) 
                ON DELETE CASCADE,
    CONSTRAINT fk_product 
        FOREIGN KEY(product_id) 
            REFERENCES products(product_id) 
                ON DELETE CASCADE,
    PRIMARY KEY(order_id, product_id);
)


-- get all users
SELECT * FROM users;

-- get order
SELECT * FROM orders LEFT JOIN order_item USING (order_id) WHERE order_id = 34;