import axios from 'axios';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Header from './Component/Header';
import { Toaster } from 'react-hot-toast';
import Buyer from './pages/buyerpage/Buyer';
import Login from './pages/Login';
import Admin from './pages/adminpage/Admin';
import Seller from './pages/sellerpage/Seller';
import CreateProduct from './pages/sellerpage/CreateProduct';
import SellerProducts from './Component/SellerProducts'
import { UserContextProvider } from './Component/UserContext';
import UpdateRegisteredProduct from './Component/UpdatedRegisteredProduct';
// import { userContext } from './Component/UserContext';
// import { useContext, useEffect } from 'react';
import Cart from './Component/Cart';
import Footer from './Component/Footer';
import ForgotPassword from './Component/ForgotPassword'
import ResetPassword from './Component/ResetPassword';
import Proceed from './Component/Proceed';
// import Header1 from './Component/Header1';
import SoldProductInformation from './Component/SoldProductInformation';
import ScrollTrial from './Component/ScrollTrial';
import ProductAdder from './Component/ProductAdder';
import ViewProductInformation from './Component/ViewProductInformation'
import UserStatus from './Component/UserStatus';
import CreateProductAdder from './Component/CreateProductAdder';
import Feedback from './Component/Feedback';
import ViewFeedBack from './Component/ViewFeedBack';
import './style/app.css';
import About from './Component/About';
import PrivacyPolicy from './Component/PrivacyPolicy';
import Return from './Component/Return';
import Terms from './Component/Terms';
import HelpCenter from './Component/HelpCenter';
import ProductDetail from './Component/ProductDetail';
import Developer from './Component/Developer';
import DeliveryStatus from './Component/DeliveryStatus';
import VerifyOtp from './Component/VerifyOtp';
import Success from './Component/Success';
import Cancel from './Component/Cancel';
import Payment from './Component/Payment';
import PaymentResult from './Component/PaymentResult';
import CreateProductType from './Component/CreateProductType';
import UpdateProductType from './Component/UpdateProductType';
import Favorite from './Component/Favorite';
//import BannerPage from './pages/BannerPage';
axios.defaults.baseURL="http://localhost:8000";
axios.defaults.withCredentials=true;
function App() {
  //ADMIN
  //username:amarenibret292@gmail.com
  //password:123456

  //seller or owner
  //username:muprog4@gmail.com
  //password:Adoni1,

  //buyer
  //username:adoniseid940@gmail.com
  //password:Adoniyas1,
  
  //product adder
  //username:telaynew11@gmail.com
  //password:Telaynew1,
 
  return (
    <Router>
      <div className='app-whole-div'>
      <div>
      <UserContextProvider>
      <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
      <div>
        <Header />
      </div>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/buyer' element={<Buyer/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/seller' element={<Seller/>}/>
      <Route path='/createproduct' element={<CreateProduct/>}/>
      <Route path='/seller-products' element={<SellerProducts/>}/>
      <Route path='/update/:id' element={<UpdateRegisteredProduct  />}/>
      <Route path='/cart' element={<Cart  />}/>
      <Route path='/forgot-password' element={<ForgotPassword  />}/>
      <Route path='/reset-password/:id/:token' element={<ResetPassword  />}/>
      <Route path='/proceed' element={<Proceed  />}/>
      <Route path='/sold-product-information' element={<SoldProductInformation  />}/>
      <Route path='/scroll-trial' element={<ScrollTrial  />}/>
      <Route path='/adder' element={<ProductAdder  />}/>
      <Route path='/view-product-information' element={<ViewProductInformation  />}/>
      <Route path='/user-status' element={<UserStatus/>}/>
      <Route path='/create-product-adder' element={<CreateProductAdder/>}/>
      <Route path='/feedback' element={<Feedback/>}/>
      <Route path='/get-feedback' element={<ViewFeedBack/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/privacy' element={<PrivacyPolicy />} />
      <Route path='/returns' element={<Return />} />
      <Route path='/terms' element={<Terms/>} />
      <Route path='/help' element={<HelpCenter/>} />
      <Route path='/developer' element={<Developer/>} />
      <Route path='/product-detail/:id' element={<ProductDetail />} />
      <Route path='/delivery-status' element={<DeliveryStatus />} />
      {/* <Route path='/verify-otp/:email' element={<VerifyOTP />} /> */}
      <Route path="/verify-otp1/:email" element={<VerifyOtp />} />
      <Route path="/success" element={<Success />} />
      <Route path="cancel" element={<Cancel />} />
      {/* <Route path='/deleteUser/:id' ele */}
      <Route path="/payment" element={<Payment />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/create-product-type" element={<CreateProductType />} />
        <Route path="/update-product-type" element={<UpdateProductType />} />
        <Route path="/favorite" element={<Favorite />} />
    </Routes>
    </UserContextProvider>
    </div>
    <div>
      <Footer/>
    </div>
    </div>
  </Router>
  
  );
}

export default App;
