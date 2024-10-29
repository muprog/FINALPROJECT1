import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import '../style/productStructure.css';
import '../style/HomeScroll.css';
import { userContext } from '../Component/UserContext';
import ProductStructure from '../Component/ProductStructure';
import BannerPage from './BannerPage';
import HorizontalScroll from 'react-scroll-horizontal';
import { Link } from 'react-router-dom';
export default function Home() {
  const {searchController}=useContext(userContext)
  const pattern=new RegExp(searchController,'gi');
const [data,setData]=useState('');
useEffect(()=>{
   axios.get('/')
    .then(res=>setData(res.data))
    .catch(error=>console.log(error))
  
},[])
  return (
  <div className='Home-whole-div'>
    <BannerPage />

   {
    searchController?"":<div className='scroll-div'>
      <HorizontalScroll>
      {!data?"":
       data.map((element)=>{
        if(element.type==="Laptop"){
          if(element.status==="on"){
            if(element.quantity!=0){
          return <Link to={`/product-detail/${element._id}`}>
          <div className='inner-scroll-div'>
  <img src={require(`../images/${element.photo}`)}  className='scrolling-image'/>
  <div className='info-div'>
    <div>{element.brand}</div>
    <div>{element.name}</div>
    <div>{element.size}</div>
    <div>{
    new Intl.NumberFormat('en-US', {
  style: 'decimal', 
  minimumFractionDigits: 2, 
  maximumFractionDigits: 2,
}).format(element.price)
    }ETB</div>
  </div>
          </div>
          </Link>
          }
        }
      } 
      })
      }
    </HorizontalScroll>
      </div>}
{
 searchController?"":<div className='scroll-div'>
      <HorizontalScroll>
      {!data?"":
       data.map((element)=>{
        if(element.type==="Phone"){
          if(element.status==="on"){
            if(element.quantity!=0)
          return <Link to={`/product-detail/${element._id}`}>
          <div className='inner-scroll-div'>
  <img src={require(`../images/${element.photo}`)}  className='scrolling-image'/>
  <div className='info-div'>
    <div>{element.brand}</div>
    <div>{element.name}</div>
    <div>{element.size}</div>
    <div>{
    new Intl.NumberFormat('en-US', {
  style: 'decimal', 
  minimumFractionDigits: 2, 
  maximumFractionDigits: 2,
}).format(element.price)
    }ETB</div>
  </div>
          </div>
          </Link>
        }
      }
      })
      }
    </HorizontalScroll>
      </div>}
      <div className='whole-product'>
   {!data?"":
     data.map(element=>{
    if(searchController){
     if(pattern.test(element.name)||pattern.test(element.size)||pattern.test(element.description)||pattern.test(element.color)||pattern.test(element.brand)||pattern.test(element.category)||pattern.test(element.type)){
      if(element.quantity!=0){
        return(<ProductStructure key={element._id} photo={element.photo} name={element.name} brand={element.brand} description={element.description} price={element.price} id={element._id}/>)
      }
    }else{
      return "";
    }
    }else{
      if(element.status==="on"){
        if(element.quantity!=0){
          return(<ProductStructure key={element._id} photo={element.photo} name={element.name} brand={element.brand} description={element.description} price={element.price} id={element._id}/>)
        }
    }
    }
    })
    }
    </div>
    </div>
  )
}
