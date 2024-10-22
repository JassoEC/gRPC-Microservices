package productsms

import (
	"github.com/gofiber/fiber/v2"
	"google.golang.org/grpc"

	common "github.com/jassoec/grpc-microservices/pkg/common"
	pbProducts "github.com/jassoec/grpc-microservices/protogen/golang/products"
)

var productClient pbProducts.ProductsServiceClient

func InitProductClient(productConn *grpc.ClientConn) {
	productClient = pbProducts.NewProductsServiceClient(productConn)
}

func GetProduct(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	product, err := productClient.GetProduct(ctx.Context(), &pbProducts.FindProductRequest{ProductId: id})

	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}

	return ctx.JSON(common.ProductData{
		Id:          product.ProductId,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		Quantity:    product.AvailableQuantity,
	})
}

func CreateProduct(ctx *fiber.Ctx) error {
	var productData common.ProductData

	if err := ctx.BodyParser(&productData); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	product, err := productClient.CreateProduct(ctx.Context(), &pbProducts.CreateProductRequest{
		Name:              productData.Name,
		Description:       productData.Description,
		Price:             productData.Price,
		AvailableQuantity: productData.Quantity,
	})

	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return ctx.Status(fiber.StatusCreated).JSON(common.ProductData{
		Id:          product.ProductId,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		Quantity:    product.AvailableQuantity,
	})
}

func UpdateProduct(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	var productData common.ProductData

	if err := ctx.BodyParser(&productData); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	product, err := productClient.UpdateProduct(ctx.Context(), &pbProducts.UpdateProductRequest{
		ProductId:         id,
		Name:              productData.Name,
		Description:       productData.Description,
		Price:             productData.Price,
		AvailableQuantity: productData.Quantity,
	})

	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return ctx.JSON(common.ProductData{
		Id:          product.ProductId,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		Quantity:    product.AvailableQuantity,
	})
}

func DeleteProduct(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	product, err := productClient.DeleteProduct(ctx.Context(), &pbProducts.FindProductRequest{ProductId: id})

	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return ctx.JSON(common.ProductData{
		Id:          product.ProductId,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		Quantity:    product.AvailableQuantity,
	})
}
