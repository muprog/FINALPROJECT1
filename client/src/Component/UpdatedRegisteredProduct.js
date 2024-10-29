// import React, { useContext, useRef, useState } from 'react'
// import axios from 'axios';
// import toast from "react-hot-toast";
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { userContext } from './UserContext';
// import '../style/CreateProduct.css'
// const UpdateRegisteredProduct = () => {
//   const {user}=useContext(userContext)
//     const {id}=useParams();
//     const [category,setCategory]=useState()
//     const [type,setType]=useState();
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const [availableTypes, setAvailableTypes] = useState([]);
//     const input1=useRef()
//     const input2=useRef()
//     const input3=useRef()
//     const input4=useRef()
//     const input5=useRef()
//     const input6=useRef()
//     const input7=useRef()
//     const input8=useRef()
//     const input9=useRef()
//     const [data,setData]=useState({
//       name: '',
//     photo: '',
//     category: selectedCategory,
//     description: '',
//     price: '',
//     size: '',
//     color: '',
//     brand: '',
//     quantity: '',
//     owner: `${user.email}`,
//     manufacturedDate:''
//     }) 
//     const navigate=useNavigate();

    

//     useEffect(()=>{
// axios.get('/update/'+id)
//      .then(res=>{
//       console.log(res)
//       setData(prevData=>{
//         return{
//           ...prevData,
//        name:res.data.name,
//       // photo:res.data.name,
//       category:res.data.category,
//       description:res.data.description,
//       price:res.data.price,
//       size:res.data.size,
//       color:res.data.color,
//       brand:res.data.brand,
//       quantity:res.data.quantity,
//       manufacturedDate:res.data.manufacturedDate,
//       owner:res.data.owner
//         }
//       })
//       setSelectedCategory(res.data.category)
//       setCategory(res.data.category)

     
//     })
//      .catch(err=>console.log(err))
//     },[]);


//  const handleSubmit=async(e)=>{
//   e.preventDefault();
//   const { name, photo, description, price, size, color, brand,manufacturedDate, quantity, owner}=data;
//   if(!photo){
//     toast.error("all the inputs are required")
//     return
//   }
//   // const formData=new FormData();
//   // formData.append("name",name);
//   // formData.append("photo",photo);
//   // formData.append("category",category);
//   // formData.append("description",description);
//   // formData.append("price",price);
//   // formData.append("size",size);
//   // formData.append("color",color);
//   // formData.append("brand",brand);
//   // formData.append("quantity",quantity);
//   // formData.append("owner",owner);
//   const formData = new FormData();
//   formData.append("name", name);
//   formData.append("photo", photo);
//   formData.append("category", category);
//   formData.append("type", type);
//   formData.append("description", description);
//   formData.append("price", price);
//   formData.append("size", size);
//   formData.append("color", color);
//   formData.append("brand", brand);
//   formData.append("manufacturedDate", manufacturedDate);
//   formData.append("quantity", quantity);
//   formData.append("owner", owner);


//   try {
//   const {data} = await axios.put('/update1/'+id,formData,{
//   headers:{"Content-Type":"multipart/form-data"}
//     })
//     if(data.error){
//       toast.error(data.error);
//     }else{
//       toast.success("Success")
//       setData({
//         name: '',
//         photo: '',
//         category: selectedCategory,
//         description: '',
//         price: '',
//         size: '',
//         color: '',
//         brand: '',
//         quantity: '',
//         owner: `${user.email}`,
//         manufacturedDate:""
//       })
//       setSelectedCategory();
//         setType()
//       input1.current.value=""
//       input2.current.value=""
//       input3.current.value=""
//       input4.current.value=""
//       input5.current.value=""
//       input6.current.value=""
//       input7.current.value=""
//       input8.current.value=""
//       input9.current.value=""
//     }
//   } catch (error) {
//     console.log(error)
//   }
  
//  }

//  const handleInput=(e)=>{

//   const {name,value}=e.target;
//   setData(prevData=>{
//     return{
//       ...prevData,
//       [name]:value
//     }
//   })
//  }
//  const handlePhoto=(e)=>{
//   setData(prevData=>{
//     return{
//       ...prevData,
//       photo:e.target.files[0]
//     }
//   })

