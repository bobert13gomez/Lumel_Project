const { v4 } = require("uuid");
const { createSchema } = require("../utils/database");


const Product=createSchema({
    name:'products',
    Schema:{
        _id:{
            type:String,
            default:v4

        },
 productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  active:{
type:Boolean,
default:true
  },
  status:{
type:Boolean,
default:true
  }
    }
})

module.exports={
    Product
}