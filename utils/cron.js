const fs = require("fs");
const csv = require("csv-parser");
const { OrderModel } = require("../model/order.model");
exports.evaluateCronOrderData=async () => {
  console.log("🔄 Running CSV import job...");

  const results = [];

  fs.createReadStream("./data/orders.csv")
    .pipe(csv())
    .on("data", (row) => {
      results.push(row);
    })
    .on("end", async () => {
      for (const order of results) {
        try {
          const exists = await OrderModel.findOne({ orderId: order["Order ID"] });

          if (!exists) {
            await OrderModel.create({
              orderId: order["Order ID"],
              productId: order["Product ID"],
              customerId: order["Customer ID"],
              quantitySold: Number(order["Quantity Sold"]),
              unitPrice: Number(order["Unit Price"]),
              discount: Number(order["Discount"]),
              shippingCost: Number(order["Shipping Cost"]),
              category: order["Category"],
              region: order["Region"],
              dateOfSale: new Date(order["Date of Sale"]),
              paymentMethod: order["Payment Method"],
              customerEmail:order["Customer Email"],
              customerAddress:order["Customer Address"],
              customerName:order["Customer Name"],
              productName:order["Product Name"]
            });
            console.log(`Order ${order["Order ID"]} inserted.`);
          } else {
            console.log(` Order ${order["Order ID"]} already exists. Skipped.`);
          }
        } catch (err) {
          console.error(`Error with Order ${order["Order ID"]}: ${err.message}`);
        }
      }
      console.log(" CSV import finished.");
    })}