//  }
//  const cancel=()=>{
//   navigate('/seller-products')
//  }
//  const [categoriesData,setCategoriesData]=useState([])
//  useEffect(() => {
//   axios.get('/profile')
//     .then(res => {
//       if (res.data === 'null') {
//         navigate('/login');
//       }
//     })
//     .catch(err => console.log(err));
//     axios.get('/categoryAndType')
//          .then(res=>setCategoriesData(res.data))
//          .catch(error=>console.log(error));
// }, []);




// const handleCategoryChange = (e) => {
//   const selectedCat = e.target.value;
//   setSelectedCategory(selectedCat);
//    setCategory(e.target.value);
//   // Find the types based on the selected category
//   const categoryObj = categoriesData.find(
//     (cat) => cat.category === selectedCat
//   );
//   if (categoryObj) {
//     setAvailableTypes(categoryObj.types);
//   } else {
//     setAvailableTypes([]);
//   }
// };
// const handleType=(e)=>{
// setType(e.target.value);
// }
// console.log(data.category)


//   return (
//     <div className='product-form-container'>
//     <form onSubmit={handleSubmit} className='product-form'>
      
//       <div className='product-form-header'>
//       <h2>Update Product</h2>
//         <div>
       
//         <label className='product-form-label'>Product Name</label>
//     <input type='text' placeholder='Enter product name here...' name='name' value={data.name} onChange={handleInput} className='product-form-input'ref={input1}/>
//         </div>
//         {/* <div>
//         <label className='form-label'> Product image</label>
//     <input type='file'  name='photo'  onChange={handlePhoto}  className='form-input'ref={input2}/>
//         </div> */}
//         <div className='product-form-row'>
//  <div>
//  {/* <span className='product-form-label'>Category
//  <select name='category' value={data.category} onChange={handleInput} className='product-form-select' ref={input3}>
//     <option></option>
//     <option value="Laptop">Laptop</option>
//     <option value="Phone">Phone</option>
//     <option value="Desktop">Desktop</option>
//     <option value="TV">TV</option>
//    </select></span> */}
//    <div><label>Select Category: </label></div>
//             <div>
//       <select value={selectedCategory} onChange={handleCategoryChange} className='product-form-select' name='category'>
//         <option value="">Category</option>
//         {categoriesData.map((category) => (
//           <option key={category._id} value={category.category}>
//             {category.category}
//           </option>
//         ))}
//       </select>
//            </div>
//            {selectedCategory &&(
//         <>
//          <div><label>Select Type: </label></div>
//          <div>
//           <select className='product-form-select' name='type' value={type} onChange={handleType}>
//             <option value="">Type</option>
//             {availableTypes.map((type, index) => (
//               <option key={index} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//           </div>
//         </>
//       )}
//  </div>
// <div>
// <label className='product-form-label'>Description</label>
// <textarea type='text' placeholder='description of product...' name='description' value={data.description} onChange={handleInput} className='product-form-textarea' ref={input4}/>
// </div>
//    </div>
//    <div className='product-form-row'>
//    <div>
//    <label className='product-form-label'>Price</label>
//   <input type='number' name='price' value={data.price} onChange={handleInput} className='product-form-input'ref={input5}/>
//    </div>

//    <div>
//    <label className='product-form-label'>Size</label>
//   <input type='text' name='size' value={data.size} onChange={handleInput} className='product-form-input'ref={input6}/>
//    </div>
// </div>
// <div className='product-form-row'>
//    <div>
//    <label className='product-form-label'>Color</label>
//   <input type='text' name='color' value={data.color} onChange={handleInput} className='product-form-input'ref={input7}/>
//    </div>
// <div>
//    <label className='product-form-label'>Brand</label>
// <input type='text' placeholder='Brand of product...' name='brand' value={data.brand} onChange={handleInput} className='product-form-input'ref={input8}/>
// </div>
// <div>
//             <label className='product-form-label'>Manufactured Date</label>
//             <input
//               type='date'
//               placeholder='Manufactured date of product...'
//               name='manufacturedDate'
//               value={data.manufacturedDate}
//               onChange={handleInput}
//               className='product-form-input'
//               // ref={input8}
//             />
// </div>
// </div>
// <div className='product-form-row'>
// <div>
//    <label className='product-form-label'>Quantity</label>
// <input type='number' placeholder='quantity..' name='quantity' value={data.quantity} onChange={handleInput} className='product-form-input'ref={input9}/>
// </div>

