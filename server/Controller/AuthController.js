const User=require('../model/User');
const Balance=require('../model/Balance')
const Feedback=require('../model/Feedback')
const bcrypt=require('bcrypt');
const Product=require('../model/Product');
const BuyerBuysProduct=require('../model/BuyerBuysProduct')
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const nodemailer=require('nodemailer');
const otpGenerator = require('otp-generator');
let otps = {}; // Store OTPs temporarily
const axios = require('axios');
const Payment = require('../model/Payment.js');
const CategoryAndType=require('../model/CategoryAndType.js')
const crypto = require('crypto');
const Favorite=require('../model/Favorite.js')
// const { error } = require('console');

const test=(req,res)=>{
    res.json('testing');
}



const registerUser = async (req, res) => {
    try {
        const { fname, lname, email, password, phone, usertype, confirmpassword, status } = req.body;

        // Validation logic here...
        if(!fname){
            return res.json({error:"First Name is required"});
         }
         else if(!/^[a-zA-Z\s]+$/.test(fname)){
             return res.json({error:'Name must only contain letters and spaces'})
         }
         if(!lname){
             return res.json({error:"Last Name is required"})
         }
         else if(!/^[a-zA-Z\s]+$/.test(lname)){
             return res.json({error:'Name must only contain letters and spaces'})
         }
         if(!email){
            return res.json({error:"Email is required"})
         }
         else if(!/^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/.test(email)){
             return res.json({error:'email is not Valid'})
           }
           if(!phone){
            return res.json({error:"Phone Number is required"})
         }
         else if(!/^(?:\+251|251|0)?(9|7)\d{8}$/.test(phone)){
             return res.json({error:'Phone number must be valid Ethiopian Number'})
         }
         if(!password ||password.length<6){
            return res.json({error:"Password is required or it should be at least 6 character."})
         }  
 
 
         if (!/[A-Z]/.test(password)) {
             return res.json({error:'Password must contain at least one uppercase letter.'}) 
           }
           if (!/[a-z]/.test(password)) {
             return res.json({error:'Password must contain at least one lowercase letter.'})
           }
           if (!/[0-9]/.test(password)) {
             return res.json({error:'Password must contain at least one number.'})
           
           }
           if (!/[^A-Za-z0-9]/.test(password)) {
             return res.json({error:'Password must contain at least one special character.'})
           }
 
     if(confirmpassword !== password){
         return res.json({error:'password not matched'}) 
       }
 

         if(!usertype){
             return res.json({error:"your role(seller or buyer) is required."})
         }
        // (More validation as per your existing code)

        // Check if user already exists
        const exist = await User.findOne({ email });
        if (exist) return res.json({ error: "The user already exists" });

        // Generate OTP
        const otp = otpGenerator.generate(6, { digits: true });
        const hashedOtp = await bcrypt.hash(otp, 10);
        otps[email] = hashedOtp; // Store hashed OTP temporarily

        // Send OTP via email
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'amarenibret292@gmail.com',
                pass: process.env.EMAIL_PWD
            }
        });

        var mailOptions = {
            from: 'amarenibret292@gmail.com',
            to: email,
            subject: 'Your OTP for Registration',
            text: `Your OTP is ${otp}. Please use this to complete your registration.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Failed to send OTP." });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'OTP sent to email. Please verify to complete registration.', email });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
};

// OTP Verification and User Registration
const verifyOtp = async (req, res) => {
    const { email, otp, fname, lname, password, phone, usertype, status } = req.body;

    try {
        const storedOtp = otps[email];
        if (!storedOtp || !(await bcrypt.compare(otp, storedOtp))) {
            return res.json({ error: 'Invalid or expired OTP' });
        }

        // Proceed with registration
        if(email && otp && fname && lname && password && phone && usertype && status){
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                fname, lname, email, password: hashedPassword, phone, usertype, status
            });
    
            // Clear OTP after successful registration
            await Balance.create({email:email,balance:0})
            delete otps[email];
    
            res.json({ message: "User registered successfully", user });
        }
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
};





const loginUser=async(req,res)=>{
try {
    const {email,password}=req.body;
    // if(!email){
    //     return res.json({error:"Email is required"})
    // }
    // if(!password){
    //    return res.json({error:"password is required"})
    // }

    const user=await User.findOne({email})
    if(!user) return res.json({error:"Please register first"})
    if(user.status==="off") return res.json({error:"Your status is inactive"})
     const match=await bcrypt.compare(password,user.password)
    if(match){
        jwt.sign({email:user.email,id:user._id,usertype:user.usertype,fname:user.fname,lname:user.lname},
            process.env.JWT_SECRET,
            {},
            (err,token)=>{
               if(err) throw err; 
               res.cookie("token",token).json(user)
            }
        )
        }
    if(!match){return res.json({error:"Please enter correct password."})}
    // return res.json(user)
} catch (error) {
    console.log(error)
}
}
const createProduct=async(req,res)=>{
try {
    // const {name,category, description, price,size, color,brand,owner}=req.body
    const name=req.body.name;
    const category=req.body.category;
    const type = req.body.type;
    const description=req.body.description;
    const price=req.body.price
    const size=req.body.size
    const color=req.body.color
    const brand=req.body.brand
    const manufacturedDate=req.body.manufacturedDate
    const quantity=req.body.quantity
    const owner=req.body.owner
    const photo=req.file.filename
    const status=req.body.status
    if(!name || !category || !description || !price || !size || !brand || !quantity || !owner || !photo || !type ||!manufacturedDate){
       return res.json({error:"All the inputs are necessary."});
    }
    if(price<=0){
        return res.json({error:"Price must greater than zero"})
    }
    if(quantity<=0){
        return res.json({error:"Quantity must greater than zero"})
    }
    // else{
        
    // }
    if(description){if(description.length>300){
        return res.json({error:"The length of description must be less than 300."});
    }}
    const newProduct=await Product.create({name,photo,category, type,description, price,size, color,brand,manufacturedDate,quantity,owner,status})
    res.json(newProduct);
} catch (error) {
    console.log(error);
}
}
const displayProducts=async(req,res)=>{
    try {
        const product= await Product.find();
    res.json(product);
    } catch (error) {
        console.log(error);
    }
}
const getProfile=(req,res)=>{
const {token}=req.cookies;

if(token){
    jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
        if(err) throw err;
        res.json(user); 
    })
}else{
    res.json('null');
}
}
const sellerProduct=async(req,res)=>{
try {
    const data=await Product.find();
    res.json(data);
} catch (error) {
    console.log(error);
}
}

const logOut=(req,res)=>{
    
res.clearCookie("token");
res.json({message:'Logged out successfully'})
}


const getProducts=(req,res)=>{
    const id=req.params.id;
    Product.findById({_id:id})
           .then(products=>res.json(products))
           .catch(err=>res.json(err));
  }

  const updateProduct=(req,res)=>{
    const id=req.params.id 
    const name=req.body.name
    const category=req.body.category
    const description=req.body.description
    const price=req.body.price
    const size=req.body.size
    const color=req.body.color
    const brand=req.body.brand
    const quantity=req.body.quantity
    const owner=req.body.owner
    const photo=req.file.filename
    const manufacturedDate=req.body.manufacturedDate
    const type=req.body.type
    Product.findByIdAndUpdate({_id:id},{  
       name:name,
       photo:photo,
       category:category,
       type:type,
       description:description,
       price:price,
       size:size,
       color:color,
       brand:brand,
       manufacturedDate:manufacturedDate,
       quantity:quantity,
       owner:owner
    })
        .then(products=>res.json(products))
        .catch(err=>res.json(err));
  } 

const deleteProducts=(req,res)=>{
const id=req.params.id;
Product.findByIdAndDelete({_id:id})
.then(res=>res.json(res))
.catch(err=>res.json(err)); 
}
const buyerBuysProduct=async(req,res)=>{
    try {
    const {buyer,totalPrice,address,phone,status}=req.body
    const buys=req.body.buys
    if(!buyer || !totalPrice || !buys || !address || !phone ){
        return res.json({error:"buyer total price and the products are required"})
    }else  if(!/^(?:\+251|251|0)?(9|7)\d{8}$/.test(phone)){
        return res.json({error:'Phone number must be valid Ethiopian Number'})
    }
  
    const userBalance=await  Balance.findOne({email:buyer})
    if(userBalance){
        if(userBalance.balance>totalPrice){
            const buyerBuysProduct =await BuyerBuysProduct.create({buyer,buys,address,phone,totalPrice,status})
            res.json(buyerBuysProduct); 
        }
    }
        
  
    
} catch (error) {
        console.log(error);
    }
}

const getBuyerBuysProduct=async (req,res)=>{
try {
    const getBuyerBuysProduct=await BuyerBuysProduct.find();
    return res.json(getBuyerBuysProduct)
} catch (error) {
    console.log(error)
}
}

// const forgotPassword=(req,res)=>{
//     const {email}=req.body;
//     User.findOne({email:email})
//         .then(user=>{
//             if(!user){
// return res.send({Status:"user not exist"})
//             }
//     const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'amarenibret292@gmail.com',
//     pass: process.env.EMAIL_PWD
//   }
// });

// var mailOptions = {
//   from: 'amarenibret292@gmail.com',
//   to: user.email,
//   subject: 'Reset your password',
//   text: `http://localhost:3000/reset-password/${user._id}/${token}`
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     return res.send({Status:"Success"})
//   }
// });
//         })
// }


// const resetPassword=(req,res)=>{
//     const {id,token}=req.params;
//     const {password}=req.body;
//     jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
//         if(err){
//             res.json({Status:"Error with token"})
//         } else{
//             bcrypt.hash(password,10)
//             .then(hash=>{
//                 User.findByIdAndUpdate({_id:id},{password:hash})
//                     .then(u=>res.send({Status:"Success"}))
//                     .catch(err=>res.send({Status:err}))
//             })
//         }
//     })
// }



const sendOtp = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();
  
      // Save OTP and expiration (for demonstration purposes, this is simple)
      await User.findOneAndUpdate(
        { email },
        { otp, otpExpires: Date.now() + 15 * 60 * 1000 } // OTP expires in 15 minutes
      );
  
      // Set up email transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'amarenibret292@gmail.com',
          pass: process.env.EMAIL_PWD,
        },
      });
  
      // Email options
      const mailOptions = {
        from: 'amarenibret292@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 15 minutes.`,
      };
  
      // Send OTP email
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ Status: 'Error sending OTP' });
        }
        res.json({ Status: 'Success' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Status: 'Error' });
    }
  };




  const verifyOtpAndResetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
  
    try {
      // Find user and verify OTP
      const user = await User.findOne({ email });
      if (!user) return res.json({ Status: 'User not found' });
      if (user.otp !== otp) return res.json({ Status: 'Invalid OTP' });
      if (user.otpExpires < Date.now()) return res.json({ Status: 'OTP expired' });
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password in the database
      await User.findOneAndUpdate({ email }, { password: hashedPassword, otp: null, otpExpires: null });
  
      res.json({ Status: 'Success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Status: 'Error' });
    }
  };



const balances=async(req,res)=>{
    const {email,sum,processedArray}=req.body;

   const balance= await Balance.findOne({email})
if(balance) {
    if(balance.balance>sum){
      await  Balance.findByIdAndUpdate({_id:balance._id},{balance:balance.balance-sum})
      if(processedArray){
        processedArray.map(async(Element)=>{
        const product=await Product.findOne({_id:Element.product})
            await  Product.findByIdAndUpdate({_id:Element.product},{quantity:product.quantity-Element.quantity}) 
        })
      }
    }else if(balance.balance<sum){
        return res.json({error:"Your balance is insufficience"})
    }
};

}


const getBalance=async(req,res)=>{
const userBalance=await Balance.find();
res.json(userBalance)
}

const getUsers=async(req,res)=>{
const users=await User.find();
res.json(users)
}

const updateStatus=async(req,res)=>{
// const id1=req.params.id;
const {id}=req.body;
if(id){
    const user=await User.findOne({_id:id});
    if(user){
    
    if(user.status==="on"){
        await User.findByIdAndUpdate({_id:id},{status:"off"})
        res.json("on")
    }
    if(user.status==="off"){
        await User.findByIdAndUpdate({_id:id},{status:"on"})
        res.json("off")
    }
    // res.json('yes')

    }
    // res.json(id)
}else{
    res.json('no')
}



}

const feedback=async(req,res)=>{
try {
    const {feedback,email}=req.body;
    if(feedback && email){
Feedback.create({username:email,message:feedback})
res.json('successfull')
    }
} catch (error) {
    console.log(error);
}
}
const getFeedback=async(req,res)=>{
try {
   const feedback=await Feedback.find()
   res.json(feedback)
} catch (error) {
    console.log(error);
}
}


const restrictCart=async(req,res)=>{
try {
    const {email}=req.body;
    const user=await User.findOne({email})
    if(user){
        return res.json(user);
    }else{
        return res.json({error:"The user is not found"})
    }

} catch (error) {
    console.log(error)
}
}
const updateProductStatus=async(req,res)=>{
try {
    const {status,id}=req.body;
    // res.json(status)
    if(!status || !id){
       return res.json({error:"status or id is not available"})
    }
    if(status==="on"){
        const product= await Product.findByIdAndUpdate({_id:id},{status:"off"})
        return res.json(product);
    }
     if(status==="off"){
       const product= await Product.findByIdAndUpdate({_id:id},{status:"on"})
        return res.json(product);
    }
} catch (error) {
    console.log(error);
}
}



const updateDeliveryStatus=async(req,res)=>{
try {
    const {status,id}=req.body
    if(status==="unChecked"){
       const buyerBuysProduct= await BuyerBuysProduct.findByIdAndUpdate({_id:id},{status:"Checked"})
  
    if(buyerBuysProduct){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'amarenibret292@gmail.com',
              pass: process.env.EMAIL_PWD
            }
          });
          
          var mailOptions = {
            from: 'amarenibret292@gmail.com',
            to: buyerBuysProduct.buyer,
            subject: 'Delivery package',
            text: `Your package will arrive soon.`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status:"Success"})
            }
          });

              return res.json(buyerBuysProduct)
    }  
    }
} catch (error) {
    console.log(error);
}
}

