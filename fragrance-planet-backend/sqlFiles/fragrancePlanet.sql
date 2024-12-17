-- create the fragrancePlanet database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS fragrancePlanet;

-- select the fragrancePlanet database to use
USE fragrancePlanet;

-- create the users table to store user information
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,                          -- unique user id with auto-increment
    username VARCHAR(255) NOT NULL,                             -- username, required field
    email VARCHAR(255) UNIQUE NOT NULL,                         -- unique email for each user, required field
    password VARCHAR(255) NOT NULL,                             -- hashed password, required field
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,               -- timestamp for when the user is created
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- timestamp updates on record change
);

-- create the colognes table to store cologne details
CREATE TABLE IF NOT EXISTS colognes (
    id INT AUTO_INCREMENT PRIMARY KEY,                          -- unique cologne id with auto-increment
    name VARCHAR(255) NOT NULL,                                 -- cologne name, required field
    brand VARCHAR(255) NOT NULL,                                -- brand name of the cologne, required field
    description TEXT,                                           -- description of the cologne
    price DECIMAL(10, 2) NOT NULL,                              -- price of the cologne with two decimal places
    imagePath VARCHAR(255)                                      -- path to the image file for the cologne
);

-- create the favorites table to store user favorites
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,                          -- unique favorite id with auto-increment
    userId INT,                                                 -- id of the user who added the favorite
    cologneId INT,                                              -- id of the cologne marked as favorite
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,               -- timestamp for when the favorite was added
    FOREIGN KEY (userId) REFERENCES users(id),                  -- foreign key linking to the users table
    FOREIGN KEY (cologneId) REFERENCES colognes(id)             -- foreign key linking to the colognes table
);


