-- === PROCESADORES (CPU) ===
-- Gama Baja
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Intel Core i3-12100', 'CPU', 110.00, 50, 'LGA1700');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('AMD Ryzen 3 4100', 'CPU', 85.00, 30, 'AM4');
-- Gama Media
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Intel Core i5-13400', 'CPU', 230.00, 45, 'LGA1700');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('AMD Ryzen 5 5600X', 'CPU', 165.00, 60, 'AM4');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('AMD Ryzen 5 7600', 'CPU', 215.00, 40, 'AM5');
-- Gama Alta / Entusiasta
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Intel Core i7-14700K', 'CPU', 425.00, 20, 'LGA1700');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Intel Core i9-14900KS', 'CPU', 720.00, 10, 'LGA1700');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('AMD Ryzen 7 7800X3D', 'CPU', 395.00, 15, 'AM5');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('AMD Ryzen 9 7950X3D', 'CPU', 640.00, 12, 'AM5');

-- === PLACAS BASE (MOBO) ===
-- LGA1700
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('ASUS Prime H610M-K', 'PLACA_BASE', 80.00, 40, 'LGA1700');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Gigabyte B760 Gaming X', 'PLACA_BASE', 160.00, 25, 'LGA1700');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('MSI MEG Z790 GODLIKE', 'PLACA_BASE', 1200.00, 5, 'LGA1700');
-- AM4 / AM5
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('ASRock B450 Steel Legend', 'PLACA_BASE', 95.00, 30, 'AM4');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('ASUS ROG Strix B550-F', 'PLACA_BASE', 180.00, 20, 'AM4');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Gigabyte B650 AORUS ELITE', 'PLACA_BASE', 220.00, 15, 'AM5');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('ASRock X670E Taichi', 'PLACA_BASE', 490.00, 8, 'AM5');

-- === TARJETAS GRÁFICAS (GPU) ===
-- Oficina / Entrada
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('NVIDIA GT 1030 2GB', 'GPU', 85.00, 20, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('AMD Radeon RX 6400', 'GPU', 130.00, 15, 'UNIVERSAL');
-- Gaming 1080p/1440p
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('NVIDIA RTX 4060 Ti', 'GPU', 390.00, 35, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('AMD Radeon RX 6750 XT', 'GPU', 360.00, 25, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('NVIDIA RTX 4070 Super', 'GPU', 620.00, 20, 'UNIVERSAL');
-- Gaming 4K / Streaming Extreme
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('NVIDIA RTX 4090 24GB', 'GPU', 1850.00, 5, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('AMD Radeon RX 7900 XTX', 'GPU', 990.00, 10, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('NVIDIA RTX 5080 (NextGen)', 'GPU', 1200.00, 8, 'UNIVERSAL');

-- === MEMORIA RAM ===
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Crucial 8GB DDR4 3200MHz', 'RAM', 25.00, 100, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Corsair Vengeance LPX 16GB (2x8)', 'RAM', 50.00, 80, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('G.Skill Ripjaws V 32GB (2x16)', 'RAM', 95.00, 50, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Kingston Fury Renegade 32GB DDR5', 'RAM', 160.00, 40, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Corsair Dominator Titanium 64GB DDR5', 'RAM', 320.00, 15, 'UNIVERSAL');

-- === ALMACENAMIENTO (SSD/HDD) ===
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Kingston A400 480GB SATA', 'SSD', 35.00, 70, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Samsung 970 EVO Plus 1TB NVMe', 'SSD', 90.00, 50, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('WD Black SN850X 2TB', 'SSD', 175.00, 30, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Seagate IronWolf 8TB HDD', 'SSD', 210.00, 12, 'UNIVERSAL');

-- === PERIFÉRICOS (Teclados, Ratones, Monitores) ===
-- Monitores
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Monitor BenQ GW2480 24"', 'MONITOR', 115.00, 25, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Monitor AOC Gaming 27" 144Hz', 'MONITOR', 195.00, 20, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Monitor ASUS ROG Swift OLED 4K', 'MONITOR', 1300.00, 5, 'UNIVERSAL');
-- Teclados
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Teclado Logitech K120 Business', 'TECLADO', 15.00, 100, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Teclado Mecanico Razer BlackWidow', 'TECLADO', 140.00, 15, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Teclado Custom Keychron Q1', 'TECLADO', 190.00, 10, 'UNIVERSAL');
-- Ratones
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Raton Optico Basico HP', 'RATON', 10.00, 80, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Raton Logitech G502 Hero', 'RATON', 55.00, 40, 'UNIVERSAL');
INSERT INTO components (name, category, price, stock, compatibility_tag) VALUES ('Raton Finalmouse Ultralight', 'RATON', 220.00, 3, 'UNIVERSAL');