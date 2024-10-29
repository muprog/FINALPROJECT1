const mongoose=require('mongoose')
const {Schema}=mongoose;
const userSchema=new Schema({
    name:String,
    photo:String,
    category:String,
    type:String,
    description:String,
    price:Number,
    size:String,
    color:String,
    brand:String,
    manufacturedDate:Date,
    quantity:String,
    owner:String,
    status:String,
    createdDate: {
        type: Date,
        default: Date.now // Automatically set to current date
    }
},{
    collection:"products"
}
)

const Product=mongoose.model('product',userSchema)
module.exports=Product;