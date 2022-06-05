-- Dump Categories
INSERT INTO categories (category_name) VALUES
  ('smart phone'),
  ('camera'),
  ('consoles'),
  ('accessories');

-- Dump Products
INSERT INTO products (product_name, product_price, product_image, product_description, product_count_in_stock, product_brand, category_id) VALUES 
  (
    'Airpods Wireless Bluetooth Headphones', 
    89.99, 
    '/images/airpods.jpg', 
    'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    30, 
    'Apple', 
    4
  ),
  (
    'iPhone 11 Pro 256GB Memory',
    599.99,
    '/images/phone.jpg',
    'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    7,
    'Apple',
    1
  ),
  (
    'Cannon EOS 80D DSLR Camera',
    929.99,
    '/images/camera.jpg',
    'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    5,
    'Cannon',
    2
  ),
  (
    'Sony Playstation 4 Pro White Version',
    399.99,
    '/images/playstation.jpg',
    'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    11,
    'Sony',
    3
  ),
  (
    'Logitech G-Series Gaming Mouse',
    49.99,
    '/images/mouse.jpg',
    'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    7,
    'Logitech',
    4
  ),
  (
    'Amazon Echo Dot 3rd Generation',
    29.99,
    '/images/alexa.jpg',
    'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    0,
    'Amazon',
    4
  );