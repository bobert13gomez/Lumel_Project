const express=require("express")

const { createOrder, getOrder, revenueCalculation } = require("../service/order.services")
const router=express.Router()

router.route("/orders").post(createOrder).get(getOrder)
router.route("/ordersRevenue").get(revenueCalculation)


module.exports=router