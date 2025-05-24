const bcrypt=require('bcryptjs')
const { lumel } = require('../model/user.model')
const { logger } = require('../utils/logger')

exports.createUser=async(req,res)=>{

try{
   const createUser= await lumel.create({
       ...req.body
    })
    
return res.status(200).send({message:"User Created Successfully"})
}catch(err){
     logger.error(err.message)
    return res.status(500).send({status:500,message:err.message})
   
}
}

exports.getUser=async(req,res)=>{
const cId=req.query.cid
try{
const GetUser= await lumel.findOne({customerId:cId })
if(!GetUser){
return res.status(404).send({status:404,message:"User not found"})
}
    
return res.status(200).send({status:true,data:GetUser})
}catch(err){
     logger.error(err.message)
    return res.status(500).send({status:500,message:err.message})
   
}
}