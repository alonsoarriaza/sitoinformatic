-- === PROCESADORES (CPU) ===
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
('Intel Core i3-12100', 'CPU', 'Intel', 110.00, 50, 'Gama Baja', 'LGA1700'),
('Intel Core i5-13400', 'CPU', 'Intel', 230.00, 45, 'Gama Media', 'LGA1700'),
('Intel Core i7-14700K', 'CPU', 'Intel', 425.00, 20, 'Gama Alta', 'LGA1700'),
('Intel Core i9-14900K', 'CPU', 'Intel', 620.00, 10, 'Entusiasta', 'LGA1700'),
('AMD Ryzen 5 5500', 'CPU', 'AMD', 95.00, 40, 'Gama Baja', 'AM4'),
('AMD Ryzen 5 5600X', 'CPU', 'AMD', 165.00, 60, 'Gama Media', 'AM4'),
('AMD Ryzen 7 5800X', 'CPU', 'AMD', 210.00, 30, 'Gama Alta', 'AM4'),
('AMD Ryzen 5 7600', 'CPU', 'AMD', 205.00, 25, 'Gama Media', 'AM5'),
('AMD Ryzen 7 7800X3D', 'CPU', 'AMD', 395.00, 25, 'Gama Alta', 'AM5'),
('AMD Ryzen 9 7950X3D', 'CPU', 'AMD', 640.00, 15, 'Entusiasta', 'AM5');

-- === PLACAS BASE (PLACA_BASE) ===
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
('ASUS Prime H610M-E', 'PLACA_BASE', 'ASUS', 85.00, 30, 'Gama Baja', 'LGA1700'),
('Gigabyte B760 Gaming X', 'PLACA_BASE', 'Gigabyte', 145.00, 25, 'Gama Media', 'LGA1700'),
('MSI MAG Z790 TOMAHAWK', 'PLACA_BASE', 'MSI', 270.00, 20, 'Gama Alta', 'LGA1700'),
('MSI A520M-A PRO', 'PLACA_BASE', 'MSI', 65.00, 40, 'Gama Baja', 'AM4'),
('Gigabyte B550M DS3H', 'PLACA_BASE', 'Gigabyte', 95.00, 35, 'Gama Media', 'AM4'),
('ASUS ROG STRIX B550-F', 'PLACA_BASE', 'ASUS', 175.00, 15, 'Gama Alta', 'AM4'),
('Gigabyte B650 EAGLE AX', 'PLACA_BASE', 'Gigabyte', 160.00, 20, 'Gama Media', 'AM5'),
('ASRock X670E Taichi', 'PLACA_BASE', 'ASRock', 520.00, 10, 'Entusiasta', 'AM5');

-- === TARJETAS GRÁFICAS (GPU) ===
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
('NVIDIA GT 1030 2GB', 'GPU', 'Gigabyte', 85.00, 20, 'Oficina', 'UNIVERSAL'),
('AMD Radeon RX 6400', 'GPU', 'Sapphire', 130.00, 15, 'Gama Baja', 'UNIVERSAL'),
('NVIDIA RTX 3050 8GB', 'GPU', 'MSI', 235.00, 30, 'Gama Baja', 'UNIVERSAL'),
('NVIDIA RTX 4060 8GB', 'GPU', 'Zotac', 315.00, 40, 'Gama Media', 'UNIVERSAL'),
('AMD Radeon RX 6750 XT', 'GPU', 'XFX', 370.00, 25, 'Gama Media', 'UNIVERSAL'),
('NVIDIA RTX 4070 SUPER', 'GPU', 'ASUS', 660.00, 20, 'Gama Alta', 'UNIVERSAL'),
('AMD Radeon RX 7900 XTX', 'GPU', 'Sapphire', 995.00, 10, 'Gama Alta', 'UNIVERSAL'),
('NVIDIA RTX 4090 24GB', 'GPU', 'MSI', 1950.00, 5, 'Entusiasta', 'UNIVERSAL');

