const { v4 } = require("uuid");
const { createSchema } = require("../utils/database");


const OrderModel=createSchema({
    name:"orders",
    Schema:{
    _id:{
        type:String,
        default:v4

    },
orderId: { type: Number, required: true, unique: true },
  productId: { type: String, required: true ,ref:'products'},
  customerId: { type: String, required: true,ref:"customers" },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  region: { type: String, required: true },
  dateOfSale: { type: Date, required: true },
  quantitySold: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  discount: { type: Number, required: true },  
  shippingCost: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true }
    }
})

module.exports={
    OrderModel
}