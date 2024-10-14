package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	pbProduct "github.com/jassoec/grpc-microservices/protogen/golang/products"
)

func (c *grpcClients) handleProductsRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		c.createProduct(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (c *grpcClients) handleProductRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		c.getProduct(w, r)
	case http.MethodPut:
		c.updateProduct(w, r)
	case http.MethodDelete:
		c.deleteProduct(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (c *grpcClients) getProduct(w http.ResponseWriter, r *http.Request) {
	productId := r.PathValue("id")

	getProductByIdRequest := &pbProduct.FindProductRequest{
		ProductId: productId,
	}

	response, err := c.productClient.GetProduct(context.Background(), getProductByIdRequest)

	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to get product", http.StatusInternalServerError)
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

func (c *grpcClients) createProduct(w http.ResponseWriter, r *http.Request) {
	var productData ProductData

	if err := json.NewDecoder(r.Body).Decode(&productData); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	createProductRequest := &pbProduct.CreateProductRequest{
		Name:              productData.Name,
		Description:       productData.Description,
		Price:             productData.Price,
		AvailableQuantity: productData.Quantity,
	}

	resp, err := c.productClient.CreateProduct(context.Background(), createProductRequest)

	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to create product", http.StatusInternalServerError)
		return
	}

	jsonResponse, err := json.Marshal(resp)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)

}

func (c *grpcClients) updateProduct(w http.ResponseWriter, r *http.Request) {

	var productData ProductData

	if err := json.NewDecoder(r.Body).Decode(&productData); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	updateProductRequest := &pbProduct.UpdateProductRequest{
		ProductId:         r.PathValue("id"),
		Name:              productData.Name,
		Description:       productData.Description,
		Price:             productData.Price,
		AvailableQuantity: productData.Quantity,
	}

	resp, err := c.productClient.UpdateProduct(context.Background(), updateProductRequest)

	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to update product", http.StatusInternalServerError)
		return
	}

	jsonResponse, err := json.Marshal(resp)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}

func (c *grpcClients) deleteProduct(w http.ResponseWriter, r *http.Request) {
	productId := r.PathValue("id")

	deleteProductRequest := &pbProduct.FindProductRequest{
		ProductId: productId,
	}

	resp, err := c.productClient.DeleteProduct(context.Background(), deleteProductRequest)

	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to delete product", http.StatusInternalServerError)
		return
	}

	jsonResponse, err := json.Marshal(resp)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}