-- === MEMORIA RAM (RAM) ===
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
('Kingston ValueRAM 8GB DDR4', 'RAM', 'Kingston', 22.00, 100, 'Gama Baja', 'UNIVERSAL'),
('Corsair Vengeance LPX 16GB DDR4', 'RAM', 'Corsair', 45.00, 80, 'Gama Media', 'UNIVERSAL'),
('G.Skill Ripjaws V 32GB DDR4', 'RAM', 'G.Skill', 85.00, 50, 'Gama Alta', 'UNIVERSAL'),
('Crucial 16GB DDR5 4800MHz', 'RAM', 'Crucial', 60.00, 60, 'Gama Baja', 'UNIVERSAL'),
('Corsair Vengeance RGB 32GB DDR5', 'RAM', 'Corsair', 135.00, 40, 'Gama Alta', 'UNIVERSAL'),
('G.Skill Trident Z5 64GB DDR5', 'RAM', 'G.Skill', 240.00, 15, 'Entusiasta', 'UNIVERSAL');

-- === ALMACENAMIENTO (SSD y HDD) ===
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
('Kingston A400 240GB SATA', 'SSD', 'Kingston', 19.00, 100, 'Gama Baja', 'UNIVERSAL'),
('Crucial BX500 480GB SATA', 'SSD', 'Crucial', 38.00, 80, 'Gama Baja', 'UNIVERSAL'),
('Samsung 870 EVO 1TB SATA', 'SSD', 'Samsung', 95.00, 50, 'Gama Media', 'UNIVERSAL'),
('WD Blue SN580 500GB NVMe', 'SSD', 'Western Digital', 45.00, 60, 'Gama Media', 'UNIVERSAL'),
('Crucial P3 Plus 1TB NVMe', 'SSD', 'Crucial', 75.00, 70, 'Gama Media', 'UNIVERSAL'),
('Samsung 980 Pro 1TB NVMe', 'SSD', 'Samsung', 115.00, 40, 'Gama Alta', 'UNIVERSAL'),
('WD Black SN850X 2TB NVMe', 'SSD', 'Western Digital', 170.00, 20, 'Gama Alta', 'UNIVERSAL'),
('Seagate BarraCuda 2TB HDD', 'HDD', 'Seagate', 55.00, 40, 'Almacenamiento', 'UNIVERSAL');

-- === FUENTES DE ALIMENTACIÓN (PSU) ===
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
('Aerocool VX PLUS 500W', 'PSU', 'Aerocool', 32.00, 50, 'Gama Baja', 'UNIVERSAL'),
('Corsair CV650 650W 80+', 'PSU', 'Corsair', 65.00, 40, 'Gama Media', 'UNIVERSAL'),
('EVGA 750 BQ 80+ Bronze', 'PSU', 'EVGA', 85.00, 30, 'Gama Media', 'UNIVERSAL'),
('Corsair RM850e 850W Gold', 'PSU', 'Corsair', 125.00, 20, 'Gama Alta', 'UNIVERSAL'),
('Seasonic Prime 1300W Gold', 'PSU', 'Seasonic', 290.00, 10, 'Entusiasta', 'UNIVERSAL');

-- === CAJAS / TORRES (CASE) ===
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
('Nox Forte USB 3.0', 'CASE', 'Nox', 28.00, 40, 'Gama Baja', 'UNIVERSAL'),
('Tempest Soul RGB', 'CASE', 'Tempest', 45.00, 30, 'Gama Media', 'UNIVERSAL'),
('Corsair 4000D Airflow', 'CASE', 'Corsair', 95.00, 25, 'Gama Alta', 'UNIVERSAL'),
('Lian Li PC-O11 Dynamic', 'CASE', 'Lian Li', 160.00, 15, 'Entusiasta', 'UNIVERSAL');

-- === PERIFÉRICOS ===
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES 
('Monitor LG 24 Pulgadas FHD', 'MONITOR', 'LG', 125.00, 40, 'Oficina', 'UNIVERSAL'),
('Monitor MSI 27 Pulgadas 144Hz', 'MONITOR', 'MSI', 210.00, 25, 'Gaming', 'UNIVERSAL'),
('Monitor Gigabyte 34 Curvo WQHD', 'MONITOR', 'Gigabyte', 420.00, 10, 'Entusiasta', 'UNIVERSAL'),
('Teclado Logitech K120', 'TECLADO', 'Logitech', 15.00, 100, 'Oficina', 'UNIVERSAL'),
('Teclado Mecanico Razer Ornata', 'TECLADO', 'Razer', 85.00, 30, 'Gaming', 'UNIVERSAL'),
('Raton HP Basico', 'RATON', 'HP', 10.00, 100, 'Oficina', 'UNIVERSAL'),
('Raton Logitech G502 Hero', 'RATON', 'Logitech', 58.00, 50, 'Gaming', 'UNIVERSAL');