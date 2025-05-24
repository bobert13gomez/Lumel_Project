const JWT = require("jsonwebtoken")
const { logger } = require("../utils/logger")


exports.createToken=(data)=>{
  try{
    const processToken=process.env.SECRET
    const token=JWT.sign(data,processToken,{expiresIn:"8h"})
    return token

  }catch(err){
    logger.error(err.message)
  }
}

exports.verifyToken=async(req,res,next)=>{
  try{

  
     const processToken=process.env.SECRET
     console.log(req?.headers?.authorization)
    const headerToken=req?.headers?.authorization?.split(" ")[1]
    if(!headerToken){
      res.status(401).send("Unauthorized Login")
      return
    }
    const token= JWT.verify(headerToken,processToken)

    if(!token){
      res.status(401).send("Unauthorized Login")  
      return
    }
    req.user=token.id
    next()
  }catch(err){

    return res.status(401).send("Unauthorized")
  }
}