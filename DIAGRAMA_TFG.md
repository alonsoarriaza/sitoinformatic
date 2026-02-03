
```mermaid
graph TD
    %% 1. ARRANQUE
    Start((App Launch)) --> Init[DataInitializer: Carga SQL]
    Init --> Security[SecurityConfig: Filtros y Permisos]

    %% 2. SEGURIDAD JWT
    Request((Peticion HTTP)) --> JWT{JwtAuthFilter: Token valido?}
    JWT -->|No / Publico| Public[Acceso Publico]
    JWT -->|Si| Auth[Asignar Roles: USER / ADMIN]

    %% 3. CONTROLADORES
    Public --> Router{Selector de Ruta}
    Auth --> Router

    subgraph Capa de Controladores
        Router -->|/api/assistant| AsstCtrl[AssistantController]
        Router -->|/components| CompCtrl[ComponentController]
        Router -->|/auth| AuthCtrl[AuthController]
    end

    %% 4. SERVICIOS Y LOGICA
    subgraph Capa de Servicios
        CompCtrl --> CompServ[ComponentService: CRUD]
        AsstCtrl --> AsstServ[AssistantService: Algoritmo]
        AuthCtrl --> AuthService[UserService / JwtService]
    end

    subgraph Algoritmo de Seleccion - AssistantService
        AsstServ --> Valid[validateRequirements: Filtro presupuesto]
        Valid --> Map[Reparto de Porcentajes: BigDecimal]
        Map --> Loop[Bucle de busqueda: findBestComponent]
        Loop --> Criteria{Criterios: Stock + Socket + Precio}
    end

    %% 5. DATOS Y PERSISTENCIA
    subgraph Capa de Datos
        CompServ --> CompRepo[ComponentRepository]
        AsstServ --> CompRepo
        CompRepo --> DB[(Database: MySQL)]
    end

    %% 6. RESPUESTA
    DB --> Output[Construccion de Respuesta: DTO / Map / Page]
    Output --> Response((Respuesta JSON))

    %% ESTILOS
    style DB fill:#f9f,stroke:#333,stroke-width:2px
    style JWT fill:#bbf,stroke:#333,stroke-width:2px
    style Start fill:#dfd,stroke:#333
    style Response fill:#dfd,stroke:#333

    ```
