package ordersms

import (
	"github.com/gofiber/fiber/v2"
	"google.golang.org/grpc"

	common "github.com/jassoec/grpc-microservices/pkg/common"
	pbOrder "github.com/jassoec/grpc-microservices/protogen/golang/orders"
)

var orderClient pbOrder.OrdersServiceClient

func InitOrderClient(conn *grpc.ClientConn) {
	orderClient = pbOrder.NewOrdersServiceClient(conn)
}

func CreateOrder(ctx *fiber.Ctx) error {

	var orderData common.OrderData

	if err := ctx.BodyParser(&orderData); err != nil {
		return ctx.Status(400).SendString("Invalid request")
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

	response, err := orderClient.CreateOrder(ctx.Context(), createOrderRequest)
	if err != nil {
		return ctx.Status(500).SendString("Failed to create order")
	}

	return ctx.Status(201).JSON(response)
}

func GetOrder(ctx *fiber.Ctx) error {
	orderId := ctx.Params("id")

	getOrderRequest := &pbOrder.GetOrderRequest{
		OrderId: orderId,
	}

	response, err := orderClient.GetOrder(ctx.Context(), getOrderRequest)

	if err != nil {
		return ctx.Status(500).SendString("Failed to get order")
	}

	return ctx.Status(200).JSON(response)
}
