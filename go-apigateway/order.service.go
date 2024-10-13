package main

import (
	"net/http"
)

func (c *grpcClients) handleOrderRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		c.getOrder(w, r)
	case http.MethodPost:
		c.createOrder(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (c *grpcClients) createOrder(w http.ResponseWriter, r *http.Request) {}

func (c *grpcClients) getOrder(w http.ResponseWriter, r *http.Request) {}
