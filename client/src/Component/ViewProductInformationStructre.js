import React from 'react'
import '../style/ViewProductInformationStructre.css'
export default function ViewProductInformationStructre(props) {
  return (
    <div className='view-product-info-structure-whole-div'>
        <table>
     <tr><td><div className='view-product-info-img-div'><img src={require(`../../src/images/${props.Element.photo}`)} className='view-product-info-img'/></div></td></tr> 
      <tr><td>Category</td> <td>{props.Element.category}</td></tr>
      <tr><td>Name</td> <td>{props.Element.name}</td></tr>
      <tr><td>Brand</td> <td>{props.Element.brand}</td></tr>
      <tr><td>Description </td><td>{props.Element.description}</td></tr>
      <tr><td>Color </td><td>{props.Element.color}</td></tr>
      <tr><td>Size</td><td> {props.Element.size}</td></tr>
      <tr><td>Price </td><td>{props.Element.price}</td></tr>
      <tr><td>Product status </td><td>{props.Element.status}</td></tr>
      <tr><td>Product adder </td><td>{props.Element.owner}</td></tr>
      </table>
      <hr/>
    </div>
  )
}
