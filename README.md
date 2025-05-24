# Lumel# 🧾 Sales Data Management API

This project handles sales data from a CSV file using MongoDB, Mongoose, Express, and Node.js. It allows creating and managing customers, products, and orders, performs revenue calculations, and runs a background cron job to auto-import data from CSV every 10 min.

---

## Features

### CSV Import with Cron Job
- Reads `orders.csv` every 10 min.
- Checks for duplicate `Order ID` before inserting.
- Automatically skips existing orders and logs them.
- Supports quick scaling for large file imports.

### Customer API
- `POST /v1/user`: Create a new customer.
- `GET /v1/user`: Use query for get.
- Stores name, email, and address.
- Prevents duplicates, handles validation and errors cleanly.

### Product API
- `POST /v1/products`: Create a new product.
- Stores product name, category, and price-related details.

### Orders API
- `POST /v1/orders`: Create a new order with references to product & customer.
- `GET /v1/orders?id=1001`: Fetch a single order with populated product and customer details. Use query for get by id

###  Revenue Calculation API
- `GET /v1/ordersRevenue`: Calculate revenue with optional filters:
  - `productid`
  - `category`
  - `region`
  - `startDate` and `endDate`
- Total Revenue =  
  `quantity × unitPrice × (1 - discount)` + `shippingCost`

---

## Smart Error Handling

| Case | Action |
|------|--------|
| Duplicate entry | Skips and logs: `Order already exists` |
| Missing required field | Returns 400 Bad Request |
| DB failures | Catches errors and sends 500 response |
| Wrong date or ID | Validated before query to avoid crash |
| File issues | Logs missing or malformed CSV problems |

---