//    {/* <div>
//    <label className='form-label'>Owner</label>
//   <input type='email' name='owner' value={data.owner} onChange={handleInput} className='form-input'ref={input9}/>
//    </div> */}
//    <div>
//         <label className='product-form-label'> Product image</label>
//     <input type='file'  name='photo'  onChange={handlePhoto}  className='product-form-input'ref={input2}/>
//         </div>
// </div>
//    {/* <select name='usertype' value={data.usertype} onChange={handleInput}>
//     <option></option>
//     <option value="seller">seller</option>
//     <option value="buyer">buyer</option>
//    </select> */}
//    <div><button type='submit' className='product-form-btn'>update</button></div><br />
//    <div> 
//     <button  className='product-form-btn-cancel' onClick={cancel}> Cancel</button>
//    </div>
//    </div>
//  </form>
//  </div>
//   )
// }

// export default UpdateRegisteredProduct;







// import React, { useContext, useRef, useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { userContext } from './UserContext';
// import '../style/CreateProduct.css';

// const UpdateRegisteredProduct = () => {
//   const { user } = useContext(userContext);
//   const { id } = useParams();
//   const [category, setCategory] = useState('');
//   const [type, setType] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [availableTypes, setAvailableTypes] = useState([]);
//   const inputRefs = useRef([]);
//   const [data, setData] = useState({
//     name: '',
//     photo: '',
//     category: '',
//     description: '',
//     price: '',
//     size: '',
//     color: '',
//     brand: '',
//     quantity: '',
//     owner: `${user.email}`,
//     manufacturedDate: '',
//   });
//   const navigate = useNavigate();
//   const [categoriesData, setCategoriesData] = useState([]);

//   useEffect(() => {
//     // Fetch product data
//     axios.get(`/update/${id}`)
//       .then(res => {
//         const productData = res.data;
//         setData({
//           name: productData.name,
//           photo: '', // Placeholder for photo URL
//           category: productData.category,
//           description: productData.description,
//           price: productData.price,
//           size: productData.size,
//           color: productData.color,
//           brand: productData.brand,
//           quantity: productData.quantity,
//           manufacturedDate: productData.manufacturedDate.slice(0, 10), // Convert date format
//           owner: productData.owner,
//         });
//         setSelectedCategory(productData.category);
//         setType(productData.type || ''); // Ensure type is set if available
//       })
//       .catch(err => console.log(err));

//     // Fetch categories and types
//     axios.get('/categoryAndType')
//       .then(res => {
//         setCategoriesData(res.data);
//         // Set available types based on fetched categories
//         const categoryObj = res.data.find(cat => cat.category === data.category);
//         if (categoryObj) {
//           setAvailableTypes(categoryObj.types);
//           setType(data.type || ''); // Set type if available
//         } else {
//           setAvailableTypes([]);
//         }
//       })
//       .catch(error => console.log(error));
//   }, [id, data.category]);

//   useEffect(() => {
//     // Update available types when selectedCategory changes
//     const categoryObj = categoriesData.find(cat => cat.category === selectedCategory);
//     if (categoryObj) {
//       setAvailableTypes(categoryObj.types);
//       setType(data.type || ''); // Set type if available
//     } else {
//       setAvailableTypes([]);
//     }
//   }, [selectedCategory, categoriesData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, photo, description, price, size, color, brand, manufacturedDate, quantity, owner } = data;
//     if (!photo) {
//       toast.error("All the inputs are required");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("photo", photo);
//     formData.append("category", category);
//     formData.append("type", type);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("size", size);
//     formData.append("color", color);
//     formData.append("brand", brand);
//     formData.append("manufacturedDate", manufacturedDate);
//     formData.append("quantity", quantity);
//     formData.append("owner", owner);