-- Insert sample data into the colognes table
REPLACE INTO colognes (name, brand, description, price, imagePath) VALUES
('Acqua Di Gio', 'Giorgio Armani', 'A classic aquatic fragrance for men', 75.99, '/images/acqua_di_gio.jpg'),
('Bleu de Chanel', 'Chanel', 'A sophisticated blend of citrus and woody notes, evoking a sense of timeless elegance.', 99.99, '/images/bleu_de_chanel.jpg'),
('Burberry Brit', 'Burberry', 'A fresh fragrance with a hint of citrus and spice', 65.00, '/images/burberry_brit.jpg'),
('Dior Sauvage', 'Dior', 'An iconic fragrance with fresh, spicy notes and a hint of ambroxan.', 89.99, '/images/dior_sauvage.jpg'),
('Hugo Boss Bottled', 'Hugo Boss', 'A bold and masculine scent with an energizing blend of citrus.', 70.00, '/images/hugo_boss_bottled.jpg'),
('Paco Rabanne 1 Million', 'Paco Rabanne', 'A bold blend of spice and leather, for the modern man.', 85.00, '/images/paco_rabanne_1_million.jpg'),
('Prada Luna Rossa', 'Prada', 'A sporty, energetic fragrance with a fresh and aromatic scent.', 79.99, '/images/prada_luna_rossa.jpg'),
('Tom Ford Noir', 'Tom Ford', 'An oriental woody fragrance with warm and spicy notes.', 120.00, '/images/tom_ford_noir.jpg'),
('Versace Eros', 'Versace', 'A bold mix of mint, vanilla, and tonka bean, symbolizing passion and power.', 75.99, '/images/versace_eros.jpg'),
('Yves Saint Laurent LHomme', 'Yves Saint Laurent', 'A fresh, masculine scent with notes of ginger and spice.', 95.00, '/images/yves_saint_laurent_lhomme.jpg'),
('Perry Ellis 360° red', 'Perry Ellis', '360° Red for Men by Perry Ellis is a Oriental Spicy fragrance for men.', 40.99, '/images/360 red.jpg'),
('Afnan 9pm', 'Afnan', 'a Oriental Vanilla fragrance for men', 60.99, '/images/afnan 9pm.jpg'),
('Acqua Di Gio Absolu', 'Giorgio Armani', 'Acqua di Giò Absolu is a bold interpretation of the Classic Acqua di Giò fragrance', 78.00, '/images/absolu.jpg'),
('Creed Aventus', 'Creed', 'a Chypre Fruity fragrance for men.', 459.99, '/images/aventus.jpg'),
('Baccarat Rouge 540', 'Maison Francis Kurkdjian', 'a Oriental Floral fragrance for women and men', 469.99, '/images/baccarat.jpg'),
('Bentley for Men Intense', 'Bentley','a Oriental Spicy fragrance for men.', 52.99, '/images/bentley intense.jpg'),
('Black Orchid', 'Tom Ford', 'a Oriental Floral fragrance for women', 229.99, '/images/black orchid.jpg'),
('Chanel no.5', 'Chanel', 'a Floral Aldehyde fragrance for women', 172.00, '/images/chanel no 5.jpg'),
('club de nuit', 'Armaf', 'a Woody Spicy fragrance for men.', 41.99, '/images/club de nuit.jpg'),
('Dylan Blue', 'Versace', ' a Aromatic Fougere fragrance for men.', 105.99, '/images/dylan.jpg'),
('Eau de Fraiche', 'Versace', 'a Woody Aquatic fragrance for men.', 76.99, '/images/eau de fraiche.jpg'),
('Epic Man', 'Amouage', 'a Oriental Woody fragrance for men.', 282.99, '/images/epic man.jpg'),
('Gucci Guilty', 'Gucci', 'a Oriental Woody fragrance for men', 139.99, '/images/gucci guilty.jpg'),
('Hawas', 'Rasasi', 'A fragrance that captures the adventurous, exploratory and evocative spirit of the modern man.', 83.99, '/images/hawas.jpg'),
('Sel Marin', 'James Heeley', 'a Aromatic Aquatic fragrance for women and men.', 183.00, '/images/heeley sel marin.jpg'),
("Burberry Hero", 'Burberry', 'A woody and musky fragrance for men', 145.99, '/images/hero.jpg');

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Imagination', 'Louis Vuitton', 'a Citrus Aromatic fragrance for men.', 330.00, '/images/imagination.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Imagination'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Immitation Man', 'Amouage', 'a Leather fragrance for men.', 406.99, '/images/imitation man.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Immitation Man'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Lafayette Street', 'Bond No.9', 'a Oriental Fougere fragrance for women and men.', 450.00, '/images/lafayette.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Lafayette Street'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Layton', 'Parfums de Marley', 'a Oriental Floral fragrance for women and men.', 365.00, '/images/layton.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Layton'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Le Male', 'Jean Paul Gaultier', 'a Oriental Fougere fragrance for men.', 330.00, '/images/le male.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Le Male'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Imagination', 'Louis Vuitton', 'a Citrus Aromatic fragrance for men.', 330.00, '/images/imagination.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Imagination'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Pacific Chill', 'Louis Vuitton', 'A refreshing aromatic fragrance inspired by the ocean.', 400.00, '/images/lv_pacific_chill.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Pacific Chill'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Man in Black', 'Bvlgari', 'A bold and spicy fragrance for men.', 120.00, '/images/man_in_black.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Man in Black'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Météore', 'Louis Vuitton', 'A dynamic and fresh fragrance for men.', 330.00, '/images/meteore.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Météore'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Musc Ravageur', 'Frederic Malle', 'A bold and sensual fragrance for men and women.', 290.00, '/images/musc_ravageur.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Musc Ravageur'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Myself', 'Yves Saint Laurent', 'A bold, intense fragrance for men.', 350.00, '/images/myself.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Myself'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Neroli Portofino', 'Tom Ford', 'A luxurious citrus fragrance inspired by the Italian Riviera.', 250.00, '/images/neroli.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Neroli Portofino'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Ombré Leather', 'Tom Ford', 'A smooth and spicy leather fragrance.', 150.00, '/images/ombre_leather.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Ombré Leather'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Oud Wood', 'Tom Ford', 'A smoky and luxurious woody fragrance.', 220.00, '/images/oud_wood.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Oud Wood'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Polo Deep Blue', 'Ralph Lauren', 'A deep and invigorating aquatic fragrance.', 125.00, '/images/polo_blue.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Polo Deep Blue'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Light Blue', 'Dolce & Gabbana', 'A fresh citrus fragrance for men.', 80.00, '/images/light_blue.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Light Blue'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Y Eau de Parfum', 'Yves Saint Laurent', 'A bold and aromatic fragrance for men.', 110.00, '/images/ysl_y.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Y Eau de Parfum'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Amber Pour Homme', 'Prada', 'A luxurious amber-infused fragrance for men.', 105.00, '/images/prada_amber_pour_homme.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Amber Pour Homme'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Silver Mountain Water', 'Creed', 'A fresh and sophisticated aquatic fragrance.', 310.00, '/images/silver_water.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Silver Mountain Water'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Spicebomb Extreme', 'Viktor & Rolf', 'An intense and spicy fragrance for men.', 125.00, '/images/spicebomb_extreme.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Spicebomb Extreme'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Stronger With You', 'Emporio Armani', 'A warm and addictive fragrance for men.', 85.00, '/images/stronger_with_you.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Stronger With You'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Tobacco Vanille', 'Tom Ford', 'A rich and luxurious tobacco-infused fragrance.', 310.00, '/images/tobacco_vanille.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Tobacco Vanille'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Toy Boy', 'Moschino', 'A playful and bold woody-spicy fragrance.', 95.00, '/images/toy_boy.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Toy Boy'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Black Opium', 'Yves Saint Laurent', 'A seductive and mysterious fragrance for women.', 130.00, '/images/ysl_black_opium.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Black Opium'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Azzaro The Most Wanted', 'Azzaro', 'A warm and intense fragrance for men with a spicy and woody composition.', 95.00, '/images/azarro_most_wanted.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Azzaro The Most Wanted'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Bvlgari Tygar', 'Bvlgari', 'A bold citrus and woody fragrance for men inspired by nature.', 220.00, '/images/bvlgari_tygar.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Bvlgari Tygar'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Montblanc Legend Spirit', 'Montblanc', 'A fresh and invigorating aromatic fragrance for men.', 75.00, '/images/mont_legend_spirit.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Montblanc Legend Spirit'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Polo Deep Blue', 'Ralph Lauren', 'An aquatic and energizing fragrance for men.', 125.00, '/images/polo_deep_blue.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Polo Deep Blue'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Chanel Allure Homme Sport', 'Chanel', 'A dynamic and sporty fragrance for men.', 150.00, '/images/chanel_allure_homme_sport.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Chanel Allure Homme Sport'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Van Cleef Precious Oud', 'Van Cleef & Arpels', 'An elegant and rich fragrance with oud as its core.', 350.00, '/images/vancleef_precious_oud.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Van Cleef Precious Oud'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Santal 33', 'Le Labo', 'A unisex fragrance with a unique blend of woody and spicy notes.', 300.00, '/images/le_labo_santal33.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Santal 33'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Ani', 'Nishane', 'A luxurious oriental fragrance with a blend of vanilla and spices.', 250.00, '/images/nishane_ani.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Ani'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Terre d\'Hermès Intense Vetiver', 'Hermès', 'An earthy and fresh fragrance centered around vetiver.', 150.00, '/images/terre_dhermes_intensevetiver.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Terre d\'Hermès Intense Vetiver'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Babycat', 'Yves Saint Laurent', 'A sweet and smoky vanilla-based fragrance.', 200.00, '/images/yslbabycat.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Babycat'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Tuxedo', 'Yves Saint Laurent', 'An elegant and spicy patchouli fragrance.', 210.00, '/images/ysltuxedo.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Tuxedo'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT '37 Rue de Bellechasse', 'Yves Saint Laurent', 'A luxurious oud and elemi fragrance.', 280.00, '/images/ysl37.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = '37 Rue de Bellechasse'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Invictus Victory Elixir', 'Paco Rabanne', 'A bold and intense blend of spicy and woody notes.', 150.00, '/images/invictictus_victory_elixir.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Invictus Victory Elixir'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Born in Roma Green', 'Valentino', 'A fresh and vibrant green fragrance for men.', 140.00, '/images/valentino_born_in_roma_green.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Born in Roma Green'
);

