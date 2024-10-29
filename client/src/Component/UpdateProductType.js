// import React, { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import '../style/CreateProductType.css';
// import { useNavigate } from 'react-router-dom';

// export default function UpdateProductType() {
//     const navigate = useNavigate();
//     const [categoryData, setCategoryData] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [selectedCategoryId, setSelectedCategoryId] = useState(''); // State for category ID
//     const [number, setNumber] = useState(0);
//     const [categoryType, setCategoryType] = useState({});

//     useEffect(() => {
//         axios.get('/profile')
//             .then(res => {
//                 if (res.data === 'null') {
//                     navigate('/login');
//                 }
//             })
//             .catch(err => console.log(err));

//         // Fetch categories and types from the backend
//         axios.get('/categoryAndType')
//             .then(res => {
//                 setCategoryData(res.data);
//             })
//             .catch(error => console.log(error));
//     }, [navigate]);

//     useEffect(() => {
//         // When a category is selected, set the types
//         if (selectedCategory) {
//             const category = categoryData.find(cat => cat.category === selectedCategory);
//             if (category) {
//                 setNumber(category.types.length);
//                 const typeObj = {};
//                 category.types.forEach((type, index) => {
//                     typeObj[`input${index + 1}`] = type;
//                 });
//                 setCategoryType(typeObj);
//                 setSelectedCategoryId(category._id); // Set category ID
//             }
//         }
//     }, [selectedCategory, categoryData]);

//     const handleCategoryChange = (e) => {
//         setSelectedCategory(e.target.value);
//     };

//     const handleCategoryType = (e) => {
//         const { name, value } = e.target;
//         setCategoryType(prevCategoryType => ({
//             ...prevCategoryType,
//             [name]: value
//         }));
//     };

//     const handleType = (number, typeObj, handleTypeChange) => {
//         const divs = [];
//         for (let i = 1; i <= number; i++) {
//             divs.push(
//                 <div key={i} className="type-input">
//                     <div>
//                         <input
//                             type='text'
//                             placeholder={`Type ${i}`}
//                             className="input-field"
//                             name={`input${i}`}
//                             value={typeObj[`input${i}`] || ''}
//                             onChange={handleTypeChange}
//                         />
//                     </div>
//                 </div>
//             );
//         }
//         return <div className="type-list">{divs}</div>;
//     };

//     const handleUpdateSubmit = (e) => {
//         e.preventDefault();
//         const types = Object.values(categoryType);
//         if (selectedCategory === '') {
//             toast.error("Category is required");
//         } else if (types.some(type => type === '')) {
//             toast.error("All types must be filled");
//         } else {
//             axios.put(`/update-categoryAndType/${selectedCategoryId}`, { types }) // Include ID in the URL
//                 .then(res => {
//                     if (res.data.success) {
//                         toast.success(res.data.success);
//                     } else if (res.data.error) {
//                         toast.error(res.data.error);
//                     }
//                 })
//                 .catch(error => console.log(error));
//         }
//     };

//     return (
//         <div className="create-product-type">
//             <h2>Update Existing Category and Types</h2>
//             <form onSubmit={handleUpdateSubmit}>
//                 <div className="form-group">
//                     <div><label>Select Category</label></div>
//                     <select value={selectedCategory} onChange={handleCategoryChange} className="input-field">
//                         <option value="">Select a category</option>
//                         {categoryData.map(category => (
//                             <option key={category._id} value={category.category}>{category.category}</option>
//                         ))}
//                     </select>
//                 </div>
//                 {selectedCategory && (
//                     <>
//                         <div><label>Number of Types</label></div>
//                         <input type='number' value={number} readOnly className="input-field" />
//                         {handleType(number, categoryType, handleCategoryType)}
//                         <div><button type='submit' className='submit-btn'>Update</button></div>
//                     </>
//                 )}
//             </form>
//         </div>
//     );
// }









// import React, { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import '../style/CreateProductType.css';
// import { useNavigate } from 'react-router-dom';

