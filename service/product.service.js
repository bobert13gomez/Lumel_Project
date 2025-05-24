const { Product } = require("../model/product.model")

exports.createProduct=async(req,res)=>{
try{
    const body=req.body
    const dataToBEAdded=await Product.create(body)
        return res.status(200).send({status:true,message:"Product added sucessfully"})

}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}
exports.getProduct=async(req,res)=>{
try{
    const id=req.query.id
    const dataGet=await Product.findOne({productId:id})
    if(!dataGet){
            return res.status(404).send({status:false,message:"No product found"})

    }
    return res.status(200).send({status:true,data:dataGet})

}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}