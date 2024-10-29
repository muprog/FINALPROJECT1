const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    fname:String,
    lname:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    phone:Number,
    usertype:String,
    status:String,
    otp: {
        type: String,
      },
      otpExpires: {
        type: Date,
      },
})


const User=mongoose.model('User',userSchema);
module.exports=User