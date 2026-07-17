# 🖥️ SitoInformatic

**SitoInformatic** es una plataforma e-commerce de hardware y componentes informáticos que incorpora un **Configurador Inteligente (SitoIA)**. Este sistema asiste a los usuarios en el diseño de ordenadores a medida, optimizando la asignación de su presupuesto según el tipo de uso deseado (Gaming, Streaming/Edición, Oficina) y garantizando la compatibilidad entre las piezas seleccionadas.

Este proyecto ha sido desarrollado como Trabajo de Fin de Grado (TFG) para el ciclo formativo de **Desarrollo de Aplicaciones Web (DAW)**.

---

## 🚀 Características Clave

1. **Configurador Inteligente (SitoIA)**:
   - Distribuye dinámicamente el presupuesto disponible entre los componentes esenciales del equipo.
   - Aplica perfiles de uso optimizados para balancear la potencia de procesamiento (CPU) y gráfica (GPU).
   - Arrastra el capital sobrante de cada pieza para maximizar el rendimiento general del presupuesto final.
   - Permite la inclusión opcional de periféricos (Monitor, Teclado, Ratón), asignándoles un 25% del presupuesto general.
2. **Catálogo Completo**:
   - Más de 80 componentes reales organizados por categorías (CPUs, GPUs, Placas Base, memorias RAM, SSDs, Fuentes de Alimentación, Cajas y Periféricos).
   - Sincronización en tiempo real de precios y disponibilidad (stock).
3. **Cesta de la Compra Dinámica**:
   - Permite agregar, remover e incrementar cantidades de componentes.
   - Cálculos automatizados con IVA incluido (21%).
4. **Pasarela de Pago Simulada**:
   - Integración visual de pago con tarjeta de crédito.
   - Vaciado automatizado del carrito de compras tras una transacción exitosa.
5. **Seguridad y Autenticación**:
   - Registro y autenticación mediante **JSON Web Tokens (JWT)**.
   - Contraseñas cifradas en base de datos.
   - Control de sesión adaptativo en el Frontend.

---

## 🛠️ Stack Tecnológico

### Backend (Servidor)
* **Java 21**
* **Spring Boot 3.4.1**
* **Spring Security** (Autenticación y Autorización)
* **JWT (JSON Web Token)** con `jjwt-api` (versión 0.11.5)
* **Spring Data JPA** (Persistencia y mapeo ORM)
* **Hibernate** (Motor JPA)
* **Springdoc OpenAPI / Swagger** (Documentación interactiva de la API en `http://localhost:8080/swagger-ui/index.html`)

### Frontend (Cliente)
* **React 19**
* **Vite** (Entorno de desarrollo rápido)
* **Axios** (Cliente HTTP para comunicación con la API)
* **React Router Dom 7** (Enrutamiento dinámico SPA)
* **CSS Vanilla** (Diseño premium adaptativo en modo oscuro con efectos blur y gradientes)

### Base de Datos
* **PostgreSQL** (Motor de producción)
* **H2 Database** (Soporte en memoria para pruebas de desarrollo)

---

## 📦 Estructura del Proyecto

El repositorio está organizado en dos componentes principales: el backend en la carpeta raíz y el frontend en la subcarpeta `sito-frontend`.

```
SitoInformatic/                         # Código fuente del Backend (Spring Boot)
│
├── .mvn/                               # Archivos de empaquetado de Maven Wrapper
├── src/main/java/com/shop/proyect/sitoinformatic/
│   ├── config/                         # Configuraciones de seguridad, CORS, filtros JWT e inicializador de base de datos
│   ├── controller/                     # Controladores REST expuestos al frontend (Auth, Carrito, Componentes, Asistente)
│   ├── dto/                            # Objetos de Transferencia de Datos (DTO) para solicitudes de la API
│   ├── model/                          # Entidades persistentes de la base de datos (User, Component, CarritoItem)
│   ├── repository/                     # Interfaces de acceso a base de datos de Spring Data JPA
│   └── service/                        # Lógica de negocio (Algoritmo SitoIA, gestión de usuarios y tokens)
├── src/main/resources/
│   ├── application.properties          # Configuración de base de datos PostgreSQL, JWT secret y logs
│   └── import.sql                      # Script de carga automática de datos iniciales en desarrollo
├── pom.xml                             # Dependencias Maven y configuración del proyecto Spring Boot
├── script_base_de_datos1.sql           # Dump completo de la base de datos para PostgreSQL
├── mvnw / mvnw.cmd                     # Ejecutables Maven Wrapper
│
└── sito-frontend/                      # Código fuente del Frontend (React + Vite)
    ├── src/
    │   ├── assets/                     # Imágenes corporativas y logotipos
    │   ├── components/                 # Componentes SPA (Home, Login, Registro, Catalogo, Configurador, Carrito, Pago, Navbar)
    │   ├── App.jsx                     # Enrutamiento de la aplicación React
    │   └── main.jsx                    # Punto de entrada de la aplicación
    ├── package.json                    # Dependencias y scripts de ejecución
    └── vite.config.js                  # Configuración del servidor de desarrollo Vite
```

---

## ⚙️ Funcionamiento del Algoritmo "SitoIA"

El servicio principal `AssistantService.java` implementa un algoritmo codificado en Java para calcular el presupuesto óptimo de las piezas:

