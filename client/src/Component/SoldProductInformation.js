// import React, { useEffect, useState } from 'react'
// import { useContext } from 'react'
// import { userContext } from './UserContext'
// import '../style/soldProductInformation.css'
// import axios from 'axios'
// export default function SoldProductInformation() {
//     const [soldDataInformation,setSoldDataInformation]=useState([])
// useEffect(()=>{
//     axios.get('/getBuyerBuysProduct')
//     .then((res)=>{
//      setSoldDataInformation(res.data);
//      })
// },[])
//   return (
//     <div>
//         <table>
//         <tr>
// <td>Buyer</td><td>Sold products id</td><td>Address</td><td>Phone number</td><td>Total price</td>
//         </tr>
// {soldDataInformation.map(Element=>{
//     return  <tr><td>{Element.buyer}</td>
//     <td><table>
//         <tr><td>product</td><td>quantity</td></tr>
//         {Element.buys.map(Element=><tr><td>{Element.product}</td><td>{Element.quantity}</td></tr>)}
//         </table></td>
//         <td>{Element.address}</td><td>{Element.phone}</td>
//         <td>{Element.totalPrice}</td></tr>
          
// })}
// </table>
//     </div>
//   )
// }




// import React, { useEffect, useState } from 'react';
// import '../style/soldProductInformation.css';
// import axios from 'axios';

// export default function SoldProductInformation() {
//     const [soldDataInformation, setSoldDataInformation] = useState([]);

//     useEffect(() => {
//         axios.get('/getBuyerBuysProduct')
//             .then((res) => {
//                 setSoldDataInformation(res.data);
//             })
//             .catch((err) => console.log(err));
//     }, []);

//     return (
//         <div className="sold-product-container">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Buyer</th>
//                         <th className='sold-product'>Sold Products</th>
//                         <th>Address</th>
//                         <th>Phone Number</th>
//                         <th>Total Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {soldDataInformation.map(element => (
//                         <tr key={element._id}>
//                             <td data-label="Buyer">{element.buyer}</td>
//                             <td data-label="Sold Products ID" className='sold-product'>
//                                 <table>
//                                     <thead>
//                                         <tr>
//                                             <th className='product'>Product ID</th>
//                                             <th className='quantity'>Qty</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {element.buys.map(buy => (
//                                             <tr key={buy.product}>
//                                                 <td data-label="Product" className='product'>{buy.product}</td>
//                                                 <td data-label="Quantity" className='quantity'>{buy.quantity}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </td>
//                             <td data-label="Address">{element.address}</td>
//                             <td data-label="Phone Number">{element.phone}</td>
//                             <td data-label="Total Price">{element.totalPrice}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import '../style/soldProductInformation.css';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import the xlsx library

export default function SoldProductInformation() {
    const [soldDataInformation, setSoldDataInformation] = useState([]);

    useEffect(() => {
        axios.get('/getBuyerBuysProduct')
            .then((res) => {
                setSoldDataInformation(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // Function to download data as an Excel file
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(soldDataInformation.map(element => {
            return {
                Buyer: element.buyer,
                Address: element.address,
                Phone: element.phone,
                'Total Price': element.totalPrice,
                'Sold Products': element.buys.map(buy => `Product: ${buy.product} (Qty: ${buy.quantity})`).join(', ')
            };
        }));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sold Products");

        // Download the Excel file
        XLSX.writeFile(workbook, "SoldProductInformation.xlsx");
    };

    return (
        <div className="sold-product-container">
            <button onClick={downloadExcel} className="download-btn">Download as Excel</button>
            <table>
                <thead>
                    <tr>
                        <th>Buyer</th>
                        <th className='sold-product'>Sold Products</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {soldDataInformation.map(element => (
                        <tr key={element._id}>
                            <td data-label="Buyer">{element.buyer}</td>
                            <td data-label="Sold Products ID" className='sold-product'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className='product'>Product ID</th>
                                            <th className='quantity'>Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {element.buys.map(buy => (
                                            <tr key={buy.product}>
                                                <td data-label="Product" className='product'>{buy.product}</td>
                                                <td data-label="Quantity" className='quantity'>{buy.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                            <td data-label="Address">{element.address}</td>
                            <td data-label="Phone Number">{element.phone}</td>
                            <td data-label="Total Price">{element.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
