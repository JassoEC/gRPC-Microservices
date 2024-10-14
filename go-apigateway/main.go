package main

import (
	"log"
	"net/http"

	"google.golang.org/grpc"
)

func main() {

	productConn, err := grpc.Dial("products:5000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect to Product gRPC service: %v", err)
	}
	defer productConn.Close()

	orderConn, err := grpc.Dial("orders:6000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect to Order gRPC service: %v", err)
	}
	defer orderConn.Close()

	//  HTTP Server
	mux := http.NewServeMux()

	grpcClients := NewGRPCClients(productConn, orderConn)

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API Gateway\n"))
	})

	mux.HandleFunc("/products", grpcClients.handleProductRequest)
	mux.HandleFunc("/orders", grpcClients.handleOrderRequest)

	log.Println("API Gateway listening on :8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatalf("Failed to start API Gateway: %v", err)
	}
}
