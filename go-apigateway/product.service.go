package main

import (
	"net/http"
)

func (c *grpcClients) handleProductRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		c.getProduct(w, r)
	case http.MethodPost:
		c.createProduct(w, r)
	case http.MethodPut:
		c.updateProduct(w, r)
	case http.MethodDelete:
		c.deleteProduct(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (c *grpcClients) getProduct(w http.ResponseWriter, r *http.Request) {}

func (c *grpcClients) createProduct(w http.ResponseWriter, r *http.Request) {}

func (c *grpcClients) updateProduct(w http.ResponseWriter, r *http.Request) {}

func (c *grpcClients) deleteProduct(w http.ResponseWriter, r *http.Request) {}
