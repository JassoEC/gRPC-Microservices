package main

import (
	"encoding/json"
	"log"
	"net/http"

	pbOrder "github.com/jassoec/grpc-microservices/protogen/golang/orders"
)

func (c *grpcClients) handleOrderRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		c.getOrder(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (c *grpcClients) handleOrdersRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		c.createOrder(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (c *grpcClients) createOrder(w http.ResponseWriter, r *http.Request) {
	var orderData OrderData
	if err := json.NewDecoder(r.Body).Decode(&orderData); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	createOrderRequest := &pbOrder.CreateOrderRequest{
		Items: make([]*pbOrder.OrderItem, 0),
	}

	for _, item := range orderData.Items {
		createOrderRequest.Items = append(createOrderRequest.Items, &pbOrder.OrderItem{
			ProductId: item.ProductId,
			Quantity:  item.Quantity,
		})
	}

	response, err := c.orderClient.CreateOrder(r.Context(), createOrderRequest)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to create order", http.StatusInternalServerError)
		return
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)

}

func (c *grpcClients) getOrder(w http.ResponseWriter, r *http.Request) {

	orderId := r.PathValue("id")

	getOrderRequest := &pbOrder.GetOrderRequest{
		OrderId: orderId,
	}

	response, err := c.orderClient.GetOrder(r.Context(), getOrderRequest)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to get order", http.StatusInternalServerError)
		return
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}
