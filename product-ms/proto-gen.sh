#!/bin/bash

# Generate the gRPC code
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./src/protos  --ts_proto_opt=nestJs=true -I  ../proto/products.proto