const forgotPassword=(req,res)=>{

}
const resetPassword=(req,res)=>{

}



// const createAdder = async (req, res) => {
//     try {
//         const { fname, lname, email, password, phone, usertype, confirmpassword, status } = req.body;

//         // Validation logic here...
//         if(!fname){
//             return res.json({error:"First Name is required"});
//          }
//          else if(!/^[a-zA-Z\s]+$/.test(fname)){
//              return res.json({error:'Name must only contain letters and spaces'})
//          }
//          if(!lname){
//              return res.json({error:"Last Name is required"})
//          }
//          else if(!/^[a-zA-Z\s]+$/.test(lname)){
//              return res.json({error:'Name must only contain letters and spaces'})
//          }
//          if(!email){
//             return res.json({error:"Email is required"})
//          }
//          else if(!/^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/.test(email)){
//              return res.json({error:'email is not Valid'})
//            }
//            if(!phone){
//             return res.json({error:"Phone Number is required"})
//          }
//          else if(!/^(?:\+251|251|0)?(9|7)\d{8}$/.test(phone)){
//              return res.json({error:'Phone number must be valid Ethiopian Number'})
//          }
//          if(!password ||password.length<6){
//             return res.json({error:"Password is required or it should be at least 6 character."})
//          }  
 
 
//          if (!/[A-Z]/.test(password)) {
//              return res.json({error:'Password must contain at least one uppercase letter.'}) 
//            }
//            if (!/[a-z]/.test(password)) {
//              return res.json({error:'Password must contain at least one lowercase letter.'})
//            }
//            if (!/[0-9]/.test(password)) {
//              return res.json({error:'Password must contain at least one number.'})
           
