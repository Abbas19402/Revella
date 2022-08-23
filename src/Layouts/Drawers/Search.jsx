import React, { useEffect } from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loader from "../../Assets/Loader";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../Redux/Actions/index";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {  setSidebarOf } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [searchedData, setSearchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=> {
    console.log("Page refreshed");
  })

  // ****** States ******
  const [ filterType , setFilterType ] = useState('');

  // ****** API ******  
  const getSearchedData = async (value, index) => {
    console.log(value);
    let _formData=new FormData();
    _formData.append('location_lat',24.5871289);
    _formData.append('location_long',73.6969651);
    _formData.append('id', 1) //
    _formData.append('type', value)//
    _formData.append("start_price" , 0);
    _formData.append("end_price" , 1000)
    _formData.append("start_discount" , 0)
    _formData.append("end_discount" , 1000)

    await axios.post("https://admin.nily.com.br/api/v2/user/category/product",_formData)
    .then((res)=>{
      console.log("Filter response = ",res);
      let filteredSearchArray = res.data.data.data.filter(item => item.offer_price != null);
      setSearchedData(filteredSearchArray);
      setIsLoading(false)
    })
    .catch((err)=>{
      setIsLoading(false);
      console.log(err);
    })
  };
 
  const refreshPage = ()=> {
    window.location.reload();
  }

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    <div>Error</div>;
  }

  // ****** Functions ******
  const handleChange = (event) => {
    setFilterType(event.target.value)
  };
  return (
    <>
      <div className="z-40">
        <div id="Head" className="px-5 py-3">
          <span className="text-xl font-firaCode">Search our site</span>
        </div>
        <hr />
        <div id="Catagories" className="mx-12 my-4 h-fit flex justify-center">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Filter
            </InputLabel>
            <Select
              onChange={handleChange}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Filter"
              value={filterType}
            >
                <MenuItem
                  key = {1}
                  value = "new-arrivals"
                  onClick={()=>{
                    getSearchedData("new-arrivals" , 0)
                  }}
                >
                  New Arrivals
                </MenuItem>
                <MenuItem
                  key = {2}
                  value = "most-popular"
                  onClick={()=>{
                    getSearchedData("most-popular" , 0)
                  }}
                >
                  Most Popular
                </MenuItem>
                <MenuItem
                  key = {3}
                  value = "price-high-to-low"
                  onClick={()=>{
                    getSearchedData("price-high-to-low" , 0)
                  }}
                >
                  Price(High to Low)
                </MenuItem><MenuItem
                  key = {4}
                  value = "price-low-to-high"
                  onClick={()=>{
                    getSearchedData("price-low-to-high" , 0)
                  }}
                >
                  Price(Low to High)
                </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div id="dataDisplay">
          {console.log(searchedData)}
          {searchedData.map((val, key) => (
              <div
                key={key}
                id="card"
                className="flex flex-col lg:flex-row p-5 justify-between items-center border-2 rounded-md m-3 pb-2"
              >
                <div id="image" className="m-3">
                  <img src={val.ImageSrc} className="h-28" />
                </div>
                <div id="details" className="text-center p-2">
                  <span className="text-lg font-light">{val.product_name}</span>
                </div>
                <div
                  id="Cost&Buy"
                  className="p-2 bg-slate-100 rounded-md w-full md:w-fit flex flex-col justify-center"
                >
                  <div id="cost" className="text-center my-2 ">
                    <span className="text-blue-500">${val.offer_price}</span>
                  </div>
                  <div id="buy" className="flex flex-col w-fit mx-auto">
                      <button
                        className="hover:bg-black bg-white text-black hover:text-white transition duration-700 border-2 font-extralight py-1 my-1 px-4 mx-2 w-[12vh]"
                        onClick={() => {
                          if(location.pathname !== '/product') {
                            navigate('/product',{state:{
                              data:val,
                              comingFrom: "search"
                            }})
                          } else {
                            navigate('/product',{state:{
                              data:val,
                              comingFrom: "search"
                            }})
                            refreshPage()
                          }
                          setSidebarOf("-right-[90rem]")
                        }}
                      >
                        <span>Buy</span>
                      </button>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
      <div id="searchedData" className="border-2">
        {isLoading ? (
          <Loader />
        ) : searchedData == null ? (
          console.log("error occured")
        ) : (
          <>
            {searchedData === null ? (
              <>
                <span>hey please wait we are fetching data for you</span>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Search;
