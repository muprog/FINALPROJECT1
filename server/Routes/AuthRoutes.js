const express=require('express');
const router=express.Router();
const cookieParser=require('cookie-parser');
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
                    cb(null,"../../FINALPROJECT/client/src/images/");
            },
    filename:function(req,file,cb){
            const uniqueSuffix=Date.now();
            cb(null,uniqueSuffix+file.originalname);
    },  
})
const upload=multer({"storage":storage
    ,
    fileFilter(req, file, cb) {
        if (!file.originalname) {
          // If the file is empty, return an error
          return cb(new Error('Please select a file'));
        }
        // If the file is valid, continue with the upload
        cb(null, true);
      }
})
const {test,registerUser,loginUser,createProduct,displayProducts,getProfile,sellerProduct, logOut ,getProducts ,updateProduct ,deleteProducts,buyerBuysProduct,getBuyerBuysProduct,forgotPassword,balances,getBalance,getUsers, updateStatus, feedback,getFeedback,restrictCart,updateProductStatus,updateDeliveryStatus,verifyOtp,sendOtp,verifyOtpAndResetPassword,createAdder,createPayment,confirmPayment,categoryAndType,getCategoryAndType,updateCategoryAndType,Favorite1,getFavorite,removeFavorite,DeleteFavorite}=require('../Controller/AuthController')
const cors=require('cors');

router.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}
))
router.use(cookieParser());
router.get('/',displayProducts);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/createproduct',upload.single("photo"),createProduct)
router.post('/logout',logOut);
router.get('/profile',getProfile);
router.get('/seller-products',sellerProduct);
router.get('/update/:id',getProducts);
router.put('/update1/:id',upload.single("photo"),updateProduct)
router.delete('/deleteProducts/:id',deleteProducts);
router.post('/buyer-buys-product',buyerBuysProduct);
router.get('/getBuyerBuysProduct',getBuyerBuysProduct)
router.post('/forgot-password',forgotPassword)
// router.post('/reset-password/:id/:token',resetPassword)
router.post('/balances',balances);
router.get('/get-balance',getBalance);
router.get('/user',getUsers);
router.post('/update-status',updateStatus)
router.post('/feedback',feedback)
router.get('/get-feedback',getFeedback)
router.post('/restrict-cart',restrictCart)
router.post('/update-product-status',updateProductStatus);
router.post('/update-delivery-status',updateDeliveryStatus);
router.post('/verify-otp',verifyOtp);
router.post('/send-otp', sendOtp);
router.post('/verify-otp1', verifyOtpAndResetPassword);
router.post('/create-adder', createAdder);
router.post('/create', createPayment);
router.get('/verify/:reference', confirmPayment);
router.post('/categoryAndType', categoryAndType);
router.get('/categoryAndType', getCategoryAndType);
router.put('/update-categoryAndType/:id',updateCategoryAndType);
router.post('/favorite', Favorite1);
router.get('/favorites/:userEmail', getFavorite);
router.get('/favorites/:userEmail', getFavorite);
router.post('/remove-favorite',removeFavorite)
router.delete('/favorites/:email/:productId',DeleteFavorite);
module.exports=router;
