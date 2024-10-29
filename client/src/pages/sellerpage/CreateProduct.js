// import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios';
// import toast from "react-hot-toast";
// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { userContext } from '../../Component/UserContext';
// const CreateProduct = () => {

//   const {user}=useContext(userContext);

//   const navigate=useNavigate();
//   const input1=useRef()
//   const input2=useRef()
//   const input3=useRef()
//   const input4=useRef()
//   const input5=useRef()
//   const input6=useRef()
//   const input7=useRef()
//   const input8=useRef()
//   const input9=useRef()
// const [data,setData]=useState({
//   name:'',
//   photo:'',
//   category:'',
//   description:'',
//   price:'',
//   size:'',
//   color:'',
//   brand:'',
//   quantity:'',
//   owner:`${user.email}`,
//   status:'on'
// })
//   const handleSubmit=async(e)=>{
// e.preventDefault();
// const {name,photo,category, description, price,size, color,brand,quantity,owner,status}=data;
// if(!photo){
//   toast.error("all the inputs are required")
//   return
// }
// const formData=new FormData();
// formData.append("name",name);
// formData.append("photo",photo);
// formData.append("category",category);
// formData.append("description",description);
// formData.append("price",price);
// formData.append("size",size);
// formData.append("color",color);
// formData.append("brand",brand);
// formData.append("quantity",quantity);
// formData.append("owner",owner);
// formData.append("status",status);
// try {
// const {data} = await axios.post('/createproduct',formData,{
// headers:{"Content-Type":"multipart/form-data"}
//   })
//   if(data.error){
//     toast.error(data.error);
//   }else{
//     toast.success("Success")
//     setData({})
//     input1.current.value=""
//     input2.current.value=""
//     input3.current.value=""
//     input4.current.value=""
//     input5.current.value=""
//     input6.current.value=""
//     input7.current.value=""
//     input8.current.value=""
//     input9.current.value=""
//   }
// } catch (error) {
//   console.log(error)
// }
//   }
//   function handleInput(e){
// const {name,value}=e.target;
// setData(prevData=>{
//   return{
//     ...prevData,
//     [name]:value
//   }
// })
//   }

//   const handlePhoto=(e)=>{
//     setData(prevData=>{
//       return{
//         ...prevData,
//         photo:e.target.files[0]
//       }
//     })
//   }

//   const cancel=()=>{
// navigate('/adder')
//   }


// useEffect(()=>{
//   axios.get('/profile')
//   .then(res=>{
//    // console.log(res.data)
//  if(res.data==='null'){
//    navigate('/login')
//  }
//  })
//   .catch(err=>console.log(err));
// },[])
//   return (
//     <div className='whole-login'>
//     <form onSubmit={handleSubmit} className='register-form'>
      
//       <div className='login'>
//       <h2>Create Product</h2>
//         <div>
       
//         <label className='form-label'>Product Name</label>
//     <input type='text' placeholder='Enter product name here...' name='name' value={data.name} onChange={handleInput} className='form-input' ref={input1}/>
//         </div>
//         {/* <div>
//         <label className='form-label'> Product image</label>
//     <input type='file'  name='photo'  onChange={handlePhoto} className='form-input' ref={input2}/>
//         </div> */}
//          <div className='form-row'>  
//  <div>
//  <span className='form-label'>Category
//  <select name='category' value={data.category} onChange={handleInput} ref={input3}>
//     <option></option>
//     <option value="Laptop">Laptop</option>
//     <option value="Phone">Phone</option>
//    </select></span>
//  </div>
// <div>
// <label className='form-label'>description</label>
// <textarea type='text' placeholder='description of product...' name='description' value={data.description} onChange={handleInput} className='form-input' ref={input4}/>
// </div>
//    </div>
//    <div className='form-row'>  
//    <div>
//    <label className='form-label'>Price</label>
//   <input type='number' name='price' value={data.price} onChange={handleInput} className='form-input' ref={input5}/>
//    </div>

