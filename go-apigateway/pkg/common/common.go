package common

type ProductData struct {
	Id          string  `json:"id"`
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
