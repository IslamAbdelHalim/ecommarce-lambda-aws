CREATE DATABASE IF NOT EXISTS ecommerce_db;

USE ecommerce_db;

CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_pic VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS refresh_token (
  token_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token VARCHAR(255),
  CONSTRAINT refresh_user_toke_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_addresses (
  address_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  street VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255) NOT NULL,
  country VARCHAR(255) Not NULL,
  is_deleted BOOLEAN DEFAULT false,
  CONSTRAINT address_user_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS carts (
  cart_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  CONSTRAINT cart_user_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS cart_items (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT cart_item_with_cart_fk FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
  CONSTRAINT cart_item_with_products_fk FOREIGN KEY (product_id) REFERENCES products(product_id)
);