// export default function UpdateProductType() {
//     const navigate = useNavigate();
//     const [categoryData, setCategoryData] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [selectedCategoryId, setSelectedCategoryId] = useState('');
//     const [number, setNumber] = useState();
//     const [categoryType, setCategoryType] = useState({});
//     const [newCategory, setNewCategory] = useState('');

//     useEffect(() => {
//         axios.get('/profile')
//             .then(res => {
//                 if (res.data === 'null') {
//                     navigate('/login');
//                 }
//             })
//             .catch(err => console.log(err));

//         // Fetch categories and types from the backend
//         axios.get('/categoryAndType')
//             .then(res => {
//                 setCategoryData(res.data);
//             })
//             .catch(error => console.log(error));
//     }, [navigate]);

//     useEffect(() => {
//         // When a category is selected, set the types
//         if (selectedCategory) {
//             const category = categoryData.find(cat => cat.category === selectedCategory);
//             if (category) {
//                 setSelectedCategoryId(category._id);
//                 setNumber(category.types.length);
//                 setCategoryType(category.types.reduce((acc, type, index) => {
//                     acc[`input${index + 1}`] = type;
//                     return acc;
//                 }, {}));
//                 setNewCategory(category.category);
//             }
//         }
//     }, [selectedCategory, categoryData]);

//     const handleCategoryChange = (e) => {
//         setSelectedCategory(e.target.value);
//     };

//     const handleCategoryTypeChange = (e) => {
//         const { name, value } = e.target;
//         setCategoryType(prevCategoryType => ({
//             ...prevCategoryType,
//             [name]: value
//         }));
//     };

//     const handleCategoryNameChange = (e) => {
        
//             setNewCategory(e.target.value);
        
//     };

//     const handleNumberChange = (e) => {
//         if(e.target.value!==''){
//         setNumber(Number(e.target.value));
//     }else{
//         setNumber(e.target.value)
//     }
//     };

//     const handleTypeInputs = (number, typeObj, handleTypeChange) => {
//         const divs = [];
//         for (let i = 1; i <= number; i++) {
//             divs.push(
//                 <div key={i} className="type-input">
//                     <div>
//                         <input
//                             type='text'
//                             placeholder={`Type ${i}`}
//                             className="input-field"
//                             name={`input${i}`}
//                             value={typeObj[`input${i}`] || ''}
//                             onChange={handleTypeChange}
//                         />
//                     </div>
//                 </div>
//             );
//         }
//         return <div className="type-list">{divs}</div>;
//     };

//     const handleUpdateSubmit = (e) => {
//         e.preventDefault();
//         const types = Object.values(categoryType);
//         if (newCategory === '') {
//             toast.error("Category name is required");
//         } else if (types.some(type => type === '')) {
//             toast.error("All types must be filled");
//         } else {
//             axios.put(`/update-categoryAndType/${selectedCategoryId}`, {
//                 category: newCategory,
//                 types
//             })
//             .then(res => {
//                 if (res.data.success) {
//                     toast.success(res.data.success);
//                 } else if (res.data.error) {
//                     toast.error(res.data.error);
//                 }
//             })
//             .catch(error => console.log(error));
//         }
//     };

//     return (
//         <div className="create-product-type">
//             <h2>Update Existing Category and Types</h2>
//             <form onSubmit={handleUpdateSubmit}>
//                 <div className="form-group">
//                     <div><label>Select Category</label></div>
//                     <select value={selectedCategory} onChange={handleCategoryChange} className="input-field">
//                         <option value="">Select a category</option>
//                         {categoryData.map(category => (
//                             <option key={category._id} value={category.category}>{category.category}</option>
//                         ))}
//                     </select>
//                 </div>
//                 {selectedCategory && (
//                     <>
//                         <div><label>Category Name</label></div>
//                         <input
//                             type='text'
//                             value={newCategory}
//                             onChange={handleCategoryNameChange}
//                             className="input-field"
//                         />
//                         <div><label>Number of Types</label></div>
//                         <input
//                             type='number'
//                             value={number}
//                             onChange={handleNumberChange}
//                             className="input-field"
//                         />
//                         {handleTypeInputs(number, categoryType, handleCategoryTypeChange)}
//                         <div><button type='submit' className='submit-btn'>Update</button></div>
//                     </>
//                 )}
//             </form>
//         </div>
//     );
// }




