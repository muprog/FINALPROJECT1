// import React, { useEffect, useState } from 'react'
// import HandleLogout from '../../Component/HandleLogout';
// import { Link } from 'react-router-dom';
// import axios from "axios"
// import { useNavigate } from 'react-router-dom';
// import { userContext } from '../../Component/UserContext'; 
// import { useContext } from 'react';
// import '../../style/seller.css';
// export default function Seller() {
//   const {user}=useContext(userContext)
//   const navigate=useNavigate();
//   let totalSale=0;
//   // const [priceOfSoldProducts,setPriceOfSoldProducts]=useState([])
//   const [priceOfSoldProducts,setPriceOfSoldProducts]=useState([])
//   useEffect(()=>{
// axios.get('/getBuyerBuysProduct')
//      .then((res)=>{
//       setPriceOfSoldProducts(res.data);
//       })
//      .catch(err=>console.log(err))
//      axios.get('/profile')
//      .then(res=>{
//       // console.log(res.data)
//     if(res.data==='null'){
//       navigate('/login')
//     }
//     })
//      .catch(err=>console.log(err));
//   },[])

// if(priceOfSoldProducts){
//   priceOfSoldProducts.map(Element=>totalSale+=Element.totalPrice)
// }




// totalSale= new Intl.NumberFormat('en-US', {
//   style: 'decimal', 
//   minimumFractionDigits: 2, 
//   maximumFractionDigits: 2,
// }).format(totalSale);

//   return (
//     <div>
//       <div className='seller-upper-part'>
//       <div>{user && (<h2>Hello {user.email} !</h2>)}</div>
//       <div className='total-sales'>
//       <div>Total sales</div>
//       <div className='birr'><div><sup>ETB</sup></div><div><h1> {totalSale}</h1></div></div>
//       </div>
//       <div><p>Your Account</p></div>
//       </div>
//        <div className='seller-dashboard-boxs-outer'>
//        <div className='seller-dashboard-boxs'><Link to='/sold-product-information'>Sold product information</Link></div>
//        <div className='seller-dashboard-boxs'><Link to='/view-product-information'>View product information</Link></div>
//        </div>
//     </div>
//   )
// }




// import React, { useEffect, useState } from 'react';
// import HandleLogout from '../../Component/HandleLogout';
// import { Link } from 'react-router-dom';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import { userContext } from '../../Component/UserContext'; 
// import { useContext } from 'react';
// import '../../style/seller.css';

// export default function Seller() {
//   const { user } = useContext(userContext);
//   const navigate = useNavigate();
//   let totalSale = 0;
//   const [priceOfSoldProducts, setPriceOfSoldProducts] = useState([]);

//   useEffect(() => {
//     axios.get('/getBuyerBuysProduct')
//       .then((res) => {
//         setPriceOfSoldProducts(res.data);
//       })
//       .catch(err => console.log(err));

//     axios.get('/profile')
//       .then(res => {
//         if (res.data === 'null') {
//           navigate('/login');
//         }
//       })
//       .catch(err => console.log(err));
//   }, [navigate]);

//   if (priceOfSoldProducts) {
//     priceOfSoldProducts.map(Element => totalSale += Element.totalPrice);
//   }

//   totalSale = new Intl.NumberFormat('en-US', {
//     style: 'decimal',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(totalSale);

//   return (
//     <div className='seller-container'>
//       <div className='seller-upper-part'>
//         <div className='greeting-message'>
//           {user && (<h2>Hello {user.email}!</h2>)}
//         </div>
//         <div className='total-sales'>
//           <div className='total-sales-label'>Total Sales</div>
//           <div className='total-sales-amount'>
//             <div className='currency-symbol'><sup>ETB</sup></div>
//             <div className='amount'><h1>{totalSale}</h1></div>
//           </div>
//         </div>
//         <div className='account-info'>
//         </div>
//       </div>
//       <div className='seller-dashboard-boxs-outer'>
//         <div className='seller-dashboard-boxs'>
//           <Link to='/sold-product-information'>Sold Product</Link>
//         </div>
//         <div className='seller-dashboard-boxs'>
//           <Link to='/view-product-information'>View Product</Link>
//         </div>
//       </div>
//     </div>
    
//   );
// }


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { userContext } from '../../Component/UserContext';
import '../../style/seller.css';
import soldproduct from "../../image/soldproduct.jfif"
import viewproduct from "../../image/viewproduct.png"
import delivery from '../../image/delivery.jpg'
export default function Seller() {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [priceOfSoldProducts, setPriceOfSoldProducts] = useState([]);
  let totalSale = 0;

  useEffect(() => {
    axios.get('/getBuyerBuysProduct')
      .then(res => {
        setPriceOfSoldProducts(res.data);
      })
      .catch(err => console.log(err));

    axios.get('/profile')
      .then(res => {
        if (res.data === 'null') {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  if (priceOfSoldProducts.length > 0) {
    totalSale = priceOfSoldProducts.reduce((sum, product) => sum + product.totalPrice, 0);
  }

  totalSale = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalSale);

  return (
    <div className='seller-container'>
      <div className='seller-upper-part'>
        <div className='greeting-message'>
          {user && <h2>Hello, {user.email}!</h2>}
        </div>
        <div className='total-sales'>
          <div className='total-sales-label'>Total Sales</div>
          <div className='total-sales-amount'>
            <div className='currency-symbol'><sup>ETB</sup></div>
            <div className='amount'><h1>{totalSale}</h1></div>
          </div>
        </div>
      </div>
      <div className='seller-dashboard'>
        <div className='dashboard-box'>
          <Link to='/sold-product-information' className='dashboard-link'>
          Sold Product Information
          <img src={soldproduct} alt='sold product'/>
          </Link>
        </div>
        <div className='dashboard-box'>
          <Link to='/view-product-information' className='dashboard-link'>
          View Product Information
          <img src={viewproduct} alt='view product' />
          </Link>
        </div>
        <div className="admin-dashboard-box">
          <Link to="/delivery-status" className="admin-link">
          Delivery Status
          <div><img src={delivery}/></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