//            }
//            if (!/[^A-Za-z0-9]/.test(password)) {
//              return res.json({error:'Password must contain at least one special character.'})
//            }
 
//      if(confirmpassword !== password){
//          return res.json({error:'password not matched'}) 
//        }
 

//          if(!usertype){
//              return res.json({error:"your role(seller or buyer) is required."})
//          }
//         // (More validation as per your existing code)

//         // Check if user already exists
//         const exist = await User.findOne({ email });
//         if (exist) return res.json({ error: "The user already exists" });
//         const user=await User.create({ fname, lname, email, password, phone, usertype, confirmpassword, status })
//         if(user){
//             res.json({success:"Successfully registered."})
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: 'Something went wrong!' });
//     }
// };

const createAdder = async (req, res) => {
    try {
        const { fname, lname, email, password, phone, usertype, confirmpassword, status } = req.body;

        // Validation logic here...
        if(!fname) {
            return res.json({ error: "First Name is required" });
        } else if(!/^[a-zA-Z\s]+$/.test(fname)) {
            return res.json({ error: 'Name must only contain letters and spaces' });
        }

        if(!lname) {
            return res.json({ error: "Last Name is required" });
        } else if(!/^[a-zA-Z\s]+$/.test(lname)) {
            return res.json({ error: 'Name must only contain letters and spaces' });
        }

        if(!email) {
            return res.json({ error: "Email is required" });
        } else if(!/^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/.test(email)) {
            return res.json({ error: 'Email is not valid' });
        }

        if(!phone) {
            return res.json({ error: "Phone Number is required" });
        } else if(!/^(?:\+251|251|0)?(9|7)\d{8}$/.test(phone)) {
            return res.json({ error: 'Phone number must be a valid Ethiopian number' });
        }

        if(!password || password.length < 6) {
            return res.json({ error: "Password is required or it should be at least 6 characters." });
        }

        if (!/[A-Z]/.test(password)) {
            return res.json({ error: 'Password must contain at least one uppercase letter.' });
        }

        if (!/[a-z]/.test(password)) {
            return res.json({ error: 'Password must contain at least one lowercase letter.' });
        }

        if (!/[0-9]/.test(password)) {
            return res.json({ error: 'Password must contain at least one number.' });
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            return res.json({ error: 'Password must contain at least one special character.' });
        }

        if (confirmpassword !== password) {
            return res.json({ error: 'Passwords do not match' });
        }

        if(!usertype) {
            return res.json({ error: "Your role (seller, buyer, or adder) is required." });
        }

        // Check if user already exists
        const exist = await User.findOne({ email });
        if (exist) return res.json({ error: "The user already exists" });

        // Hash the password before saving it to the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with hashed password
        if(email && fname && lname && password && phone && usertype && status){
            const user = await User.create({ 
                fname, 
                lname, 
                email, 
                password: hashedPassword, // Save the hashed password
                phone, 
                usertype, 
                status 
            });
    
            if(user) {
                res.json({ success: "Successfully registered." });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
};




const createPayment = async (req, res) => {
    // const { amount } = req.body;
    const { buyer,buys,address,phone,
            totalPrice,paymentDate,status,
            fname,lname} =req.body;
    try {
        // if(!address || !phone) return  res.json({error:"address and phone number are required"})
  const payment = new Payment({ amount:totalPrice, reference: generateReference() });
    await payment.save();

      const buyerBuysProduct =await BuyerBuysProduct.create({buyer,buys,address,phone,totalPrice,status})
      if(buys){
        buys.map(async(Element)=>{
        const product=await Product.findOne({_id:Element.product})
            await  Product.findByIdAndUpdate({_id:Element.product},{quantity:Element.quantity<=product.quantity?product.quantity-Element.quantity:product.quantity}) 
        })
      }
     const reference=generateReference()
      const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', {
        amount: totalPrice,
        currency: 'ETB',
        email: buyer,
        first_name: fname,
        last_name: lname,
        tx_ref: payment.reference,
        callback_url: 'http://localhost:3000/payment-result' // Chapa's callback URLhttp://localhost:3000/payment-result
      }, {
        headers: {
          Authorization:`Bearer ${process.env.CHAPA_SECRET_KEY}`
        }
      });
  
      res.status(200).json({
        chapaUrl: response.data.data.checkout_url,
        reference: payment.reference
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      res.status(500).json({ error: 'Payment initialization failed' });
    }
  };

  const confirmPayment = async (req, res) => {
    const { reference } = req.params;
  
    try {
      const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
        }
      });
  
      const payment = await Payment.findOne({ reference });
      if (!payment) return res.status(404).json({ error: 'Payment not found' });
  
      if (response.data.data.status === 'success') {
        payment.status = 'completed';
      } else {
        payment.status = 'failed';
      }
  
      await payment.save();
      res.status(200).json(payment);
    } catch (error) {
      console.error('Payment verification error:', error);
      res.status(500).json({ error: 'Payment verification failed' });
    }
  };
  const generateReference = () => {
    return 'tx-' + Math.random().toString(36).substr(2, 9);
  };
  const categoryAndType=async(req,res)=>{
try {
    const {category,a}=req.body;
    const categoryAndType=await CategoryAndType.create({category:category.category,types:[...a]})
    if(categoryAndType){
       return res.json({success:'successfully created'})
    }
    if(!categoryAndType){
        return res.json({error:"The category does not created."})
    }
} catch (error) {
    console.log(error);
}
  }

  const getCategoryAndType=async(req,res)=>{
try {
    const categoryAndType=await CategoryAndType.find();
    res.json(categoryAndType)
} catch (error) {
    res.json(error);
}
  }

