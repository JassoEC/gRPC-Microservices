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

Trough api gateway address **localhost:8080** test the next endpoints:

### Products

1. Create Product

```
curl -X POST http://localhost:8080/products \
-H 'Content-Type: application/json'  \
-d '{"name": "Cheese Pizza", "description": "Really Delicious pizza with cheese", "price": 123.45, "quantity": 10}' | jq

//Expected output
{
    "product": {
        "product_id": "dc50dc2f-e19e-4e90-8bc8-916d3ac46b75",
        "name": "Cheese Pizza",
        "description": "Delicious pizza with cheese",
        "price": 25,
        "available_quantity": 10
    }
}
```

2. Get one product

```
curl -X GET http://localhost:8080/products/dc50dc2f-e19e-4e90-8bc8-916d3ac46b75

//Expected output
{
    "product": {
        "product_id": "dc50dc2f-e19e-4e90-8bc8-916d3ac46b75",
        "name": "Cheese Pizza",
        "description": "Delicious pizza with cheese",
        "price": 25,
        "available_quantity": 10
    }
}
```

3. Update a product

```
curl -s -X PUT http://localhost:8080/products/dc50dc2f-e19e-4e90-8bc8-916d3ac46b75 \
-d '{"name": "name changed", "description": "Delicious pizza with cheese and more cheese", "price": 543.21, "quantity": 100}' | jq

//Expected output
{
    "product": {
        "product_id": "dc50dc2f-e19e-4e90-8bc8-916d3ac46b75",
        "name": "Cheese Pizza",
        "description": "Delicious pizza with cheese and more cheese",
        "price": 25,
        "available_quantity": 10
    }
}
```

### Orders

1. Place Order

```
curl -s -X POST http://localhost:8080/orders \
-d '{"items": [ \
     {"product_id": "dc50dc2f-e19e-4e90-8bc8-916d3ac46b75","quantity": 1}
    ]}'

//Expected output

{
    "order": {
        "order_id": "d835308f-1584-48cc-b0ef-c0ce0a5a1512",
        "created_at": ""
    },
    "items": [
        {
            "product_id": "dc50dc2f-e19e-4e90-8bc8-916d3ac46b75",
            "quantity": 1,
            "order_id": "d835308f-1584-48cc-b0ef-c0ce0a5a1512"
            "product":{
                  "product_id": "dc50dc2f-e19e-4e90-8bc8-916d3ac46b75",
                  "name": "Cheese Pizza",
                  "description": "Delicious pizza with cheese",
                  "price": 25,
                  "available_quantity": 10
               }
        }
    ]
}

```

```
if a non existent product is included we're going to get the next exception:

Error fetching product: Error: 2 UNKNOWN: Could not find product with ID 9f72cbf7-7eb1-4f12-9908-73583c171f8j
```

2. Get an order

```
curl -s -X POST http://localhost:8080/orders/d835308f-1584-48cc-b0ef-c0ce0a5a1512

//Expected output

{
    "order": {
        "order_id": "f537df5d-a408-4201-b7a3-90a96c6efd1a",
        "created_at": "Invalid Date"
    },
    "items": [
        {
            "product_id": "9f72cbf7-7eb1-4f12-9908-73583c171f8d",
            "quantity": 1,
            "order_id": "f537df5d-a408-4201-b7a3-90a96c6efd1a",
            "product": {
                "product_id": "9f72cbf7-7eb1-4f12-9908-73583c171f8d",
                "name": "Cheese Pizza",
                "description": "Delicious pizza with cheese",
                "price": 25,
                "available_quantity": 10
            }
        }
    ]
}

```

### TODO

- [ ] implements rate limiting
- [ ] Add unit tests (Gateway, Products and Orders)
- [ ] Gateway authentication
