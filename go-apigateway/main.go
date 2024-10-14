package main

import (
	"log"
	"net/http"

	"google.golang.org/grpc"
)

func main() {

	productConn, err := grpc.Dial("products:5500", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect to products gRPC service: %v", err)
	}
	defer productConn.Close()

	orderConn, err := grpc.Dial("orders:6000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect to orders gRPC service: %v", err)
	}
	defer orderConn.Close()

	//  HTTP Server
	mux := http.NewServeMux()

	grpcClients := NewGRPCClients(productConn, orderConn)

	mux.HandleFunc("/products/{id}", grpcClients.handleProductRequest)
	mux.HandleFunc("/products", grpcClients.handleProductsRequest)
	mux.HandleFunc("/orders/{id}", grpcClients.handleOrderRequest)
	mux.HandleFunc("/orders", grpcClients.handleOrdersRequest)

	log.Println("API Gateway listening on :8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatalf("Failed to start API Gateway: %v", err)
	}
}
