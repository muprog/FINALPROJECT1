import React from 'react'
import {Link} from 'react-router-dom'

export default function ProductStructure(props) {
    return(
      <Link to={`/product-detail/${props.id}`}>
        <div className='product-whole-div'>
          <div className='product-img-div'><div><img src={require(`../../src/images/${props.photo}`)} className='product-img'/></div></div>
             <div>
            <tr><td><strong>Name</strong></td><td className='td1'>{props.name}</td></tr>
            <tr><td><strong>Brand</strong></td><td className='td1'>{props.brand}</td></tr>
            <tr><td><strong>Price</strong></td><td className='td1'>{new Intl.NumberFormat('en-US', {
  style: 'decimal', 
  minimumFractionDigits: 2, 
  maximumFractionDigits: 2,
}).format(props.price)}</td></tr>
             </div>
        </div>
        </Link>
      )
}
