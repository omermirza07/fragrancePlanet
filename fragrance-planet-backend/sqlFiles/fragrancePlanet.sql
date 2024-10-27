-- Create the fragrancePlanet database
CREATE DATABASE IF NOT EXISTS fragrancePlanet;

-- Use the fragrancePlanet database
USE fragrancePlanet;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the colognes table
CREATE TABLE IF NOT EXISTS colognes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    imagePath VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    cologneId INT,
    rating INT NOT NULL,
    comment TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (cologneId) REFERENCES colognes(id)
);

-- Insert sample data into the colognes table
INSERT INTO colognes (name, brand, description, price, imagePath, createdAt, updatedAt) VALUES
('Acqua Di Gio', 'Giorgio Armani', 'A classic aquatic fragrance for men', 75.99, '/images/acqua_di_gio.jpg', NOW(), NOW()),
('Bleu de Chanel', 'Chanel', 'A sophisticated blend of citrus and woody notes, evoking a sense of timeless elegance.', 99.99, '/images/bleu_de_chanel.jpg', NOW(), NOW()),
('Burberry Brit', 'Burberry', 'A fresh fragrance with a hint of citrus and spice', 65.00, '/images/burberry_brit.jpg', NOW(), NOW()),
('Dior Sauvage', 'Dior', 'An iconic fragrance with fresh, spicy notes and a hint of ambroxan.', 89.99, '/images/dior_sauvage.jpg', NOW(), NOW()),
('Hugo Boss Bottled', 'Hugo Boss', 'A bold and masculine scent with an energizing blend of citrus.', 70.00, '/images/hugo_boss_bottled.jpg', NOW(), NOW()),
('Paco Rabanne 1 Million', 'Paco Rabanne', 'A bold blend of spice and leather, for the modern man.', 85.00, '/images/paco_rabanne_1_million.jpg', NOW(), NOW()),
('Prada Luna Rossa', 'Prada', 'A sporty, energetic fragrance with a fresh and aromatic scent.', 79.99, '/images/prada_luna_rossa.jpg', NOW(), NOW()),
('Tom Ford Noir', 'Tom Ford', 'An oriental woody fragrance with warm and spicy notes.', 120.00, '/images/tom_ford_noir.jpg', NOW(), NOW()),
('Versace Eros', 'Versace', 'A bold mix of mint, vanilla, and tonka bean, symbolizing passion and power.', 75.99, '/images/versace_eros.jpg', NOW(), NOW()),
<<<<<<< HEAD
('Yves Saint Laurent LHomme', 'Yves Saint Laurent', 'A fresh, masculine scent with notes of ginger and spice.', 95.00, '/images/yves_saint_laurent_lhomme.jpg', NOW(), NOW());
=======
('Yves Saint Laurent LHomme', 'Yves Saint Laurent', 'A fresh, masculine scent with notes of ginger and spice.', 95.00, '/images/yves_saint_laurent_lhomme.jpg', NOW(), NOW());
>>>>>>> 184342018 (Commit all current changes to main)
