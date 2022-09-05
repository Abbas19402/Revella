import React from 'react'
import { useState , useEffect } from 'react'
import { bindActionCreators  } from 'redux'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../../Redux/Actions';
import { useSelector } from 'react-redux'
import Loader from '../../Assets/Loader';
import { useLocation } from 'react-router';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Trending = (props) => {
  const location = useLocation();
  var MAX_LENGTH = 20;
  // ****** Redux ******
  const loadData = useSelector(state => state.trendReducer)
  const dispatch = useDispatch();
  const  { LoadTrendData , callProduct } = bindActionCreators(actionCreators,dispatch);
  
  // ****** API States ******
  const [ data , setData ] = useState([])
  const [ isLoading , setIsLoading ] = useState(true)
  const [ error , setError ] = useState(false)
  const [ userId , setUserId ] = useState()
  
  // ****** API ******  
  const getData = async () => {
    await axios.get("https://fashion-admin.servepratham.com/api/v2/user/sorting/trending-product/most-popular")
    .then((res)=>{
      console.log("NewArrival response = ",res);
      let filteredArray = res.data.data.data.filter(item => item.offer_price != null);
      setData(filteredArray);
      setIsLoading(false)
    })
    .catch((err)=>{
      setIsLoading(false);
      console.log(err);
    })
  };
  useEffect(()=>{
      setUserId(138)
      getData();
  },[])

  // ****** Functions ******
  const LoadData = ()=> {
    setIsLoading(true)
    LoadTrendData(8)
    setIsLoading(false)
  }
  return (
    <React.Fragment>
      <div id="head" className='my-8'>
        <div id="topHeading" className={`text-center flex flex-row items-center justify-center mt-3`}>
            <div className='mx-2'>
            <span className='text-2xl font-firaCode font-bold'>-----</span>
            </div>
            <div className='mx-5'>
              <span className='text-3xl font-semibold'>New Arrivals</span>
            </div>
            <div className='mx-2'>
            <span className='text-2xl font-firaCode font-bold'>-----</span>
            </div>
        </div>
        <div id="subHeading" className='text-center'>
          <span className='font-serif italic font-medium text-gray-400'>Top view in this week</span>
        </div>
      </div>
      <div className='overflow-hidden bg-gray-100'>
        <div id="grid">

          {/* Grid-1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-fit h-fit m-5 landscape:justify-items-center justify-evenly px-4 md:px-10 lg:px-20 xl:px-10 2xl:px-6 mx-auto bg-gray-100 py-10" 
          >
            {data.map((item,key)=>(
              <>
                <div id="card" 
                className={`z-20 w-[20rem] mx-5 landscape:Justify-center landscape:w-[15rem] landscape:xl:w-[16rem] landscape:2xl:w-[25rem] lg:w-[70vw] ${!isLoading ? 'h-fit' : 'h-[32vh]'} border-2 m-5 overflow-hidden border-white bg-white hover:bg-black transition-all duration-1000 hover:scale-105 hover:shadow-2xl hover:border-black rounded-lg border-b-2 border-x-2`}
                onClick={()=>props.onclick(item,userId)}
                >
                  {!isLoading ?<div key={key} id="image" className='p-5 bg-white' style={{height:"60%"}}>
                    <img src={item.ImageSrc} alt="store" style={{height:"40vh" , width:"100%" }}/>
                  </div> : <Skeleton style={{height:"30vh"}}/>}
                  <div className='relative'>
                    {!isLoading? <div id="title" className='oveflow-hidden mt-4 px-5 hover:cursor-pointer pt-1'>
                      <span className='text-sm text-gray-500 font-medium'>{item.product_name.substring(0, MAX_LENGTH)}...</span>
                    </div> : <Skeleton width="60%"/>}
                    {!isLoading ? <div id="priceTag" className='px-5 relative hover:cursor-pointer pb-2'>
                      <div id="offerPrice" className='mr-4'>
                        <span className='text-md text-sky-700'>${item.offer_price}</span>
                      </div>
                    </div> : <Skeleton width='30%'/>}
                  </div>
                </div>
              </>
            ))}
          </div>  
        </div>
      </div>
    </React.Fragment>
  )
}

export default Trending
