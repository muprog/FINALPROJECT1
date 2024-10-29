// import React, { useEffect } from 'react'
// import { useContext } from 'react'
// import { userContext } from './UserContext'
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// export default function ProductAdder() {
//   const navigate=useNavigate();
//     const {user}=useContext(userContext);
//     useEffect(()=>{

      
//            axios.get('/profile')
//            .then(res=>{
//             // console.log(res.data)
//           if(res.data==='null'){
//             navigate('/login')
//           }
//           })
//            .catch(err=>console.log(err));
//         },[])
//   return (
//     <div>
//     <div>{!user.email?"":<h1>WELCOME {user.email}</h1>}</div>
//     <div className='seller-dashboard-boxs-outer'>
//        <div className='seller-dashboard-boxs'><Link to='/createproduct'>Add product</Link></div>
//        <div className='seller-dashboard-boxs'><Link to='/seller-products'>Your products</Link></div>
//        </div>
//     </div>
//   )
// }

import React, { useEffect } from 'react';
import { useContext } from 'react';
import { userContext } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import  '../style/productAdder.css'  // Import CSS for styling
import addproduct from "../image/addproduct.jfif"
import viewproduct from '../image/viewproduct.png'
import feedback from '../image/feedback.png'

export default function ProductAdder() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  useEffect(() => {
    axios.get('/profile')
      .then(res => {
        if (res.data === 'null') {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  return (
    <div className="product-adder-container">
      <div className="welcome-message">
        {user?.email && <h1>Welcome, {user.email}!</h1>}
      </div>
      <div className="dashboard-options">
        <div className="dashboard-option">
          <div>
          <Link to='/createproduct' className="dashboard-link">
            Add Product
            <img src={addproduct} alt='add product' />
          </Link>
          </div>
        </div>
        <div className="dashboard-option">
          <div>
          <Link to='/seller-products' className="dashboard-link">
            Your Products
            <img src={viewproduct} alt='your product' />
          </Link>
          </div>
        </div>
        <div className="dashboard-option">
          <div>
          <Link to='/feedback' className="dashboard-link">
            Send FeedBack
            <img src={feedback} alt='your product' />
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