const updateCategoryAndType= async (req, res) => {
    try {
        const { id } = req.params;
        const { category, types } = req.body;

        // Find and update the category
        const updatedCategory = await CategoryAndType.findByIdAndUpdate(
            id,
            { category, types },
            { new: true }
        );

        if (updatedCategory) {
            return res.json({ success: 'Category and types updated successfully' });
        } else {
            return res.json({ error: 'Category not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}  
const Favorite1=async (req, res) => {
    const { productId, userEmail, name, brand, size, price, quantity ,photo} = req.body;
  
    try {
      // Find or create the user's favorites document
      let favorite = await Favorite.findOne({ userEmail });
  
      if (!favorite) {
        favorite = new Favorite({ userEmail, products: [] });
      }
  
      // Check if the product is already in the user's favorites
      const existingProduct = favorite.products.find(product => product.productId.toString() === productId);
  
      if (existingProduct) {
        return res.json({exist:'Product already in favorites'});
      }
  
      // Add the new product to the favorites array
      favorite.products.push({
        productId,
        name,
        brand,
        size,
        price,
        quantity,
        photo
      });
  
      await favorite.save();
      res.json({ success: true, message: 'Product added to favorites' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  const getFavorite=async (req, res) => {
    const { userEmail } = req.params;
  
    try {
      const favorite = await Favorite.findOne({ userEmail }).exec();
  
      if (!favorite) {
        return res.status(404).json({ message: 'No favorites found for this user.' });
      }
  
      res.json({ favorites: favorite.products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }


  const removeFavorite=async (req,res)=>{
    const {id}=req.body;
    Favorite.findByIdAndDelete({_id:id})

  }
  const DeleteFavorite= (req, res) => {
    const { email, productId } = req.params;
    
    // Logic to find the user's favorites and remove the product with productId
    Favorite.updateOne(
      { userEmail: email }, 
      { $pull: { products: { _id: productId } } }
    )
    .then(() => res.status(200).send('Favorite removed.'))
    .catch((error) => res.status(500).send('Error removing favorite.'));
  }




module.exports={test,registerUser,loginUser,createProduct,displayProducts,getProfile,sellerProduct,logOut,getProducts,updateProduct,deleteProducts,buyerBuysProduct,getBuyerBuysProduct,forgotPassword,resetPassword,balances,getBalance,getUsers,updateStatus,feedback,getFeedback,restrictCart,updateProductStatus,updateDeliveryStatus,verifyOtp,sendOtp,verifyOtpAndResetPassword,createAdder,createPayment,confirmPayment,categoryAndType,getCategoryAndType,updateCategoryAndType,Favorite1,getFavorite,removeFavorite,DeleteFavorite};
