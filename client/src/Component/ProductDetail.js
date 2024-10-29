// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// export default function ProductDetail() {
//     const [data,setData]=useState('');
// useEffect(()=>{
//    axios.get('/')
//     .then(res=>setData(res.data))
//     .catch(error=>console.log(error))
  
// },[])
//     const {id}=useParams()
//   return (
//     <div>
//      {
//      data && data.map(element=>{
//       if(element._id===id){
//         return(
//             <div>
//                 <div><img src={require(`../images/${element.photo}`)}/></div>
//                 <div>
//                 <table>
//                     <tr><td>Name</td><td>{element.name}</td></tr>
//                     <tr><td>Brand</td><td>{element.brand}</td></tr>
//                     <tr><td>Size</td><td>{element.size}</td></tr>
//                     <tr><td>Color</td><td>{element.color}</td></tr>
//                     <tr><td>Quantity</td><td>{element.quantity}</td></tr>
//                 </table>
//                 </div>
//             </div>
//         )
//       }
//      })
//      }
//     </div>
//   )
// }

// import '../style/ProductDetail.css'
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
//  // Import the CSS file

// export default function ProductDetail() {
//     const [data, setData] = useState('');
//     const { id } = useParams();

//     useEffect(() => {
//         axios.get('/')
//             .then(res => setData(res.data))
//             .catch(error => console.log(error));
//     }, []);

//     return (
//         <div className="product-container">
//             {data && data.map(element => {
//                 if (element._id === id) {
//                     return (
//                         <div key={element._id}>
//                           <ol>
//                             <li>
//                             <div>
//                                 <img src={require(`../images/${element.photo}`)} alt={element.name} />
//                             </div>
//                             </li>
//                             <li>
//                             <div className="product-details">
//                                 <table>
//                                     <tbody>
//                                         <tr>
//                                             <td>Name</td>
//                                             <td>{element.name}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Brand</td>
//                                             <td>{element.brand}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Size</td>
//                                             <td>{element.size}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Color</td>
//                                             <td>{element.color}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Description</td>
//                                             <td>{element.description}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Quantity</td>
//                                             <td>{element.quantity}</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>
//                             </li>
//                             </ol>
//                         </div>
//                     );
//                 }
//                 return null;
//             })}
//         </div>
//     );
// }





import '../style/ProductDetail.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetail() {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get('/') // Adjust the endpoint to your API
            .then(res => setData(res.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
        <div className="product-container">
            {data && data.map(element => {
                if (element._id ===id) {
                    return (
                        <div key={element._id} className="product-detail-content">
                            <div className="product-image">
                                <img src={require(`../images/${element.photo}`)} alt={element.name} />
                            </div>
                            <div className="product-details">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="label">Name</td>
                                            <td className="value">{element.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Brand</td>
                                            <td className="value">{element.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Size</td>
                                            <td className="value">{element.size}</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Price</td>
                                            <td className="value">
                                                    {
                                                        new Intl.NumberFormat('en-US', {
                                                      style: 'decimal', 
                                                      minimumFractionDigits: 2, 
                                                      maximumFractionDigits: 2,
                                                    }).format(element.price)
                                                        } ETB
                                        </td>
                                        </tr>
                                        <tr>
                                            <td className="label">Color</td>
                                            <td className="value">{element.color}</td>
                                        </tr>
                                        <tr>
  <td className="label">Manufactured Date</td>
  <td className="value">
    {new Date(element.manufacturedDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })}
  </td>
</tr>
                                        <tr>
                                            <td className="label">Description</td>
                                            <td className="value">{element.description}</td>
                                        </tr>
                                        {/* <tr>
                                            <td className="label">Quantity</td>
                                            <td className="value">{element.quantity}</td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
        <div className='btn1'> To proceed purchase <Link to ="/login" className='cartbtn'>Login</Link></div> 
        </div>
    );
}
