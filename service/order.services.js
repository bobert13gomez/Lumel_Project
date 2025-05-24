const { OrderModel } = require("../model/order.model")
const { Product } = require("../model/product.model")

exports.createOrder=async(req,res)=>{
try{
    const body=req.body
    const OrderData=await OrderModel.create(body)
        return res.status(200).send({status:true,message:"Order added sucessfully"})

}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}
exports.getOrder=async(req,res)=>{
try{
    const id=parseInt(req.query.id)
  const dataGet = await OrderModel.aggregate([
  { $match: { orderId: id } },

  {
    $lookup: {
      from: "products",          
      localField: "productId",   
      foreignField: "productId",      
      as: "productDetails"
    }
  },
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "customerId",
      as: "customerDetails"
    }
  },
  { $unwind: "$productDetails" },
  { $unwind: "$customerDetails" }
]);

    if(!dataGet){
            return res.status(404).send({status:false,message:"No product found"})

    }
    return res.status(200).send({status:true,data:dataGet})

}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}

exports.revenueCalculation = async (req, res) => {
  try {
    const { productid, category, region, startDate, endDate, groupBy, trendPeriod } = req.query;
    let match = {};
    if (productid) match.productId = productid;
    if (category) match.category = category;
    if (region) match.region = region;
    if (startDate || endDate) {
      match.dateOfSale = {};
      if (startDate) match.dateOfSale.$gte = new Date(startDate);
      if (endDate) match.dateOfSale.$lte = new Date(endDate);
    }
    const project = {
      $project: {
        productId: 1,
        category: 1,
        region: 1,
        dateOfSale: 1,
 revenue: { 
      $add: [
        { $multiply: ["$quantitySold", "$unitPrice", { $subtract: [1, "$discount"] }] }, 
        "$shippingCost"
      ]
    },      }
    };
    let groupId = null;

    if (trendPeriod === "monthly") {
      groupId = { year: { $year: "$dateOfSale" }, month: { $month: "$dateOfSale" } };
    } else if (trendPeriod === "quarterly") {
      groupId = { year: { $year: "$dateOfSale" }, quarter: { $ceil: { $divide: [{ $month: "$dateOfSale" }, 3] } } };
    } else if (trendPeriod === "yearly") {
      groupId = { year: { $year: "$dateOfSale" } };
    } else if (groupBy === "product") {
      groupId = "$productId";
    } else if (groupBy === "category") {
      groupId = "$category";
    } else if (groupBy === "region") {
      groupId = "$region";
    } else {
      groupId = null; 

  
    const pipeline = [{ $match: match }, project];

    if (groupId) {
      pipeline.push({
        $group: {
          _id: groupId,
          totalRevenue: { $sum: "$revenue" }
        }
      });
    } else {
      pipeline.push({
        $group: {
          _id: null,
          totalRevenue: { $sum: "$revenue" }
        }
      });
    }

    pipeline.push({ $sort: { totalRevenue: -1 } });
    const results = await OrderModel.aggregate(pipeline);

    res.status(200).json(results);

  } 
}catch(err){
        return res.status(500).send({status:false,message:err.message})

}}
