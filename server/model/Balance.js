const mongoose=require('mongoose');
const {Schema}=mongoose;
const balanceSchema=new Schema({
email:String,
balance:Number
})


const Balance=mongoose.model('balance',balanceSchema);

module.exports=Balance;