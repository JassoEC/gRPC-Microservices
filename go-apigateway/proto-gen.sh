#!/bin/bash


protoc --proto_path=../proto  --go_out=. --go-grpc_out=. orders.proto products.proto