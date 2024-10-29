import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../style/deliveryStatus.css'
export default function DeliveryStatus() {
    const [soldDataInformation, setSoldDataInformation] = useState([]);

  
    
    const handleStatus=(e)=>{
        const {id,value}=e.target;
        axios.post('/update-delivery-status',{status:value,id:id})
            //  .then(res=>console.log(res.data))
            //  .catch(err=>console.log(err))
     }

     useEffect(() => {
        axios.get('/getBuyerBuysProduct')
            .then((res) => {
                setSoldDataInformation(res.data);
            })
            .catch((err) => console.log(err));
    }, []);


    useEffect(() => {
        axios.get('/getBuyerBuysProduct')
            .then((res) => {
                setSoldDataInformation(res.data);
            })
            .catch((err) => console.log(err));
    }, [soldDataInformation]);

 return (
        <div className="sold-product-container">
            <table>
                <thead>
                    <tr>
                        <th>Buyer</th>
                        <th className='sold-product'>Sold Products</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {!soldDataInformation?"":soldDataInformation.map(element => (
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
                            <td data-label="Status"><button id={element._id} value={element.status} onClick={(e)=>handleStatus(e)} className='pay'>{element.status}</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
