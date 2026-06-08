1. Preparación de la Base de Datos (PostgreSQL)
Desde pgAdmin 4, cree manualmente una base de datos llamada: sito_informatic.

Verifique que el usuario postgres tenga la contraseña 1407.

Abra el Query Tool en la base de datos recién creada y ejecute el contenido del archivo:
script_base_de_datos1.sql
(Este paso es fundamental para cargar los 81 componentes y los usuarios de prueba).

2. Ejecución del Backend (Java Spring Boot)
Abra una terminal en la carpeta raíz del proyecto.

Inicie el servidor con el comando:

PowerShell
./mvnw spring-boot:run
Mantenga esta terminal abierta. El proceso habrá finalizado correctamente al ver el mensaje:
"Started SitoinformaticApplication".

3. Ejecución del Frontend (React + Vite)
Abra una nueva terminal en la carpeta: sito-frontend.

Active los permisos de ejecución (solo si es necesario):

PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Instale las dependencias y arranque la interfaz:

PowerShell
npm install
npm run dev
Acceda a la aplicación en: http://localhost:5173