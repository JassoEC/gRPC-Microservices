FROM node:18

WORKDIR /proto

COPY ./proto/products.proto ./
COPY ./proto/orders.proto ./

WORKDIR /app

COPY product-ms/package*.json ./

RUN npm install

COPY ./product-ms .

RUN npm run build

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app using npm
CMD ["npm", "run", "start:prod"]
