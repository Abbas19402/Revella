import React from 'react'
import { useState } from 'react';
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../Redux/Actions/index";
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // ****** States ******
  const [ data , setData ] = useState();
  const {  setSidebarOf , totalCost } = bindActionCreators(
    actionCreators,
    dispatch
  );
  
  useEffect(()=>{
    getCart()
  },[])
  
  const getCart = async()=> {
    let _formData = new FormData();
    _formData.append('session_id',138);
    await axios.post(`https://fashion-admin.servepratham.com/api/v2/user/cart/list`,_formData)
    .then((res)=> {
      console.log("API Fetched and Response is : ",res.data.data);
      setData(res.data.data)
    })
    .catch((err)=>{
      console.log("Error Message: ",err.message);
      console.log("Status Code: ",err.response.status);
    })
  }

  const removeItem = async(cartItemId)=> {
    let _formData = new FormData();
    _formData.append("session_id" , 138)
    await axios.delete(`https://admin.nily.com.br/api/v2/user/cart/remove/${cartItemId}`,_formData)
    .then((res)=> {
      console.log(res);
      window.location.reload();
    })
    .catch((err)=> {
      console.log(err); 
    })
  }
  
  return (
    typeof data !== 'undefined' &&
    <div className='z-50'>
      <div id="Head" className="px-10 py-3">
        <span className="text-xl font-firaCode">Cart</span>
      </div>
      <hr className='divide-black'/>
      {data.length == 0? (        
        <>
          <div className="flex flex-col p-5">
            <div id="showEmptyMessage" className='text-center'>
              <span className='text-2xl text-gray-500'>Your Cart is empty</span>
            </div> <br />
            <div id="shopButton" className='mx-auto'>
              <button 
              className='hover:bg-white bg-black text-white hover:text-black transition duration-700 border-2 border-black font-extralight py-2 px-6'
              onClick={()=>{setSidebarOf("-right-[50rem]")}
              }
              >
                <span>Back to Shop</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {data.map((item,key)=>(
            <>
              <div key={key} id="card" className="flex flex-col lg:flex-row p-5 justify-between items-center rounded-md m-6 hover:shadow-2xl hover:scale-105 transition-all duration-1000 border-2 hover:border-black">
                <div className='flex flex-row items-center' onClick={()=> {
                  navigate("/buy",{state: {  
                    pageSection: 'addToCart'
                  }})
                  setSidebarOf("-right-[90rem]")
                }}>
                  <div id="image" className='flex-grow'>
                    <img src={item.get_product_data.ImageSrc} className="w-full h-28 rounded-md"/>
                  </div>
                  <div id="details" className='text-center p-2'>
                    <span className='text-md font-light'>{item.get_product_data.product_name}</span>
                  </div>
                </div>
                <div id="Cost&Buy" className='p-2 bg-slate-100 rounded-md w-full md:w-fit flex flex-col justify-center'>
                  <div id="cost" className='text-center my-2 '>
                    <span className='text-blue-500'>${item.get_product_data.price}</span>
                  </div>
                  <div id="buy" className='flex flex-col w-fit mx-auto'>                  
                    <button 
                    className='hover:bg-black bg-white text-black hover:text-white transition duration-700 border-2 font-extralight py-1 my-1 px-4 mx-2 w-[12vh]'
                    onClick={()=> {
                      removeItem(item.id)
                    }}
                    >
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </div>
  )
}

export default Cart;