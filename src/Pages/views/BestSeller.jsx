import React from "react";
import { useState, useEffect } from "react";
import Loader from "../../Assets/Loader";
import { Link } from "react-router-dom";
import { bindActionCreators  } from 'redux'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../../Redux/Actions';
import axios from 'axios'
import { useLocation } from "react-router";

const BestSeller = (props) => {
  const location = useLocation();
  var MAX_LENGTH = 20;
  // ****** Redux ******
  const dispatch = useDispatch();
  const  { callProduct } = bindActionCreators(actionCreators,dispatch);

  // ****** API States ******
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ userId , setUserId ] = useState()

  // ****** API ******
  const getData = async()=> {
    const response = await axios({
      url: "https://fashion-admin.servepratham.com/api/v2/user/sorting/trending-product",
      method: "GET",
    })
    const filteredArray = response.data.data.data.filter((item) => item.offer_price != null ) 
    setData(filteredArray)
    setIsLoading(false)
}
  useEffect(()=>{
      setUserId(138)
      getData();
  },[])

  if(isLoading) {
    return <Loader />;
  } else if(error) {
    <div>
      {console.log("There is an error")}
      Error
    </div>;
  }
  return (
    <React.Fragment>
      <div id="head" className="my-8">
        <div
          id="topHeading"
          className={`text-center flex flex-row items-center justify-center mt-3`}
        >
          <div className="mx-2">
            <span className="text-2xl font-firaCode font-bold">-----</span>
          </div>
          <div className="mx-5">
            <span className="text-3xl font-semibold">Best Seller</span>
          </div>
          <div className="mx-2">
            <span className="text-2xl font-firaCode font-bold">-----</span>
          </div>
        </div>
        <div id="subHeading" className="text-center">
          <span className="font-serif italic font-medium text-gray-400">
            Top sale in this week
          </span>
        </div>
      </div>
      <div className="overflow-hidden bg-gray-100">
        <div id="grid">
          {/* Grid-1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-fit h-fit m-5 landscape:justify-items-center justify-evenly px-4 md:px-10 lg:px-20 xl:px-10 2xl:px-6 mx-auto bg-gray-100 py-10" 
          >
            {data.map((item,key)=>(
              <>
                <div id="card" 
                className='z-20 w-[20rem] mx-5 landscape:Justify-center landscape:w-[15rem] landscape:xl:w-[16rem] landscape:2xl:w-[25rem] lg:w-[70vw] h-fit border-2 m-5 overflow-hidden border-white bg-white hover:bg-black transition duration-1000 hover:scale-105 hover:shadow-2xl hover:border-black rounded-lg border-b-2 border-x-2'
                onClick={()=>props.onclick(item,userId)}
                >
                  <div key={key} id="image" className='p-5 bg-white' style={{height:"60%"}}>
                    <img src={item.ImageSrc} alt="store" style={{height:"40vh" , width:"100%" }}/>
                  </div>
                  <div className='relative'>
                    <div id="title" className='oveflow-hidden mt-4 px-5 hover:cursor-pointer pt-1'>
                      <span className='text-sm text-gray-500 font-medium'>{item.product_name.substring(0, MAX_LENGTH)}...</span>
                    </div>
                    <div id="priceTag" className='px-5 relative hover:cursor-pointer pb-2'>
                      <span className='text-md text-sky-700'>${item.offer_price}</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>    
        </div>  
      </div>
    </React.Fragment>
  );
};

export default BestSeller;