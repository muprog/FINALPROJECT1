// import React, { useState, useEffect, useContext } from 'react';
// import { userContext } from './UserContext';
// import axios from 'axios';
// import '../style/favorite.css';  // Create this CSS file for styling

// export default function Favorite() {
//   const { user } = useContext(userContext);
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await axios.get(`/favorites/${user.email}`);
//         setFavorites(response.data.favorites);
//       } catch (error) {
//         console.error('Failed to fetch favorites:', error);
//       }
//     };

//     if (user.email) {
//       fetchFavorites();
//     }
//   }, [user.email]);

//   return (
//     <div className='favorites-container'>
//       <h1>Your Favorites</h1>
//       <div className='favorites-list'>
//         {favorites.length > 0 ? (
//           favorites.map((fav) => (
//             <div key={fav._id} className='favorite-item'>
//               <img src={require(`../images/${fav.photo}`)} alt={fav.name} className='favorite-item-img'/>
//               <div className='favorite-item-details'>
//                 <h2>{fav.name}</h2>
//                 <p>Brand: {fav.brand}</p>
//                 <p>Size: {fav.size}</p>
//                 <p>Price: ETB {new Intl.NumberFormat('en-US', {
//                   style: 'decimal',
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 }).format(fav.price)}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No favorites found.</p>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useContext } from 'react';
import { userContext } from './UserContext';
import axios from 'axios';
import '../style/favorite.css';  // Create this CSS file for styling
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Favorite() {
  const { user, cartData, setCartData,setCount} = useContext(userContext);
  const [favorites, setFavorites] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`/favorites/${user.email}`);
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    if (user.email) {
      fetchFavorites();
    }
  }, [user.email]);
useEffect(()=>{
    axios.get('/profile')
     .then(res=>{
      // console.log(res.data)
    if(res.data==='null'){
      navigate('/login')
    }
    })
     .catch(err=>console.log(err));
},[])
  const countObjectOccurrencesById = (arr, id) => {
    return arr.filter(item => item._id === id).length;
  };

  const handleAddToCart = (element) => {
    const match = cartData.find(item => item._id === element._id);
    if (!match) {
      setCartData(prevData => [
        ...prevData, { ...element, index: cartData.length }
      ]);
    } else {
      const occurrenceCount = countObjectOccurrencesById(cartData, element._id);
      if (occurrenceCount < element.quantity) {
        setCartData(prevData => [
          ...prevData, { ...element, index: cartData.length }
        ]);
      } else if (occurrenceCount >= element.quantity) {
        toast.error(`We have only ${element.quantity} number of ${element.name}.`);
      }
    }
  };

  function handleRemovFromFavorite(element) {
    axios
      .delete(`/favorites/${user.email}/${element._id}`)
      .then((response) => {
        // Filter the favorites list to remove the deleted item
        setFavorites((prevFavorites) => 
          prevFavorites.filter(fav => fav._id !== element._id)
        );
        toast.success(`${element.name} removed from favorites.`);
      })
      .catch((error) => {
        console.error('Failed to remove favorite:', error);
        toast.error('Failed to remove favorite.');
      });
  }



  if (cartData.length > 0) {
    setCount(cartData.length);
  } else if (cartData.length === 0) {
    setCount();
  }

  return (
    <div className='favorites-container'>
      <h1>Your Favorites</h1>
      <div className='favorites-list'>
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav._id} className='favorite-item'>
              <div className='favorite-image-div'><img src={require(`../images/${fav.photo}`)} alt={fav.name} className='favorite-item-img'/></div>
              <div className='favorite-item-details'>
                <h2>{fav.name}</h2>
                <p>Brand: {fav.brand}</p>
                <p>Size: {fav.size}</p>
                <p>Price: ETB {new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(fav.price)}</p>
                <button onClick={() => handleAddToCart(fav)} className='add-to-cart'>Add to Cart</button>
                <button onClick={()=>handleRemovFromFavorite(fav)} className='add-to-cart'>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </div>
    </div>
  );
}
