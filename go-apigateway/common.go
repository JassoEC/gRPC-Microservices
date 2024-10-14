package main

import (
	pbOrder "github.com/jassoec/grpc-microservices/protogen/golang/orders"
	pbProduct "github.com/jassoec/grpc-microservices/protogen/golang/products"

	"google.golang.org/grpc"
)

type grpcClients struct {
	productClient pbProduct.ProductsServiceClient
	orderClient   pbOrder.OrdersServiceClient
}

type ProductData struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float32 `json:"price"`
	Quantity    int32   `json:"quantity"`
}

type OrderItem struct {
	ProductId string `json:"product_id"`
	Quantity  int32  `json:"quantity"`
}

type OrderData struct {
	Items []OrderItem `json:"items"`
}

func NewGRPCClients(productConn *grpc.ClientConn, orderConn *grpc.ClientConn) *grpcClients {
	return &grpcClients{
		productClient: pbProduct.NewProductsServiceClient(productConn),
		orderClient:   pbOrder.NewOrdersServiceClient(orderConn),
	}
}
