const { v4 } = require("uuid");
const { createSchema } = require("../utils/database");

const lumel=createSchema({name:"customers",Schema:{
    _id:{
        type:String,
        default:v4
    },
    customerId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
    active:{
        type:Boolean,
        default:true
    },
    status:{
        type:Boolean,
        default:true
    }

}})
module.exports={
    lumel
}

