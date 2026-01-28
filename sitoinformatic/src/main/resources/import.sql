-- ==========================================
-- PROCESADORES (CPU) - Añadimos más variedad
-- ==========================================
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('AMD Ryzen 3 4100', 'Procesador', 'AMD', 75.00, 15, 'BAJO', 'AM4');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Intel Core i5-12600K', 'Procesador', 'Intel', 195.00, 20, 'MEDIO', 'LGA1700');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('AMD Ryzen 7 5700X', 'Procesador', 'AMD', 185.00, 25, 'ALTO', 'AM4');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Intel Core i7-13700K', 'Procesador', 'Intel', 380.00, 12, 'ALTO', 'LGA1700');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('AMD Ryzen 9 7900X', 'Procesador', 'AMD', 410.00, 10, 'ENTUSIASTA', 'AM5');

-- ==========================================
-- TARJETAS GRÁFICAS (GPU) - Cubriendo todos los rangos
-- ==========================================
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('NVIDIA GeForce GTX 1650', 'Tarjeta Gráfica', 'Gigabyte', 145.00, 20, 'BAJO', 'PCIe 3.0');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('AMD Radeon RX 6700 XT', 'Tarjeta Gráfica', 'MSI', 350.00, 15, 'MEDIO', 'PCIe 4.0');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('NVIDIA GeForce RTX 4070 Ti', 'Tarjeta Gráfica', 'ASUS', 820.00, 10, 'ALTO', 'PCIe 4.0');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('AMD Radeon RX 7800 XT', 'Tarjeta Gráfica', 'Sapphire', 540.00, 12, 'ALTO', 'PCIe 4.0');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('NVIDIA GeForce RTX 4080', 'Tarjeta Gráfica', 'Zotac', 1150.00, 5, 'ENTUSIASTA', 'PCIe 4.0');

-- ==========================================
-- PLACAS BASE - Más opciones de conectividad
-- ==========================================
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('ASUS TUF GAMING B550-PLUS', 'Placa Base', 'ASUS', 145.00, 15, 'MEDIO', 'AM4');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Gigabyte Z790 AORUS ELITE', 'Placa Base', 'Gigabyte', 280.00, 10, 'ALTO', 'LGA1700');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('MSI PRO H610M-G', 'Placa Base', 'MSI', 78.00, 25, 'BAJO', 'LGA1700');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('ASUS ROG STRIX X670E-E', 'Placa Base', 'ASUS', 495.00, 5, 'ENTUSIASTA', 'AM5');

-- ==========================================
-- RAM - Diferentes capacidades y velocidades
-- ==========================================
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Crucial RAM 8GB DDR4 2666MHz', 'RAM', 'Crucial', 22.00, 40, 'BAJO', 'DDR4');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Corsair Vengeance RGB 16GB DDR5 5200MHz', 'RAM', 'Corsair', 85.00, 30, 'MEDIO', 'DDR5');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Kingston FURY Renegade 64GB DDR5', 'RAM', 'Kingston', 240.00, 15, 'ENTUSIASTA', 'DDR5');

-- ==========================================
-- ALMACENAMIENTO - HDD y SSD
-- ==========================================
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('SSD Kingston A400 480GB', 'Almacenamiento', 'Kingston', 35.00, 50, 'BAJO', 'SATA');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('WD Black SN850X 1TB', 'Almacenamiento', 'Western Digital', 110.00, 20, 'ALTO', 'M.2');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Crucial P3 2TB NVMe', 'Almacenamiento', 'Crucial', 125.00, 20, 'MEDIO', 'M.2');

-- ==========================================
-- FUENTES Y CAJAS - Variedad estética y de potencia
-- ==========================================
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Cooler Master MWE 500W White', 'Fuente de Alimentación', 'Cooler Master', 45.00, 25, 'BAJO', 'ATX');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Be Quiet! Pure Power 12 M 1000W', 'Fuente de Alimentación', 'Be Quiet!', 165.00, 10, 'ENTUSIASTA', 'ATX');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Aerocool Cylon RGB White', 'Caja', 'Aerocool', 42.00, 20, 'BAJO', 'ATX');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Corsair 4000D Airflow', 'Caja', 'Corsair', 95.00, 18, 'MEDIO', 'ATX');
INSERT INTO components (product_name, category, brand, price, stock, performance_level, compatibility_tag) VALUES ('Fractal Design North', 'Caja', 'Fractal', 155.00, 8, 'ALTO', 'ATX');
