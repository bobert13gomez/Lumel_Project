const express=require("express")

const { createProduct, getProduct } = require("../service/product.service")
const router=express.Router()

router.route("/product").post(createProduct).get(getProduct)


module.exports=router