INSERT INTO colognes (name, brand, description, price, imagePath)
SELECT 'Replica Jazz Club', 'Maison Margiela', 'A warm and cozy fragrance inspired by the atmosphere of a jazz club.', 135.00, '/images/replica_jazz_club.webp'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Replica Jazz Club'
);

-- Insert colognes data only if they don't already exist
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Santal 33', 'Le Labo', 'A woody aromatic fragrance with sandalwood and leather notes.', 320.00, '/images/le_labo_santal33.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Santal 33'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Ani', 'Nishane', 'A rich, spicy oriental fragrance with notes of vanilla and bergamot.', 280.00, '/images/nishane_ani.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Ani'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Terre dHermes Eau Intense Vetiver', 'Hermes', 'A fresh, earthy blend with vetiver and citrus notes.', 120.00, '/images/terre_dhermes_intensevetiver.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Terre dHermes Eau Intense Vetiver'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Babycat', 'Yves Saint Laurent', 'A smooth and sweet vanilla-based fragrance.', 250.00, '/images/yslbabycat.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Babycat'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Tuxedo', 'Yves Saint Laurent', 'A bold mix of spices and patchouli.', 200.00, '/images/ysltuxedo.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Tuxedo'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT '37 Rue de Bellechasse', 'Yves Saint Laurent', 'A unique oud and elemi blend.', 300.00, '/images/ysl37.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = '37 Rue de Bellechasse'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Invictus Victory Elixir', 'Paco Rabanne', 'A rich blend of amber, vanilla, and spices.', 120.00, '/images/invictictus_victory_elixir.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Invictus Victory Elixir'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Born in Roma Green', 'Valentino', 'A fresh and vibrant green fragrance.', 110.00, '/images/valentino_born_in_roma_green.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Born in Roma Green'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Replica Jazz Club', 'Maison Margiela', 'A warm and smoky blend inspired by Brooklyn jazz clubs.', 135.00, '/images/replica_jazz_club.webp'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Replica Jazz Club'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Gentleman Reserve Privée', 'Givenchy', 'An opulent mix of whiskey and iris.', 150.00, '/images/gentleman_givenchy.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Gentleman Reserve Privée'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Scarlet Poppy', 'Jo Malone', 'A luxurious floral scent.', 180.00, '/images/jo_malone_scarlet_poppy.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Scarlet Poppy'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Greenley', 'Parfums de Marly', 'A fresh, fruity fragrance.', 240.00, '/images/pdm_greenley.webp'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Greenley'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'L’Homme Intense', 'Prada', 'A rich amber scent.', 125.00, '/images/prada_lhomme_intense.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'L’Homme Intense'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Code Parfum', 'Armani', 'A modern and elegant fragrance.', 150.00, '/images/armani_code_parfum.webp'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Code Parfum'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'The Matcha 26', 'Le Labo', 'A calming, green tea-inspired fragrance.', 290.00, '/images/le_labo_thematcha26.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'The Matcha 26'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Pegasus', 'Parfums de Marly', 'A luxurious almond scent.', 280.00, '/images/pdm_pegasus.webp'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Pegasus'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Interlude', 'Amouage', 'A bold incense and spice fragrance.', 320.00, '/images/amouage_interlude.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Interlude'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Society', 'Givenchy', 'A modern take on a classic masculine fragrance.', 200.00, '/images/gentleman_givenchy_society.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Society'
);