//    <div>
//    <label className='form-label'>Size</label>
//   <input type='text' name='size' value={data.size} onChange={handleInput} className='form-input' ref={input6}/>
//    </div>
// </div>
// <div className='form-row'>  
//    <div>
//    <label className='form-label'>Color</label>
//   <input type='text' name='color' value={data.color} onChange={handleInput} className='form-input' ref={input7}/>
//    </div>
// <div>
//    <label className='form-label'>Brand</label>
// <input type='text' placeholder='Brand of product...' name='brand' value={data.brand} onChange={handleInput} className='form-input' ref={input8}/>
// </div>
// </div>
// <div className='form-row'>  
// <div>
//    <label className='form-label'>Quantity</label>
// <input type='number' placeholder='quantity' name='quantity' value={data.quantity} onChange={handleInput} className='form-input' ref={input9}/>
// </div>
//    {/* <div>
//    <label className='form-label'>Owner</label>
//   <input type='email' name='owner' value={data.owner} onChange={handleInput} className='form-input' ref={input9}/>
//    </div> */}
//    <div>
//         <label className='form-label'> Product image</label>
//     <input type='file'  name='photo'  onChange={handlePhoto} className='form-input' ref={input2}/>
//         </div>
//         </div>
//    <div><button type='submit' className='loginbtn'>submit</button></div><br />
//    <div> 
//     <button className='loginbtn' onClick={cancel}>Cancel</button>
//    </div>
//    </div>
//  </form>
//  </div>
//   )
// }

// export default CreateProduct;


import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../Component/UserContext';
import '../../style/CreateProduct.css'

