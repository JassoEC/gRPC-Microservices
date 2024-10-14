FROM golang:1.23.2-alpine

WORKDIR /app

COPY go-apigateway/go.mod go-apigateway/go.sum ./

RUN go mod download

COPY ./go-apigateway .

RUN go build -o main .

EXPOSE 8080

CMD ["./main"]