-- Insert Lattafa Asad
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Asad', 'Lattafa', 'A bold and luxurious scent.', 45.00, '/images/lattafaasad.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Asad'
);

-- Insert Lattafa Khamrah
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Khamrah', 'Lattafa', 'A sweet and warm fragrance.', 40.00, '/images/khamrah.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Khamrah'
);

-- Insert Truth Calvin Klein
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Truth', 'Calvin Klein', 'A refreshing woody aroma.', 50.00, '/images/truthck.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Truth'
);

-- Insert Spicebomb
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Spicebomb Extreme', 'Viktor&Rolf', 'A spicy and intense fragrance.', 95.00, '/images/spicebomb.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Spicebomb Extreme'
);

-- Insert Polo Red
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Polo Red', 'Ralph Lauren', 'An energetic and bold scent.', 75.00, '/images/polored.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Polo Red'
);

-- Insert Playboy New York
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Playboy New York', 'Playboy', 'A modern, urban fragrance.', 20.00, '/images/playboynewyork.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Playboy New York'
);

-- Insert Pino Silvestre
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Pino Silvestre', 'Pino Silvestre', 'A fresh and green fragrance.', 25.00, '/images/pinosilvestre.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Pino Silvestre'
);

-- Insert Parfum de Marly
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Pegasus', 'Parfums de Marly', 'A sophisticated, vanilla-infused scent.', 300.00, '/images/parfumdemarly.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Pegasus'
);