const CreateProduct = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [category,setCategory]=useState()
  const [type,setType]=useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableTypes, setAvailableTypes] = useState([]);
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();
  const input6 = useRef();
  const input7 = useRef();
  const input8 = useRef();
  const input9 = useRef();

  const [data, setData] = useState({
    name: '',
    photo: '',
    category: selectedCategory,
    description: '',
    price: '',
    size: '',
    color: '',
    brand: '',
    quantity: '',
    owner: `${user.email}`,
    status: 'on',
    manufacturedDate:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, photo, description, price, size, color, brand,manufacturedDate, quantity, owner, status } = data;

    if (!photo) {
      toast.error("All inputs are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("brand", brand);
    formData.append("manufacturedDate", manufacturedDate);
    formData.append("quantity", quantity);
    formData.append("owner", owner);
    formData.append("status", status);

    try {
      const { data } = await axios.post('/createproduct', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Product created successfully");
        setData({
          name: '',
          photo: '',
          category: selectedCategory,
          description: '',
          price: '',
          size: '',
          color: '',
          brand: '',
          quantity: '',
          owner: `${user.email}`,
          manufacturedDate:"",
          status: 'on'
        });
        setSelectedCategory();
        setType()
        input1.current.value = "";
        input2.current.value = "";
        input3.current.value = "";
        input4.current.value = "";
        input5.current.value = "";
        input6.current.value = "";
        input7.current.value = "";
        input8.current.value = "";
        input9.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleInput(e) {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handlePhoto = (e) => {
    setData(prevData => ({
      ...prevData,
      photo: e.target.files[0]
    }));
  };

  const cancel = () => {
    navigate('/adder');
  };
const [categoriesData,setCategoriesData]=useState([])
  useEffect(() => {
    axios.get('/profile')
      .then(res => {
        if (res.data === 'null') {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
      axios.get('/categoryAndType')
           .then(res=>setCategoriesData(res.data))
           .catch(error=>console.log(error));
  }, []);
 

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setSelectedCategory(selectedCat);
     setCategory(e.target.value);
    // Find the types based on the selected category
    const categoryObj = categoriesData.find(
      (cat) => cat.category === selectedCat
    );
    if (categoryObj) {
      setAvailableTypes(categoryObj.types);
    } else {
      setAvailableTypes([]);
    }
  };
  const handleType=(e)=>{
setType(e.target.value);
  }


  return (
    <div className='product-form-container'>
      <form onSubmit={handleSubmit} className='product-form'>
        <div className='product-form-header'>
          Create Product
        </div>

        <div>
          <label className='product-form-label'>Product Name</label>
          <input
            type='text'
            placeholder='Enter product name here...'
            name='name'
            value={data.name}
            onChange={handleInput}
            className='product-form-input'
            ref={input1}
          />
        </div>

        <div className='product-form-row'>
          <div>
            {/* <span className='product-form-label'>Category</span> */}
            {/* <select
              name='category'
              value={data.category}
              onChange={handleInput}
              className='product-form-select'
              ref={input3}
            >
              <option></option>
              <option value="Laptop">Laptop</option>
              <option value="Phone">Phone</option>
              <option value="Desktop">Desktop</option>
              <option value="TV">TV</option>
            </select> */}
            <div><label>Select Category: </label></div>
            <div>
      <select value={selectedCategory} onChange={handleCategoryChange} className='product-form-select' name='category'>
        <option value="">Category</option>
        {categoriesData.map((category) => (
          <option key={category._id} value={category.category}>
            {category.category}
          </option>
        ))}
      </select>
           </div>
      {/* Dropdown for types */}
      {selectedCategory && (
        <>
         <div><label>Select Type: </label></div>
         <div>
          <select className='product-form-select' name='type' value={type} onChange={handleType}>
            <option value="">Type</option>
            {availableTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          </div>
        </>
      )}
          </div>

          <div>
            <label className='product-form-label'>Description</label>
            <textarea
              type='text'
              placeholder='Description of product...'
              name='description'
              value={data.description}
              onChange={handleInput}
              className='product-form-textarea'
              ref={input4}
            />
          </div>
        </div>

        <div className='product-form-row'>
          <div>
            <label className='product-form-label'>Price</label>
            <input
              type='number'
              name='price'
              value={data.price}
              onChange={handleInput}
              className='product-form-input'
              ref={input5}
            />
          </div>

          <div>
            <label className='product-form-label'>Size</label>
            <input
              type='text'
              name='size'
              value={data.size}
              onChange={handleInput}
              className='product-form-input'
              ref={input6}
            />
          </div>
        </div>

        <div className='product-form-row'>
          <div>
            <label className='product-form-label'>Color</label>
            <input
              type='text'
              name='color'
              value={data.color}
              onChange={handleInput}
              className='product-form-input'
              ref={input7}
            />
          </div>

          <div>
            <label className='product-form-label'>Brand</label>
            <input
              type='text'
              placeholder='Brand of product...'
              name='brand'
              value={data.brand}
              onChange={handleInput}
              className='product-form-input'
              ref={input8}
            />
          </div>

          {/* <div>
            <label className='product-form-label'>Manufactured Date</label>
            <input
              type='date'
              placeholder='Manufactured date of product...'
              name='manufacturedDate'
              value={data.manufacturedDate}
              onChange={handleInput}
              className='product-form-input'
              // ref={input8}
            />
          </div> */}

<div>
  <label className='product-form-label'>Manufactured Date</label>
  <input
    type='date'
    placeholder='Manufactured date of product...'
    name='manufacturedDate'
    value={data.manufacturedDate}
    onChange={handleInput}
    className='product-form-input'
    max={new Date().toISOString().split("T")[0]} // Restricts to current date
    // ref={input8}
  />
</div>
        </div>

        <div className='product-form-row'>
          <div>
            <label className='product-form-label'>Quantity</label>
            <input
              type='number'
              placeholder='Quantity'
              name='quantity'
              value={data.quantity}
              onChange={handleInput}
              className='product-form-input'
              ref={input9}
            />
          </div>

          <div>
            <label className='product-form-label'>Product Image</label>
            <input
              type='file'
              name='photo'
              onChange={handlePhoto}
              className='product-form-file-input'
              ref={input2}
            />
          </div>
        </div>

        <div>
          <button type='submit' className='product-form-btn'>Submit</button>
        </div><br />

        <div>
          <button type='button' className='product-form-btn-cancel' onClick={cancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
