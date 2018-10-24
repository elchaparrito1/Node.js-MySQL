DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(200) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(11) NULL,
  product_sales DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id)
);


SELECT * FROM bamazon.products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toy Boat", "Toy Department", 2.50, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Cards", "Toy Department", 3.10, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Action Figure", "Toy Department", 21.50, 1100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics Department", 650, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ipad", "Electronics Department", 750, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Athletic Department", 45.50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Apparel Department", 45, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Face Cream", "Cosmetic Department", 22.76, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gatorade", "Food Department", 2.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Interstellar", "Entertainment Department", 10, 100);