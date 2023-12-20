create table customers (
	id INT,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(256)
);



-- Create the products table
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2)
    imageUrl VARCHAR(255)
);

-- Insert the data
INSERT INTO products (name, description, price, imageUrl) VALUES
('JOEs Club', 'Joes Classic Bread, Vegan Pesto, Avocado, Chicken, Tomato', 69.00),
('Tunacado', 'Joes Classic Bread, Vegan Pesto, Tuna, Avocado, Tomato', 69.00),
('Serrano', 'Joes Classic Bread, Avocado, Serrano ham, Mozzarella, Tomato, Vegan Pesto', 69.00),
('VAVO (Vegan Avocado)', 'Avocado, Tomato, Joe’s Classic Bread, Spinach, Vegan Pesto', 69.00),
('Avocado', 'Joes Classic Bread, Vegan Pesto, Avocado, Mozzarella, Tomato', 69.00),
('Spicy Tuna', 'Joes Classic Bread, Vegan Pesto, Tuna, Tomato, Jalapenos, Tabasco', 69.00),  
('Turkey', 'Joes Classic Bread, Vegan Pesto, Turkey', 69.00),
('JOEs Green Mile', 'Apple, Ice, Spinach, Avocado, Broccoli', 69.00),
('JOEs Identity', 'Cucumber, Ice, Spinach, Broccoli, Kale Lemon, Olive Oil', 69.00),
('Green Shield', 'Apple, Ice, Spinach, Kale, Broccoli, Cucumber, Olive Oil', 69.00),
('Herb Tonic', 'Apple, Ginger, Pineapple, Red Bell Pepper, Olive Oil, Pepper, Ice, Turmeric', 69.00);


CREATE TABLE placedorders (
    placedorders_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    date TIMESTAMP
);


ALTER TABLE placedorders
ADD CONSTRAINT fk_customer_id
FOREIGN KEY (customer_id)
REFERENCES customers(customer_id);

ALTER TABLE placedorders
ADD CONSTRAINT fk_product_id
FOREIGN KEY (product_id)
REFERENCES products(product_id);



CREATE TABLE admins (
  id INT,
	username VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50)
);
