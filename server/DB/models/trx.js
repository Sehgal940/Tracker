const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    amount:Number,
    description:String,
    date:{type:Date,default:new Date},
    createdAt:{type:Date,default:Date.now},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'Users'}
})
const trx=mongoose.model('transactions',schema)
module.exports=trx