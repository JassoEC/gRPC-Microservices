#!/bin/bash

# Generate the gRPC code
protoc  --proto_path=../proto --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./src/types  --ts_proto_opt=nestJs=true orders.proto