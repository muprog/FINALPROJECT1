const mongoose=require('mongoose');
const {Schema}=mongoose;
const categoryAndTypeSchema=new Schema({
category:String,
types:[String]
})


const CategoryAndType=mongoose.model('categoryAndType',categoryAndTypeSchema);

module.exports=CategoryAndType;