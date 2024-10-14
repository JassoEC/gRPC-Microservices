# gRPC Microservices Test

### Requirements

1. Product Service (Nest.JS):

   - [x] Implement CRUD operations for products (Create, Read, Update, Delete).
   - [x] Each product should have at least a name, description, price and available quantity.

2. Order Service (Nest.JS):

   - [x] Implement functionality to place an order. An order should reference one or more products and specify the quantities.
   - [ ] Implement a simple order listing functionality, which returns a list of all orders with product details.
   - [x] Implement an interservice call to Product service using gRPC to ensure that the product exists and has quantity available.

3. API Gateway (Golang):

   - [x] Develop an API Gateway that exposes REST endpoints for the functionalities of the Product and Order Services.
   - [x] Implement JWT authentication to secure the endpoints.
   - [ ] Add a rate-limiting feature to protect the services from overuse (Bonus).

4. gRPC:

   - [x] Define gRPC protocols in a separate project.
   - [x] Make sure to compile these and include them in respective projects as compiled gRPC protocols.

5. gRPC Communication:

   - [x] Establish gRPC communication between the microservices and the API Gateway.
   - [x] Define the necessary Protobuf messages and services for the operations above.

6. Unit Tests:

   - [ ] Write unit tests for the business logic of your application, including the data fetching and parsing logic.

7. Bonus - Unit Tests (Optional):

   - [ ] Write unit tests for Product and Order microservices to test business logic.

8. Docker

   - [x] Containerize the Product Service, Order Service, and API Gateway.
   - [x] Provide a Docker Compose file to orchestrate the startup of the entire system.

### Code

Folders structure:

- 📁 proto - Definition of gRPC protocols
- 📁 product-ms - Nestjs implementation of the gRPC service to manage products
- 📁 orders-ms - Nestjs implementation of the gRPC service to place and query orders
- 📁 go-apigateway - Golang implementation of an API gateway to serve the gRPC services

### How to test

Clone this repo and run the following:

```bash
git clone git@github.com:JassoEC/gRPC-Microservices.git

docker compose build

docker compose up
```