1. **Filtro de entrada y mínimos**:
   - Para evitar configuraciones poco realistas, se exigen presupuestos mínimos según el uso principal seleccionado:
     * **Gaming**: Mínimo 550€
     * **Streaming/Edición**: Mínimo 700€
     * **Oficina**: Mínimo 250€
2. **Distribución Inicial**:
   - Si se decide incluir periféricos, el presupuesto total se divide en: **75% Hardware Central** y **25% Periféricos** (de este 25%: 70% Monitor, 15% Teclado, 15% Ratón).
3. **Distribución por Categorías**:
   - Se aplican los siguientes porcentajes de asignación económica al presupuesto de hardware:
     * **Gaming**: GPU (45%), CPU (20%), Placa Base (10%), RAM (10%), SSD (7%), PSU (5%), Case (3%).
     * **Streaming/Edición**: CPU (35%), GPU (30%), Placa Base (10%), RAM (10%), SSD (7%), PSU (5%), Case (3%).
     * **Oficina**: CPU (45%), GPU (5%), Placa Base (15%), RAM (15%), SSD (10%), PSU (5%), Case (5%). *(Si el presupuesto en Oficina es inferior a 500€, el sistema prescinde de la GPU dedicada en favor de los gráficos integrados)*.
4. **Bucle de Búsqueda y Arrastre (Money Carryover)**:
   - El sistema recorre los componentes en orden de importancia (`GPU` ➡️ `CPU` ➡️ `Placa Base` ➡️ `RAM` ➡️ `SSD` ➡️ `PSU` ➡️ `Case`).
   - Busca el mejor componente en stock cuyo precio sea menor o igual al presupuesto asignado para esa categoría.
   - Si el componente elegido cuesta menos de lo asignado, la diferencia se suma al presupuesto disponible para el siguiente elemento.
   - En caso de que el presupuesto asignado sea demasiado bajo para comprar cualquier componente de una categoría, el algoritmo selecciona la pieza más barata de la base de datos para asegurar que el ordenador sea funcional y se pueda ensamblar.

---

## 📋 Requisitos Previos

Antes de proceder con la instalación, asegúrate de tener instalado en tu sistema:
* **Java Development Kit (JDK) 21** o superior.
* **Node.js** (versión 18+) junto con **npm**.
* **PostgreSQL** configurado y corriendo localmente en el puerto `5432`.

---

## 🚀 Guía de Instalación y Despliegue

### Paso 1: Configuración de la Base de Datos (PostgreSQL)

1. Abre **pgAdmin 4** o tu cliente PostgreSQL preferido.
2. Crea manualmente una base de datos llamada `sito_informatic`.
3. Asegúrate de que el usuario `postgres` tenga la contraseña configurada como `1407`. *(Si usas otras credenciales, edítalas en el archivo [application.properties](file:///c:/Users/alonso.feria/OneDrive/Desktop/DAW_Codigo_AlonsoFeriaArriaza%20(1)/SitoInformatic/src/main/resources/application.properties))*.
4. Abre la herramienta de consulta (Query Tool) en la base de datos recién creada y ejecuta el script:
   * [script_base_de_datos1.sql](file:///c:/Users/alonso.feria/OneDrive/Desktop/DAW_Codigo_AlonsoFeriaArriaza%20(1)/SitoInformatic/script_base_de_datos1.sql)
   *(Este paso carga los 81 componentes de hardware disponibles, así como los perfiles de prueba en la base de datos)*.

### Paso 2: Ejecución del Backend (Java Spring Boot)

1. Abre una terminal de comandos en la carpeta raíz `SitoInformatic`.
2. Ejecuta el siguiente comando para iniciar el servidor de desarrollo:
   ```bash
   ./mvnw spring-boot:run
   ```
3. Mantén abierta la terminal. El backend estará listo para recibir peticiones cuando veas el mensaje:
   ```
   Started SitoinformaticApplication in X.XXX seconds
   ```
4. El servidor se iniciará en `http://localhost:8080`.

### Paso 3: Ejecución del Frontend (React + Vite)

1. Abre una nueva terminal en la carpeta `SitoInformatic/sito-frontend`.
2. *(Opcional en sistemas Windows si experimentas bloqueos de políticas de ejecución)*:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Instala las dependencias necesarias de npm:
   ```bash
   npm install
   ```
4. Inicia el servidor del frontend:
   ```bash
   npm run dev
   ```
5. Accede a la aplicación web a través de tu navegador favorito ingresando a:
   * **`http://localhost:5173`**

---

## 🔑 Credenciales de Prueba

La base de datos se inicializa automáticamente con dos cuentas de prueba listas para usar:

### Perfil Cliente (Role User)
* **Correo**: `user@tienda.com`
* **Contraseña**: `user123`
* *Permite: Probar el configurador inteligente SitoIA, añadir piezas al carrito, procesar compras y acceder al catálogo.*

### Perfil Administrador (Role Admin)
* **Correo**: `admin@tienda.com`
* **Contraseña**: `admin123`
* *Permite: Roles administrativos de sistema.*

---

## 🛡️ Licencia y Autoría
Este proyecto ha sido desarrollado bajo un enfoque académico de excelencia tecnológica como Proyecto Fin de Grado en **Desarrollo de Aplicaciones Web (DAW)** por **Alonso Feria Arriaza**. Todos los derechos reservados © 2026.