//     try {
//       const { data } = await axios.put(`/update1/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       if (data.error) {
//         toast.error(data.error);
//       } else {
//         toast.success("Success");
//         setData({
//           name: '',
//           photo: '',
//           category: selectedCategory,
//           description: '',
//           price: '',
//           size: '',
//           color: '',
//           brand: '',
//           quantity: '',
//           owner: `${user.email}`,
//           manufacturedDate: '',
//         });
//         setSelectedCategory('');
//         setType('');
//         inputRefs.current.forEach(input => {
//           if (input) input.value = '';
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handlePhoto = (e) => {
//     setData(prevData => ({
//       ...prevData,
//       photo: e.target.files[0]
//     }));
//   };

//   const cancel = () => {
//     navigate('/seller-products');
//   };

//   const handleCategoryChange = (e) => {
//     const selectedCat = e.target.value;
//     setSelectedCategory(selectedCat);
//     setCategory(selectedCat);
//   };

//   const handleType = (e) => {
//     setType(e.target.value);
//   };

//   return (
//     <div className='product-form-container'>
//       <form onSubmit={handleSubmit} className='product-form'>
//         <div className='product-form-header'>
//           <h2>Update Product</h2>
//           <div>
//             <label className='product-form-label'>Product Name</label>
//             <input
//               type='text'
//               placeholder='Enter product name here...'
//               name='name'
//               value={data.name}
//               onChange={handleInput}
//               className='product-form-input'
//               ref={el => (inputRefs.current[0] = el)}
//             />
//           </div>
//           <div className='product-form-row'>
//             <div>
//               <label>Select Category: </label>
//               <select
//                 value={selectedCategory}
//                 onChange={handleCategoryChange}
//                 className='product-form-select'
//                 name='category'
//               >
//                 <option value="">Category</option>
//                 {categoriesData.map(category => (
//                   <option key={category._id} value={category.category}>
//                     {category.category}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {selectedCategory && (
//               <>
//                 <div><label>Select Type: </label></div>
//                 <div>
//                   <select
//                     className='product-form-select'
//                     name='type'
//                     value={type}
//                     onChange={handleType}
//                   >
//                     <option value="">Type</option>
//                     {availableTypes.map((type, index) => (
//                       <option key={index} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </>
//             )}
//           </div>
//           <div>
//             <label className='product-form-label'>Description</label>
//             <textarea
//               type='text'
//               placeholder='Description of product...'
//               name='description'
//               value={data.description}
//               onChange={handleInput}
//               className='product-form-textarea'
//               ref={el => (inputRefs.current[1] = el)}
//             />
//           </div>
//         </div>
//         <div className='product-form-row'>
//           <div>
//             <label className='product-form-label'>Price</label>
//             <input
//               type='number'
//               name='price'
//               value={data.price}
//               onChange={handleInput}
//               className='product-form-input'
//               ref={el => (inputRefs.current[2] = el)}
//             />
//           </div>
//           <div>
//             <label className='product-form-label'>Size</label>
//             <input
//               type='text'
//               name='size'
//               value={data.size}
//               onChange={handleInput}
//               className='product-form-input'
//               ref={el => (inputRefs.current[3] = el)}
//             />
//           </div>
//         </div>
//         <div className='product-form-row'>
//           <div>
//             <label className='product-form-label'>Color</label>
//             <input
//               type='text'
//               name='color'
//               value={data.color}
//               onChange={handleInput}
//               className='product-form-input'
//               ref={el => (inputRefs.current[4] = el)}
//             />
//           </div>
//           <div>
//             <label className='product-form-label'>Brand</label>
//             <input
//               type='text'
//               placeholder='Brand of product...'
//               name='brand'
//               value={data.brand}
//               onChange={handleInput}
//               className='product-form-input'
//               ref={el => (inputRefs.current[5] = el)}
//             />
//           </div>
//           <div>
//             <label className='product-form-label'>Manufactured Date</label>
//             <input
//               type='date'
//               placeholder='Manufactured date of product...'
//               name='manufacturedDate'
//               value={data.manufacturedDate}
//               onChange={handleInput}
//               className='product-form-input'
//               ref={el => (inputRefs.current[6] = el)}
//             />
//           </div>
//           <div>
//             <label className='product-form-label'>Upload Image</label>
//             <input
//               type='file'
//               name='photo'
//               onChange={handlePhoto}
//               className='product-form-input'
//               ref={el => (inputRefs.current[7] = el)}
//             />
//           </div>
//         </div>
//         <div>
//           <button type='submit' className='product-form-btn'>Update</button>
//         </div>
//         <br />
//         <div>
//           <button className='product-form-btn-cancel' onClick={cancel}>Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateRegisteredProduct;




import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { userContext } from './UserContext';
import '../style/CreateProduct.css';

const UpdateRegisteredProduct = () => {
  const { user } = useContext(userContext);
  const { id } = useParams();
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableTypes, setAvailableTypes] = useState([]);
  const inputRefs = useRef([]);
  const [data, setData] = useState({
    name: '',
    photo: '',
    category: '',
    type: '',
    description: '',
    price: '',
    size: '',
    color: '',
    brand: '',
    quantity: '',
    owner: `${user.email}`,
    manufacturedDate: '',
  });
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    // Fetch product data
    axios.get(`/update/${id}`)
      .then(res => {
        const productData = res.data;
        setData({
          name: productData.name,
          photo: '', // Placeholder for photo URL
          category: productData.category,
          type: productData.type,
          description: productData.description,
          price: productData.price,
          size: productData.size,
          color: productData.color,
          brand: productData.brand,
          quantity: productData.quantity,
          manufacturedDate: productData.manufacturedDate.slice(0, 10), // Convert date format
          owner: productData.owner,
        });
        setSelectedCategory(productData.category);
        setType(productData.type || ''); // Ensure type is set if available
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    // Fetch categories and types
    axios.get('/categoryAndType')
      .then(res => {
        setCategoriesData(res.data);
        // Set available types based on fetched categories
        const categoryObj = res.data.find(cat => cat.category === data.category);
        if (categoryObj) {
          setAvailableTypes(categoryObj.types);
        } else {
          setAvailableTypes([]);
        }
      })
      .catch(error => console.log(error));
  }, [data.category]);

  useEffect(() => {
    // Update available types when selectedCategory changes
    const categoryObj = categoriesData.find(cat => cat.category === selectedCategory);
    if (categoryObj) {
      setAvailableTypes(categoryObj.types);
      setType(data.type || ''); // Set type if available
    } else {
      setAvailableTypes([]);
    }
  }, [selectedCategory, categoriesData, data.type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, photo, description, price, size, color, brand, manufacturedDate, quantity, owner } = data;
    if (!photo) {
      toast.error("All the inputs are required");
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

    try {
      const { data } = await axios.put(`/update1/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Success");
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
          manufacturedDate: '',
        });
        setSelectedCategory('');
        setType('');
        inputRefs.current.forEach(input => {
          if (input) input.value = '';
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhoto = (e) => {
    setData(prevData => ({
      ...prevData,
      photo: e.target.files[0]
    }));
  };

  const cancel = () => {
    navigate('/seller-products');
  };

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setSelectedCategory(selectedCat);
    setCategory(selectedCat);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  return (
    <div className='product-form-container'>
      <form onSubmit={handleSubmit} className='product-form'>
        <div className='product-form-header'>
          <h2>Update Product</h2>
          <div>
            <label className='product-form-label'>Product Name</label>
            <input
              type='text'
              placeholder='Enter product name here...'
              name='name'
              value={data.name}
              onChange={handleInput}
              className='product-form-input'
              ref={el => (inputRefs.current[0] = el)}
            />
          </div>
          <div className='product-form-row'>
            <div>
              <label>Select Category: </label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className='product-form-select'
                name='category'
              >
                <option value="">Category</option>
                {categoriesData.map(category => (
                  <option key={category._id} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
            {selectedCategory && (
              <>
                <div><label>Select Type: </label></div>
                <div>
                  <select
                    className='product-form-select'
                    name='type'
                    value={type}
                    onChange={handleType}
                  >
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
              ref={el => (inputRefs.current[1] = el)}
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
              ref={el => (inputRefs.current[2] = el)}
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
              ref={el => (inputRefs.current[3] = el)}
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
              ref={el => (inputRefs.current[4] = el)}
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
              ref={el => (inputRefs.current[5] = el)}
            />
          </div>

          <div>
            <label className='product-form-label'>Quantity</label>
            <input
              type='Number'
              placeholder='quantity of product...'
              name='quantity'
              value={data.quantity}
              onChange={handleInput}
              className='product-form-input'
              // ref={el => (inputRefs.current[5] = el)}
            />
          </div>

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
              ref={el => (inputRefs.current[6] = el)}
            />
          </div>
          <div>
            <label className='product-form-label'>Upload Image</label>
            <input
              type='file'
              name='photo'
              onChange={handlePhoto}
              className='product-form-input'
              ref={el => (inputRefs.current[7] = el)}
            />
          </div>
        </div>
        <div>
          <button type='submit' className='product-form-btn'>Update</button>
        </div>
        <br />
        <div>
          <button className='product-form-btn-cancel' onClick={cancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRegisteredProduct;
