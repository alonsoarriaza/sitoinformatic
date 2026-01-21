SitoInformatic - Professional Computer Hardware Store API
A robust RESTful API built with Spring Boot 3.4 and Java 21, designed to simulate a real-world e-commerce backend for computer components.

 Current Features
Stateless Security: Full JWT (JSON Web Tokens) implementation for secure authentication.

Role-Based Access Control: Differentiated access for ADMIN and USER roles using Spring Security.

Inventory Management: CRUD operations for components with Jakarta Bean Validation.

Database Dual-Setup: Configured for PostgreSQL in production and H2 for testing.

Future Roadmap (To be implemented)
[ ] Shopping Cart System: Logic to manage temporary user selections before checkout.

[ ] Order Management: Converting carts into permanent orders with status tracking (Pending, Shipped, Delivered).

[ ] Image Upload: Integration with cloud storage (like AWS S3) to store product images.

[ ] Email Service: Automatic notifications for registration and order confirmation.

[ ] Advanced Search: Filtering components by price range, brand, and category.

[ ] Unit & Integration Testing: Full coverage with JUnit 5 and Mockito.

 Tech Stack
Core: Spring Boot 3.4.1, Java 21.

Security: Spring Security, JJWT, BCrypt.

Persistence: Spring Data JPA, Hibernate.

Documentation: OpenAPI 3 / Swagger UI.