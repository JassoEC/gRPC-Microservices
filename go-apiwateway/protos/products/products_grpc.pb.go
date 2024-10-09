// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             v3.20.3
// source: products.proto

package products

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

const (
	ProductsService_GetProduct_FullMethodName    = "/products.ProductsService/GetProduct"
	ProductsService_CreateProduct_FullMethodName = "/products.ProductsService/CreateProduct"
	ProductsService_UpdateProduct_FullMethodName = "/products.ProductsService/UpdateProduct"
	ProductsService_DeleteProduct_FullMethodName = "/products.ProductsService/DeleteProduct"
)

// ProductsServiceClient is the client API for ProductsService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ProductsServiceClient interface {
	GetProduct(ctx context.Context, in *FindProductRequest, opts ...grpc.CallOption) (*ProductResponse, error)
	CreateProduct(ctx context.Context, in *CreateProductRequest, opts ...grpc.CallOption) (*ProductResponse, error)
	UpdateProduct(ctx context.Context, in *UpdateProductRequest, opts ...grpc.CallOption) (*ProductResponse, error)
	DeleteProduct(ctx context.Context, in *FindProductRequest, opts ...grpc.CallOption) (*ProductResponse, error)
}

type productsServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewProductsServiceClient(cc grpc.ClientConnInterface) ProductsServiceClient {
	return &productsServiceClient{cc}
}

func (c *productsServiceClient) GetProduct(ctx context.Context, in *FindProductRequest, opts ...grpc.CallOption) (*ProductResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(ProductResponse)
	err := c.cc.Invoke(ctx, ProductsService_GetProduct_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *productsServiceClient) CreateProduct(ctx context.Context, in *CreateProductRequest, opts ...grpc.CallOption) (*ProductResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(ProductResponse)
	err := c.cc.Invoke(ctx, ProductsService_CreateProduct_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *productsServiceClient) UpdateProduct(ctx context.Context, in *UpdateProductRequest, opts ...grpc.CallOption) (*ProductResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(ProductResponse)
	err := c.cc.Invoke(ctx, ProductsService_UpdateProduct_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *productsServiceClient) DeleteProduct(ctx context.Context, in *FindProductRequest, opts ...grpc.CallOption) (*ProductResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(ProductResponse)
	err := c.cc.Invoke(ctx, ProductsService_DeleteProduct_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ProductsServiceServer is the server API for ProductsService service.
// All implementations must embed UnimplementedProductsServiceServer
// for forward compatibility.
type ProductsServiceServer interface {
	GetProduct(context.Context, *FindProductRequest) (*ProductResponse, error)
	CreateProduct(context.Context, *CreateProductRequest) (*ProductResponse, error)
	UpdateProduct(context.Context, *UpdateProductRequest) (*ProductResponse, error)
	DeleteProduct(context.Context, *FindProductRequest) (*ProductResponse, error)
	mustEmbedUnimplementedProductsServiceServer()
}

// UnimplementedProductsServiceServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedProductsServiceServer struct{}

func (UnimplementedProductsServiceServer) GetProduct(context.Context, *FindProductRequest) (*ProductResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetProduct not implemented")
}
func (UnimplementedProductsServiceServer) CreateProduct(context.Context, *CreateProductRequest) (*ProductResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateProduct not implemented")
}
func (UnimplementedProductsServiceServer) UpdateProduct(context.Context, *UpdateProductRequest) (*ProductResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateProduct not implemented")
}
func (UnimplementedProductsServiceServer) DeleteProduct(context.Context, *FindProductRequest) (*ProductResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteProduct not implemented")
}
func (UnimplementedProductsServiceServer) mustEmbedUnimplementedProductsServiceServer() {}
func (UnimplementedProductsServiceServer) testEmbeddedByValue()                         {}

// UnsafeProductsServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ProductsServiceServer will
// result in compilation errors.
type UnsafeProductsServiceServer interface {
	mustEmbedUnimplementedProductsServiceServer()
}

func RegisterProductsServiceServer(s grpc.ServiceRegistrar, srv ProductsServiceServer) {
	// If the following call pancis, it indicates UnimplementedProductsServiceServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&ProductsService_ServiceDesc, srv)
}

func _ProductsService_GetProduct_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FindProductRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ProductsServiceServer).GetProduct(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: ProductsService_GetProduct_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ProductsServiceServer).GetProduct(ctx, req.(*FindProductRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ProductsService_CreateProduct_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateProductRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ProductsServiceServer).CreateProduct(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: ProductsService_CreateProduct_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ProductsServiceServer).CreateProduct(ctx, req.(*CreateProductRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ProductsService_UpdateProduct_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateProductRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ProductsServiceServer).UpdateProduct(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: ProductsService_UpdateProduct_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ProductsServiceServer).UpdateProduct(ctx, req.(*UpdateProductRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ProductsService_DeleteProduct_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FindProductRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ProductsServiceServer).DeleteProduct(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: ProductsService_DeleteProduct_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ProductsServiceServer).DeleteProduct(ctx, req.(*FindProductRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ProductsService_ServiceDesc is the grpc.ServiceDesc for ProductsService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ProductsService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "products.ProductsService",
	HandlerType: (*ProductsServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetProduct",
			Handler:    _ProductsService_GetProduct_Handler,
		},
		{
			MethodName: "CreateProduct",
			Handler:    _ProductsService_CreateProduct_Handler,
		},
		{
			MethodName: "UpdateProduct",
			Handler:    _ProductsService_UpdateProduct_Handler,
		},
		{
			MethodName: "DeleteProduct",
			Handler:    _ProductsService_DeleteProduct_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "products.proto",
}