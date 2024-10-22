package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/jassoec/grpc-microservices/pkg/ordersms"
	"github.com/jassoec/grpc-microservices/pkg/productsms"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
)

func main() {

	godotenv.Load()

	productsURL := os.Getenv("PRODUCTS_MICROSERVICE_URL")
	ordersURL := os.Getenv("ORDERS_MICROSERVICE_URL")
	port := os.Getenv("PORT")

	productConn, err := grpc.Dial(productsURL, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect to products gRPC service: %v", err)
	}
	defer productConn.Close()

	orderConn, err := grpc.Dial(ordersURL, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect to orders gRPC service: %v", err)
	}
	defer orderConn.Close()

	ordersms.InitOrderClient(orderConn)
	productsms.InitProductClient(productConn)

	app := fiber.New()
	app.Post("/orders", ordersms.CreateOrder)
	app.Get("/orders/:id", ordersms.GetOrder)

	app.Get("/products/:id", productsms.GetProduct)
	app.Post("/products", productsms.CreateProduct)
	app.Put("/products/:id", productsms.UpdateProduct)
	app.Delete("/products/:id", productsms.DeleteProduct)

	app.Listen(":" + port)

}
