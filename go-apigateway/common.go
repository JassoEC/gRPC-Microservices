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

func NewGRPCClients(productConn *grpc.ClientConn, orderConn *grpc.ClientConn) *grpcClients {
	return &grpcClients{
		productClient: pbProduct.NewProductsServiceClient(productConn),
		orderClient:   pbOrder.NewOrdersServiceClient(orderConn),
	}
}