import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import '../style/CreateProductType.css';
import { useNavigate } from 'react-router-dom';

export default function UpdateProductType() {
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [number, setNumber] = useState();
    const [categoryType, setCategoryType] = useState({});
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        axios.get('/profile')
            .then(res => {
                if (res.data === 'null') {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));

        // Fetch categories and types from the backend
        axios.get('/categoryAndType')
            .then(res => {
                setCategoryData(res.data);
            })
            .catch(error => console.log(error));
    }, [navigate]);

    useEffect(() => {
        // When a category is selected, set the types
        if (selectedCategory) {
            const category = categoryData.find(cat => cat.category === selectedCategory);
            if (category) {
                setSelectedCategoryId(category._id);
                setNumber(category.types.length);
                setCategoryType(category.types.reduce((acc, type, index) => {
                    acc[`input${index + 1}`] = type;
                    return acc;
                }, {}));
                setNewCategory(category.category);
            }
        }
    }, [selectedCategory, categoryData]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleCategoryTypeChange = (e) => {
        const { name, value } = e.target;
        setCategoryType(prevCategoryType => ({
            ...prevCategoryType,
            [name]: value
        }));
    };

    const handleCategoryNameChange = (e) => {
        setNewCategory(e.target.value);
    };

    const handleNumberChange = (e) => {
        if(e.target.value!=""){
            setNumber(Number(e.target.value));
        }else{
            setNumber(e.target.value);
        }
    };

    const handleTypeInputs = (number, typeObj, handleTypeChange) => {
        const divs = [];
        for (let i = 1; i <= number; i++) {
            divs.push(
                <div key={i} className="type-input">
                    <div>
                        <input
                            type='text'
                            placeholder={`Type ${i}`}
                            className="input-field"
                            name={`input${i}`}
                            value={typeObj[`input${i}`] || ''}
                            onChange={handleTypeChange}
                        />
                    </div>
                </div>
            );
        }
        return <div className="type-list">{divs}</div>;
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const types = Array.from({ length: number }, (_, i) => categoryType[`input${i + 1}`] || '');
        if (newCategory === '') {
            toast.error("Category name is required");
        }else if(number==='' || number<=0){
            toast.error("Number of category must be atleast one.")
        } else if (types.some(type => type === '')) {
            toast.error("All types must be filled");
        } else {
            axios.put(`/update-categoryAndType/${selectedCategoryId}`, {
                category: newCategory,
                types
            })
            .then(res => {
                if (res.data.success) {
                    toast.success(res.data.success);
                    setNumber('');
                    setSelectedCategory('')
                } else if (res.data.error) {
                    toast.error(res.data.error);
                }
            })
            .catch(error => console.log(error));
        }
    };

    return (
        <div className="create-product-type">
            <h2>Update Existing Category and Types</h2>
            <form onSubmit={handleUpdateSubmit}>
                <div className="form-group">
                    <div><label>Select Category</label></div>
                    <select value={selectedCategory} onChange={handleCategoryChange} className="input-field">
                        <option value="">Select a category</option>
                        {categoryData.map(category => (
                            <option key={category._id} value={category.category}>{category.category}</option>
                        ))}
                    </select>
                </div>
                {selectedCategory && (
                    <>
                        <div><label>Category Name</label></div>
                        <input
                            type='text'
                            value={newCategory}
                            onChange={handleCategoryNameChange}
                            className="input-field"
                        />
                        <div><label>Number of Types</label></div>
                        <input
                            type='number'
                            value={number}
                            onChange={handleNumberChange}
                            className="input-field"
                        />
                        {handleTypeInputs(number, categoryType, handleCategoryTypeChange)}
                        <div><button type='submit' className='submit-btn'>Update</button></div>
                    </>
                )}
            </form>
        </div>
    );
}
