const mongoose=require('mongoose');
const {Schema}=mongoose;
const buysSchema=new Schema({
    product:String,
    quantity:Number
})
const buyerProductSchema=new Schema({
    buyer:String,
    buys:[buysSchema],
    address:String,
    phone:String,
    totalPrice:Number,
    paymentDate: {
        type: Date,
        default: Date.now // Automatically set to current date
    },
    status:String
},{
    collection:"buyerBuysProduct"
}
)

const BuyerBuysProduct=mongoose.model('buyerProductSchema',buyerProductSchema)
module.exports=BuyerBuysProduct;