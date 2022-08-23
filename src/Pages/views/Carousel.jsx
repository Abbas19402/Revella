import React from "react";
import { useState , useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';

const CarouselBanner = () => {
    // ****** API States ******
    const [ data , setData ] = useState([])
    const [ isLoading , setIsLoading ] = useState(true)
    const [ error , setError ] = useState(false)


    // ****** API ******
    const getData = async()=> {
        const response = await fetch("https://fakestoreapi.com/products/category/women's%20clothing");
        if(response.ok) {
            console.log("Data Fetched Successfully")
            const result = await response.json()
            setData(result)
            setIsLoading(false)
        } else {
            console.log("Data Fetched Unsuccessfully")
            setIsLoading(false)
            setError(true)
        }
    }
    useEffect(()=>{
        getData();
    },[])

    if(isLoading) {
        <div>
            {console.log("Currently Loading")}
            Loading....
        </div>
    } else if(error) {
        <div>
            {console.log("There is an error")}
            Error
        </div>
    }
  return (
    <div>
        { console.log("Now working in carousel banner") }
        <Carousel>
            {data.map((value,key)=>{ 
                <div key={key} className="h-fit w-fit border-2 border-black">
                    <img src={value.image} />
                    <p className="legend">Legend 1</p>
                </div>
             })}  
        </Carousel>
    </div>
  );
};

export default CarouselBanner;
