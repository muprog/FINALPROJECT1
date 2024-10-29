import '../style/viewProductInformation.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewProductInformationStructre from './ViewProductInformationStructre';
export default function ViewProductInformation() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({ search: '' });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSearch({ [name]: value });
  };
  useEffect(() => {
    axios.get('/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const pattern = new RegExp(search.search, 'gi');

  return (
    <div className='view-product-container'>
      <input 
        className='search-input1' 
        placeholder='Search for products' 
        name='search' 
        onChange={handleInput} 
      />
      {data.length > 0 && (
        <div className='product-count'>
          Total number of products: {data.length}
        </div>
      )}
      {data.map(Element => {
        if (pattern.test(Element.name)||pattern.test(Element.size)||pattern.test(Element.description)||pattern.test(Element.color)||pattern.test(Element.brand)||pattern.test(Element.category)) {
          return <ViewProductInformationStructre key={Element._id} Element={Element} />;
        }
        return null;
      })}
    </div>
  );
}