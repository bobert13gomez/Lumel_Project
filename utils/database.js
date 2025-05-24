const mongoose=require("mongoose")
const { logger } = require("./logger")


mongoose.pluralize(null)
exports.createSchema=({name,Schema})=>{
    try{
    let ShemaType=new mongoose.Schema(Schema,{timestamps:true})
    const lumel=mongoose.model(name,ShemaType)
    return lumel
    
    }catch(err){
        logger.error(err)
    }
}