-- Insert Badee Al Oud
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Badee Al Oud', 'Lattafa', 'A rich oud fragrance.', 60.00, '/images/ood.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Badee Al Oud'
);

-- Insert Messi Cologne
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Messi Cologne', 'Messi', 'A fresh and sporty fragrance.', 85.00, '/images/messi.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Messi Cologne'
);

-- Joop Homme
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Joop Homme', 'Joop!', 'A daring, floral fragrance with lasting impact.', 75.00, '/images/joophomme.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Joop Homme'
);

-- John Varvatos
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'John Varvatos', 'John Varvatos', 'A warm, spicy fragrance with a refined elegance.', 90.00, '/images/johnvaratos.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'John Varvatos'
);

-- Halloween Man
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Halloween Man', 'Halloween', 'A mysterious fragrance with oriental and spicy notes.', 45.00, '/images/halloweenman.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Halloween Man'
);

-- Tom Ford Grey Vetiver
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Grey Vetiver', 'Tom Ford', 'A sophisticated vetiver fragrance for a refined gentleman.', 150.00, '/images/greyvetiver.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Grey Vetiver'
);

-- Calvin Klein Eternity
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Eternity', 'Calvin Klein', 'A fresh, timeless fragrance with green and floral notes.', 70.00, '/images/eternity.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Eternity'
);

-- Cristiano Ronaldo CR7 Play It Cool
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'CR7 Play It Cool', 'Cristiano Ronaldo', 'A fresh, casual fragrance for everyday wear.', 55.00, '/images/cr7.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'CR7 Play It Cool'
);

-- CK One Shock
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'CK One Shock', 'Calvin Klein', 'A bold, energizing fragrance with spicy and fruity notes.', 40.00, '/images/ckoneshock.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'CK One Shock'
);

-- Byredo Gypsy Water
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Gypsy Water', 'Byredo', 'A woody aromatic fragrance evoking the romance of gypsy nights.', 190.00, '/images/byredogypsywater.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Gypsy Water'
);

-- Mercedes-Benz The Move
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'The Move', 'Mercedes-Benz', 'A vibrant, fresh fragrance with modern masculinity.', 60.00, '/images/benz.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'The Move'
);

-- Carolina Herrera Bad Boy
INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Bad Boy', 'Carolina Herrera', 'An electric fragrance with spicy and woody accords.', 120.00, '/images/badboy.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Bad Boy'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'AQVA Pour Homme Marine', 'Bvlgari', 'A refreshing aquatic fragrance.', 80.00, '/images/aqva.jpg.png'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'AQVA Pour Homme Marine'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Tygar', 'Bvlgari', 'An elegant fragrance with citrus and woody notes.', 320.00, '/images/bvlgari_tygar.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Tygar'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Legend Spirit', 'Mont Blanc', 'A crisp and light scent.', 75.00, '/images/mont_legend_spirit.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Legend Spirit'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Polo Deep Blue', 'Ralph Lauren', 'A deep and invigorating fragrance.', 95.00, '/images/polo_deep_blue.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Polo Deep Blue'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Allure Homme Sport', 'Chanel', 'A dynamic and fresh fragrance.', 120.00, '/images/chanel_allure_homme_sport.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Allure Homme Sport'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Precious Oud', 'Van Cleef & Arpels', 'A luxurious and intense fragrance.', 200.00, '/images/vancleef_precious_oud.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Precious Oud'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'The Most Wanted', 'Azzaro', 'A spicy and seductive scent.', 90.00, '/images/azarro_most_wanted.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'The Most Wanted'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Imitation Man', 'Amouage', 'A bold and daring fragrance.', 350.00, '/images/imitation man.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Imitation Man'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Amber Pour Homme', 'Prada', 'A refined and elegant fragrance.', 110.00, '/images/prada_amber_pour_homme.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Amber Pour Homme'
);

INSERT INTO colognes (name, brand, description, price, imagePath) 
SELECT 'Sel Marin', 'Heeley', 'A unique and salty marine scent.', 180.00, '/images/heeley_sel_marin.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM colognes WHERE name = 'Sel Marin'
);

