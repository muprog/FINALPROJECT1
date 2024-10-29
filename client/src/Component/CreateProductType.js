import React, { useState } from 'react';
import toast from 'react-hot-toast';
import '../style/CreateProductType.css'
import axios from 'axios';
export default function CreateProductType() {
  const [category, setCategory] = useState({ category: '', numberOfCategory: '' });
  const [type,setType]=useState([]);
  const [number, setNumber] = useState(0);
  const [categoryType,setCategoryType]=useState({});

  const handleCategoryType=(e)=>{
// console.log(e.target.value);
const {name}=e.target;
setCategoryType(prevCategoryType=>{
    return{
        ...prevCategoryType,
        [name]:e.target.value
    }
})
  }
  const handleType = (number) => {
    const divs = [];
    for (let i = 1; i <= number; i++) {
      divs.push(
        <div key={i} className="type-input">
          <div><input type='text' placeholder={`Type ${i}`} className="input-field" name={`input${i}`} onChange={handleCategoryType} /></div>
        </div>
      );
    }
    return <div className="type-list">{divs}</div>;
  };

  function handleClick(e) {
    e.preventDefault();
    if (category.category === '') {
      toast.error("Category is required");
    }
    if (category.numberOfCategory <= 0 || category.numberOfCategory === "") {
      toast.error("Types of category must be greater than 0");
    } else if(category.category !== '' && category.numberOfCategory>0) {
      setNumber(category.numberOfCategory);
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCategory(prevCategory => {
      return {
        ...prevCategory,
        [name]: value
      };
    });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
const a=Object.values(categoryType)
let b=true;
a.map(e=>{
    if(e===''){
        b=false
    }
    })
     if(b){
        axios.post('/categoryAndType',{category,a})
             .then(res=>{
                if(res.data.success){
                    toast.success(res.data.success)
                }
                if(res.data.error){
                    toast.success(res.data.error)
                }
            })
             .catch(error=>console.log(error))
             setCategory({ category: '', numberOfCategory: '' })
             setNumber(0);
     }
  }


  return (
    <div className="create-product-type">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div><label>Category</label></div>
          <input type='text' placeholder='Category' name='category' value={category.category} onChange={handleInput} className="input-field" />
        </div>
        <div className="form-group">
          <div><label>Number of types</label></div>
          <input type='Number' placeholder='Number of category' name='numberOfCategory' value={category.numberOfCategory} onChange={handleInput} className="input-field" />
        </div>
        <div><button onClick={handleClick} className="submit-btn">Click</button></div>
    
      {handleType(number)}
      {number>0?<button type='submit' className='submit-btn'>submit</button>:''}
      </form>
    </div>
  );
}
