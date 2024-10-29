const mongoose=require('mongoose');
const {Schema}=mongoose;
const FeedbackSchema=new Schema({
    username:String,
    message:String
})

const feedback=mongoose.model('feedback',FeedbackSchema)
module.exports=feedback;