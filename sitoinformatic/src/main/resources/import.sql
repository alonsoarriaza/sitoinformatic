-- Limpieza inicial
DELETE FROM components;

-- === PROCESADORES (CPU) IDs 1-17 ===
INSERT INTO components (id, product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
(1, 'AMD Athlon 3000G', 'CPU', 'AMD', 55.00, 100, 'Oficina', 'AM4'),
(2, 'Intel Pentium Gold G7400', 'CPU', 'Intel', 82.00, 50, 'Oficina', 'LGA1700'),
(3, 'Intel Core i3-12100F', 'CPU', 'Intel', 98.00, 45, 'Gama Baja', 'LGA1700'),
(4, 'AMD Ryzen 5 4500', 'CPU', 'AMD', 79.00, 30, 'Gama Baja', 'AM4'),
(5, 'AMD Ryzen 5 5500', 'CPU', 'AMD', 95.00, 40, 'Gama Baja', 'AM4'),
(6, 'Intel Core i5-12400F', 'CPU', 'Intel', 145.00, 60, 'Gama Media', 'LGA1700'),
(7, 'AMD Ryzen 5 5600X', 'CPU', 'AMD', 165.00, 60, 'Gama Media', 'AM4'),
(8, 'AMD Ryzen 7 5700X', 'CPU', 'AMD', 190.00, 35, 'Gama Media-Alta', 'AM4'),
(9, 'Intel Core i5-13600K', 'CPU', 'Intel', 315.00, 25, 'Gama Media-Alta', 'LGA1700'),
(10, 'AMD Ryzen 5 7600X', 'CPU', 'AMD', 230.00, 30, 'Gama Media', 'AM5'),
(11, 'AMD Ryzen 7 7700X', 'CPU', 'AMD', 320.00, 20, 'Gama Alta', 'AM5'),
(12, 'AMD Ryzen 7 7800X3D', 'CPU', 'AMD', 415.00, 15, 'Gama Alta (Gaming)', 'AM5'),
(13, 'Intel Core i7-14700K', 'CPU', 'Intel', 435.00, 20, 'Gama Alta', 'LGA1700'),
(14, 'AMD Ryzen 9 7900X', 'CPU', 'AMD', 450.00, 10, 'Entusiasta', 'AM5'),
(15, 'AMD Ryzen 9 7950X3D', 'CPU', 'AMD', 670.00, 12, 'Entusiasta', 'AM5'),
(16, 'Intel Core i9-14900K', 'CPU', 'Intel', 610.00, 10, 'Entusiasta', 'LGA1700'),
(17, 'Intel Core i9-14900KS', 'CPU', 'Intel', 740.00, 5, 'Extremo', 'LGA1700');

-- === PLACAS BASE IDs 18-28 ===
INSERT INTO components (id, product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
(18, 'Placa Base OEM H510', 'PLACA_BASE', 'OEM', 49.00, 100, 'Oficina', 'UNIVERSAL'),
(19, 'MSI A520M-A PRO', 'PLACA_BASE', 'MSI', 66.00, 40, 'Gama Baja', 'AM4'),
(20, 'ASUS Prime A320M-K', 'PLACA_BASE', 'ASUS', 58.00, 30, 'Gama Baja', 'AM4'),
(21, 'Gigabyte H610M S2H', 'PLACA_BASE', 'Gigabyte', 82.00, 25, 'Gama Baja', 'LGA1700'),
(22, 'ASUS Prime B550M-A', 'PLACA_BASE', 'ASUS', 105.00, 35, 'Gama Media', 'AM4'),
(23, 'MSI MAG B760 TOMAHAWK', 'PLACA_BASE', 'MSI', 185.00, 20, 'Gama Media-Alta', 'LGA1700'),
(24, 'Gigabyte B650 AORUS ELITE', 'PLACA_BASE', 'Gigabyte', 215.00, 15, 'Gama Media-Alta', 'AM5'),
(25, 'ASUS ROG STRIX X670E-F', 'PLACA_BASE', 'ASUS', 420.00, 10, 'Gama Alta', 'AM5'),
(26, 'MSI MEG Z790 ACE', 'PLACA_BASE', 'MSI', 630.00, 5, 'Entusiasta', 'LGA1700'),
(27, 'ASRock X670E Taichi', 'PLACA_BASE', 'ASRock', 560.00, 5, 'Entusiasta', 'AM5'),
(28, 'ROG MAXIMUS Z790 EXTREME', 'PLACA_BASE', 'ASUS', 1150.00, 2, 'Extremo', 'LGA1700');

-- === TARJETAS GRÁFICAS (GPU) IDs 29-41 ===
INSERT INTO components (id, product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
(29, 'NVIDIA GT 710 2GB', 'GPU', 'ASUS', 48.00, 50, 'Oficina', 'UNIVERSAL'),
(30, 'NVIDIA GT 1030 2GB', 'GPU', 'Gigabyte', 89.00, 30, 'Oficina', 'UNIVERSAL'),
(31, 'AMD Radeon RX 6400', 'GPU', 'Sapphire', 135.00, 20, 'Gama Baja', 'UNIVERSAL'),
(32, 'AMD Radeon RX 6500 XT', 'GPU', 'PowerColor', 165.00, 25, 'Gama Baja', 'UNIVERSAL'),
(33, 'NVIDIA RTX 3050 6GB', 'GPU', 'MSI', 195.00, 35, 'Gama Baja', 'UNIVERSAL'),
(34, 'NVIDIA RTX 4060 8GB', 'GPU', 'Zotac', 310.00, 45, 'Gama Media', 'UNIVERSAL'),
(35, 'AMD Radeon RX 7600', 'GPU', 'Sapphire', 285.00, 30, 'Gama Media', 'UNIVERSAL'),
(36, 'NVIDIA RTX 4060 Ti 16GB', 'GPU', 'Gigabyte', 460.00, 20, 'Gama Media-Alta', 'UNIVERSAL'),
(37, 'AMD Radeon RX 7800 XT', 'GPU', 'ASUS', 540.00, 15, 'Gama Alta', 'UNIVERSAL'),
(38, 'NVIDIA RTX 4070 Super', 'GPU', 'ASUS', 665.00, 18, 'Gama Alta', 'UNIVERSAL'),
(39, 'NVIDIA RTX 4080 Super', 'GPU', 'MSI', 1120.00, 10, 'Entusiasta', 'UNIVERSAL'),
(40, 'AMD Radeon RX 7900 XTX', 'GPU', 'XFX', 995.00, 8, 'Entusiasta', 'UNIVERSAL'),
(41, 'NVIDIA RTX 4090 24GB OC', 'GPU', 'ROG Strix', 2150.00, 3, 'Extremo', 'UNIVERSAL');

-- === MEMORIA RAM IDs 42-49 ===
INSERT INTO components (id, product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
(42, 'DDR4 4GB 2400MHz Basic', 'RAM', 'Generic', 14.00, 100, 'Oficina', 'UNIVERSAL'),
(43, 'Kingston Fury 8GB DDR4', 'RAM', 'Kingston', 24.00, 80, 'Gama Baja', 'UNIVERSAL'),
(44, 'Corsair Vengeance 16GB (2x8) DDR4', 'RAM', 'Corsair', 49.00, 120, 'Gama Media', 'UNIVERSAL'),
(45, 'G.Skill Ripjaws 32GB (2x16) DDR4', 'RAM', 'G.Skill', 88.00, 60, 'Gama Alta', 'UNIVERSAL'),
(46, 'Crucial 16GB (2x8) DDR5 4800', 'RAM', 'Crucial', 65.00, 50, 'Gama Media', 'UNIVERSAL'),
(47, 'Corsair Vengeance 32GB (2x16) DDR5 6000', 'RAM', 'Corsair', 135.00, 45, 'Gama Alta', 'UNIVERSAL'),
(48, 'G.Skill Trident Z5 64GB DDR5 6400', 'RAM', 'G.Skill', 275.00, 15, 'Entusiasta', 'UNIVERSAL'),
(49, 'Dominator Titanium 96GB DDR5', 'RAM', 'Corsair', 540.00, 5, 'Extremo', 'UNIVERSAL');

-- === ALMACENAMIENTO (SSD) IDs 50-57 ===
INSERT INTO components (id, product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
(50, 'SSD 120GB SATA OEM', 'SSD', 'Generic', 12.00, 150, 'Oficina', 'UNIVERSAL'),
(51, 'Kingston A400 240GB SATA', 'SSD', 'Kingston', 21.00, 100, 'Gama Baja', 'UNIVERSAL'),
(52, 'Crucial BX500 500GB SATA', 'SSD', 'Crucial', 39.00, 90, 'Gama Baja', 'UNIVERSAL'),
(53, 'Samsung 870 EVO 1TB SATA', 'SSD', 'Samsung', 98.00, 50, 'Gama Media', 'UNIVERSAL'),
(54, 'WD Blue SN580 1TB NVMe', 'SSD', 'Western Digital', 75.00, 65, 'Gama Media', 'UNIVERSAL'),
(55, 'Samsung 990 Pro 1TB NVMe', 'SSD', 'Samsung', 125.00, 40, 'Gama Alta', 'UNIVERSAL'),
(56, 'Samsung 990 Pro 2TB NVMe', 'SSD', 'Samsung', 195.00, 30, 'Gama Alta', 'UNIVERSAL'),
(57, 'Crucial T705 4TB Gen5 NVMe', 'SSD', 'Crucial', 580.00, 5, 'Extremo', 'UNIVERSAL');

-- === FUENTES (PSU) IDs 58-64 ===
INSERT INTO components (id, product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
(58, 'Fuente 500W Basic', 'PSU', 'OEM', 19.00, 200, 'Oficina', 'UNIVERSAL'),
(59, 'Aerocool VX PLUS 600W', 'PSU', 'Aerocool', 38.00, 60, 'Gama Baja', 'UNIVERSAL'),
(60, 'Corsair CV650 80+ Bronze', 'PSU', 'Corsair', 68.00, 50, 'Gama Media', 'UNIVERSAL'),
(61, 'EVGA 750 GQ 80+ Gold', 'PSU', 'EVGA', 115.00, 30, 'Gama Media-Alta', 'UNIVERSAL'),
(62, 'Corsair RM850e Gold', 'PSU', 'Corsair', 135.00, 25, 'Gama Alta', 'UNIVERSAL'),
(63, 'Seasonic PRIME 1000W Platinum', 'PSU', 'Seasonic', 295.00, 12, 'Entusiasta', 'UNIVERSAL'),
(64, 'ROG Thor 1600W Titanium', 'PSU', 'ASUS', 580.00, 4, 'Extremo', 'UNIVERSAL');

-- === CAJAS (CASE) IDs 65-71 ===
INSERT INTO components (id, product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
(65, 'Caja Oficina Micro-ATX', 'CASE', 'OEM', 24.00, 100, 'Oficina', 'UNIVERSAL'),
(66, 'Nox Forte USB 3.0', 'CASE', 'Nox', 32.00, 50, 'Gama Baja', 'UNIVERSAL'),
(67, 'Tempest Soul RGB White', 'CASE', 'Tempest', 49.00, 40, 'Gama Media', 'UNIVERSAL'),
(68, 'NZXT H5 Flow Black', 'CASE', 'NZXT', 95.00, 25, 'Gama Media-Alta', 'UNIVERSAL'),
(69, 'Corsair 4000D Airflow', 'CASE', 'Corsair', 105.00, 30, 'Gama Alta', 'UNIVERSAL'),
(70, 'Lian Li O11 Dynamic EVO', 'CASE', 'Lian Li', 195.00, 15, 'Entusiasta', 'UNIVERSAL'),
(71, 'Corsair 1000D Super Tower', 'CASE', 'Corsair', 560.00, 3, 'Extremo', 'UNIVERSAL');

-- === PERIFÉRICOS IDs 72-81 ===
INSERT INTO components (id, product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
(72, 'Raton HP M100 USB', 'RATON', 'HP', 9.00, 200, 'Oficina', 'UNIVERSAL'),
(73, 'Logitech G203 Lightsync', 'RATON', 'Logitech', 28.00, 80, 'Gaming Baja', 'UNIVERSAL'),
(74, 'Logitech G502 Hero', 'RATON', 'Logitech', 56.00, 60, 'Gaming Alta', 'UNIVERSAL'),
(75, 'Razer DeathAdder V3 Pro', 'RATON', 'Razer', 145.00, 20, 'Gaming Profesional', 'UNIVERSAL'),
(76, 'Teclado Logitech K120', 'TECLADO', 'Logitech', 14.00, 150, 'Oficina', 'UNIVERSAL'),
(77, 'Corsair K55 RGB PRO', 'TECLADO', 'Corsair', 59.00, 40, 'Gaming Media', 'UNIVERSAL'),
(78, 'Razer Huntsman V3 Pro', 'TECLADO', 'Razer', 240.00, 15, 'Gaming Profesional', 'UNIVERSAL'),
(79, 'Monitor LG 24" FHD 75Hz', 'MONITOR', 'LG', 115.00, 50, 'Oficina', 'UNIVERSAL'),
(80, 'Monitor MSI 27" QHD 170Hz', 'MONITOR', 'MSI', 285.00, 25, 'Gaming Alta', 'UNIVERSAL'),
(81, 'Samsung Odyssey G9 49" Curvo', 'MONITOR', 'Samsung', 1350.00, 5, 'Extremo', 'UNIVERSAL');

-- REINICIAR SECUENCIA
SELECT setval('components_id_seq', (SELECT MAX(id) FROM components));