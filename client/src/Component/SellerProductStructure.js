import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../style/SellerProductStructure.css"
import { useNavigate } from 'react-router-dom';
export default function SellerProductStructure(props) {
  const navigate=useNavigate();
  function handleUpdate(){
    navigate(`/update/${props.id}`);
  }
  const handleDelete=(id)=>{
    const result=window.confirm("Do you want to delete.");
    if(result){
      axios.delete('/deleteProducts/'+id)
      .then(res=>{
        console.log(res)
        window.location.reload()
      })
      .catch(err=>console.log(err))  
  }}
  
  const handleStatus=(e)=>{
    axios.post('/update-product-status',{status:props.status,id:props.id})
 }
 


  return (
        <tr>
            <td><img src={require(`../images/${props.photo}`)} width={200}/></td>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.brand}</td>
            <td> 
              ETB {new Intl.NumberFormat('en-US', {
  style: 'decimal', 
  minimumFractionDigits: 2, 
  maximumFractionDigits: 2,
}).format(props.price)}
</td>
            <td>{props.category}</td>
            <td>{props.quantity}</td>
            <td>{props.description}</td>
            <td> <button onClick={handleUpdate} className='update'>update</button><div><button className='update' onClick={handleStatus} value={props.status}>{props.status}</button></div><button onClick={()=>handleDelete(props.id)} className='btn btn-danger d-flex align-items-center custom-delete-button'><i className="fas fa-trash-alt mr-2"></i> Delete</button></td>
            {/* <td> <Link to={`/update/${props.id}`}><button onClick={handleUpdate}>update</button></Link><button>delete</button></td> */}
        </tr>
    
  
  )
}
