import React from "react";
import { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router'
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../Redux/Actions/index";
import Button from "@mui/material/Button";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartTwoToneIcon from '@mui/icons-material/RemoveShoppingCartTwoTone';
import axios from 'axios'

const Buy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { addQuantity } = bindActionCreators(actionCreators , dispatch);

  var subTotal = 0;

  // ****** API & API States ******
  const [ data , setData ] = useState([]);
  const [ rate , setRate ] = useState();
  const [ discount , setDiscount ] = useState();
  const [ tax , setTax ] = useState();
  const [ total , setTotal ] = useState();
  const [ checkoutType , setCheckoutType ] = useState();
  const [ inCheckoutType , setInCheckoutType ] = useState();
  const [ costObj , setCostObj ] = useState();
  const [ expandCForm , setExpandCForm ] = useState('h-0');
  const [ update , setUpdate ] = useState(false)
  const [ count , setCount ] = useState(1);
  const [ PaySuccessDetails , setPaySuccessDetails ] = useState({
    payment_id: "",
    order_id: "",
    signature: ""
  })

  const getCart = async()=> {
    let _formData = new FormData();
    _formData.append('session_id',138);

    await axios.post(`https://fashion-admin.servepratham.com/api/v2/user/cart/list`,_formData)
    .then((res)=> {
      console.log(res.data.data);
      setData(res.data.data);
      res.data.data.map((item , key)=> {
        subTotal = subTotal + parseInt(item.get_product_data.offer_price) * parseInt(item.quantity);
        setRate(subTotal)
        setDiscount(subTotal * 3 / 100);
        setTax(subTotal * 18 / 100);
        setTotal(((subTotal - (subTotal * 3 / 100)) + subTotal * 18 /100 ))
      })
    })
    .catch((err)=>{
      console.log("Error Message: ",err.message);
      console.log("Status Code: ",err.response.status);
    })
  }

  const removeItem = async(cartItemId)=> {
    let _formData = new FormData();
    _formData.append("session_id" , 138)
    await axios.delete(`https://fashion-admin.servepratham.com/api/v2/user/cart/remove/${cartItemId}`,_formData)
    .then((res)=> {
      window.location.reload()
    })
    .catch((err)=> {
      console.log(err); 
    })
  }

  const updateCart = async(itemId , qty)=> {
    let formData = new FormData();
    formData.append("id" , itemId)
    formData.append("quantity" , qty)
    await axios.post(`https://fashion-admin.servepratham.com/api/v2/user/cart/update`,formData)
    .then((res)=> {
      console.log("Api Updated successfully!!");
      console.log("Update Response = ", res);
      setUpdate(!update)
    })
    .catch((err)=> {
      console.log(err);
    })
  }

  const addCartQuantity = qty => {
    qty = qty + 1;
    return qty;
  }

  const decreaseCartQuantity = qty => {
    qty = qty - 1;
    return qty;
  }

  const increaseQty = (index) => {
    data.map((item , key)=> {
      if(index == key) {
        const addedQuantity = addCartQuantity(parseInt(item.quantity));
        updateCart(item.id , addedQuantity);
        addQuantity(addedQuantity);
      } else {
        addQuantity(item.quantity)
      }
    })
  }

  const decreaseQty = (index) => {
    data.map((item , key)=> {
      if(index == key) {
        const decreasedQuantity = decreaseCartQuantity(parseInt(item.quantity));
        updateCart(item.id , decreasedQuantity);
        addQuantity(decreasedQuantity);
      } else {
        addQuantity(item.quantity)
      }
    })
  }

  const emptyArrayOnCartPurchase = ()=> {
    let clearedCart = data.filter( item => item.get_product_data.product_name = item.get_product_data.product_name )
    return(clearedCart)
  }

  useEffect(() => {
    if(location.state.pageSection === 'buy') {
      window.scrollTo(0, 0)
      setData(location.state.value)
      setCheckoutType(location.state.pageSection);
      let cost = location.state.value.offer_price;
      console.log("cost = ",cost);
      let qty = location.state.qty
      let CAQ = cost * qty
      console.log("caq = ",CAQ);
      let discount = (cost * 3 / 100) * qty;
      let tax = (cost * 18 / 100) * qty;
      setCostObj({
        productCost : cost,
        quantity : qty,
        discount : discount,
        tax : tax,
        totalCost : CAQ - discount + tax
      })
    } else {
      if(update == true || update == false) {
        setCheckoutType(location.state.pageSection)
        getCart();
      } else if(window.location.pageSection === 'addToCart') {
        window.scrollTo(0, 0)
        setCheckoutType(location.state.pageSection)
        getCart();
      }
    }
  }, [])

  // ****** States ******
  const [ removeButton , setRemoveButton ] = useState(false);
  const [ cartItemRemove , setCartItemRemove ] = useState(false);
  const [ globalRemoveKey , setGlobalRemoveKey ] = useState();
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    mail: "",
  });
  const [cardDetails, setCardDetails ] = useState({
    cardNumber: "",
    validThru: "",
    cvv: "",
  });

  //  ****** Functions ******
  const handleChange = event => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handlePayChange = event => {
    setCardDetails({ ...cardDetails, [event.target.name]: event.target.value })
  }
  
  const checkout = ()=> {
    setUserDetails({
      name: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      mail: "",
    })
  }
  
  // ****** RazorPay Integration ******
  const loadScript = (src)=> {
    return new Promise((resolve)=> {
      const script = document.createElement('script');
      script.src = src
      script.onload = ()=> {
        console.log("loadscript loaded!!");
        resolve(true)
      }
      script.onerror = () => {
        console.log("loadscript loading failed!!");
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const sendKeys = async(val)=> {
    console.log("payable amount: ",Number(val));
    let tempObj = {
      amount: (val * 77.67).toFixed(0),
      currency: "INR"
    }
    axios.post("https://razorpay-justbuyit.herokuapp.com/getKeys",tempObj)
    .then((res)=> {
      console.log("order Response =",res);
    })
  }

  const displayRazorpay = async(removeAfterPurchase) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if(!res) {
      alert("RazorPay SDK failed!! Please check your Internet connection.");
      return
    }
    try{
      await axios.post("https://razorpay-justbuyit.herokuapp.com/razorpay")
      .then((data)=>{
        const amount = Number(data.data.amount);
        console.log("Amount field = ", amount)
        var options = {
          key: "rzp_test_xTLHwGrmtC95nI",
          amount: amount*100,
          currency: data.data.currency,
          name: "Just Buy It",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: data.data.order_id, 
          handler: function (response){
            setPaySuccessDetails({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature
            })
            navigate('/pays');
          }
        };
        var paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });
    }
    catch(err) { 
      console.log('Error',err.message)
    }
  }

  return (
    (typeof data!=='undefined' && typeof checkoutType !== 'undefined') &&
    <div className="px-4 md:px-20 lg:px-32 overflow-hidden">
      {checkoutType === "buy" ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 mb-10">
            <div id="grid-1" className="h-full my-2 overflow-hidden">
              <div className="p-3 m-2">
                <div id="productTitle" className="my-2">
                  <span className="text-2xl text-black font-medium">
                    {data.product_name}
                  </span>
                </div>
                <div id="productDescription" className='my-2'>
                  <span className='text-lg font-medium text-gray-500'>{data.short_desc}</span>
                </div>
              </div>
              <div id="contactForm" className="flex flex-row justify-between items-center border-2 mx-2 my-2">
                <div id="head" className="px-5 w-fit ml-0">
                    <span className="font-light text-xl md:text-2xl text-black">
                      Enter contact details here :- 
                    </span>
                </div>
                <div className="my-2">
                    <div id="expandButton">
                      <Button variant="text" color="primary" size="large" onClick={()=>{
                        setExpandCForm(!expandCForm)
                      }}>
                        {expandCForm ? 
                        <>
                          <ExpandMoreIcon fontSize="large" color="secondary"/>
                        </> : 
                        <>
                          <ExpandLessIcon fontSize="large" color="secondary"/>
                        </>}
                      </Button>
                    </div>
                </div>
              </div>
              <div className={`bg-gray-200 overflow-hidden transition-all duration-1000 my-6 mx- 2 z-50 ${expandCForm? "h-0" : "h-full" }` }>
                <form className="px-2 pt-5">
                  <div id="name" className="px-2 m-2 mb-5">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="w-full h-10 bg-white px-3"
                      value={userDetails.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    id="addressDetails"
                    className="px-2 m-2 mb-5 flex flex-col"
                  >
                    <div id="address">
                      <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        className="w-full h-10 bg-white px-3 my-2"
                        value={userDetails.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div id="cityState" className="flex flex-col md:flex-row">
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        className="w-full h-10 bg-white px-3 my-2 md:mr-1"
                        value={userDetails.city}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        placeholder="State"
                        name="state"
                        className="w-full h-10 bg-white px-3 my-2 md:ml-1"
                        value={userDetails.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div id="phoneEmail" className="px-2 m-2">
                    <input
                      type="text"
                      placeholder="Phone no."
                      name="phone"
                      className="w-full h-10 bg-white px-3 my-2"
                      value={userDetails.phone}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      name="mail"
                      className="w-full h-10 bg-white px-3 my-2"
                      value={userDetails.mail}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div id="checkoutSection 2nd-Grid" className="m-2 bg-gray-200 p-6 h-full mb-2 transition-all duration-1000">
              <div
                id="productPreview"
                className="flex flex-row justify-between items-center px-3 bg-white rounded-md transition-all overflow-hidden relative h-fit"
              >
                <div id="image" className="rounded-md m-3">
                  <img
                    src={data.ImageSrc}
                    alt={data.product_name}
                    className="w-20 h-20"
                  />
                </div>
                <div id="productName">
                  <span className="text-sm font-medium text-gray-500">{data.product_name.toUpperCase()}</span>
                </div>
                <div id="cost" className="m-6">
                  <span className="text-lg font-medium text-sky-500">
                    ${data.offer_price}
                  </span>
                </div>
              </div>
              <div
                id="costDetails"
                className="border-2 border-white my-6 h-fit p-4"
              >
                <div
                  id="details"
                  className="grid grid-cols-12 justify-between "
                >
                  <div
                    id="names"
                    className="flex flex-col w-full col-span-9 overflow-hidden"
                  >
                    <ul>
                      <li className="font-light text-gray-600 my-0.5">
                        <span>Quantity: </span>
                      </li>
                      <li className="font-light text-gray-600 my-0.5">
                        <span>3% Discount: </span>
                      </li>
                      <li className="font-light text-gray-600 my-0.5">
                        <span>18% Tax: </span>
                      </li>
                      <li className="border-white font-bold">
                        <span>Total: </span>
                      </li>
                    </ul>
                  </div>
                  <div
                    id="amount"
                    className="flex flex-col w-full col-span-3 overflow-hidden"
                  >
                    <ul className="w-full ml-auto px-3 flex flex-col items-end">
                      <li className="font-medium text-gray-600 overflow-hidden">
                      <div id="ProQuantity">
                        <div className="flex flex-row justify-start items-center">
                          <div id="decreaseQuantity">
                            {count == 1 ? (
                              <button disabled onClick={()=> {
                                setCount(count - 1)
                              }}>
                                <span className="text-xl text-black">
                                  -
                                </span>
                              </button>
                            ) : (
                              <button onClick={()=> {
                                setCount(count - 1)
                              }}>
                                <span className="text-xl text-black">
                                  -
                                </span>
                              </button>
                            )}
                          </div>
                          <div>
                            <span className="text-md leading-4 mx-3">
                              {count}
                            </span>
                          </div>
                          <div id="increaseQty">
                            {count == 10 ? (
                              <button disabled onClick={()=> {
                                setCount(count + 1)
                              }}>
                                <span className="text-xl text-black">
                                  +
                                </span>
                              </button>
                            ) : (
                              <button onClick={()=> {
                                setCount(count + 1)
                              }}>
                                <span className="text-xl text-black">
                                  +
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      </li>
                      <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                        <span>
                          ${(costObj.discount * count).toFixed(2)}
                        </span>
                      </li>
                      <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                        <span>
                          ${(costObj.tax * count).toFixed(2)}
                        </span>
                      </li>
                      <li className="border-white w-fit font-bold">
                        <span>
                          ${(costObj.totalCost * count).toFixed(2)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div id="CheckoutButton">
                <button 
                  className='hover:bg-white bg-black text-white hover:text-black transition-all duration-700 border-2 border-black font-extralight py-2 px-6 mx-2 w-[10rem] my-2 hover:shadow-2xl hover:scale-105 ease-in-out'
                  onClick={()=>{
                    let array = Object.values(userDetails);
                    if(Object.values(userDetails)) {
                      if(array.every( item => item != '' )) {
                        setCheckoutType('Checkout')
                        setInCheckoutType('buy')
                        window.scroll(0,0)
                      } else {
                        console.log("fV else")
                        const keys = Object.keys(userDetails);
                        const findKey = ( item , index ) => {
                          let requiredIndex = array.indexOf('');
                          console.log(requiredIndex)
                          return requiredIndex
                        }
                        let requiredKey = keys.find(findKey)
                        alert(`${requiredKey} is required!!`);
                      }
                    } else {
                      alert("Something went wrong!!!")
                    }
                  }}>
                    <span>Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : checkoutType === "addToCart" ? (
        <>
          <div id="cartPage">
            {data.length == 0 ? (
              <React.Fragment>
                <div className='mx-auto h-[60vh] w-[60vw] bg-white overflow-hidden text-center py-16'>
                    <span className='text-[43px] font-firaCode text-gray-800 font-thin'>Your Cart is Empty!!</span>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                  <div id="grid" className="flex flex-col lg:flex-row justify-between py-2">
                    <div className="p-3 w-full lg:mx-10">
                      <div id="CartHeading" className="my-3 flex flex-row justify-center lg:justify-between items-center w-full">
                        <div>
                          <span className="text-4xl">Cart</span>
                        </div>
                      </div>
                      <div id="CartItems" className="overflow-hidden lg:border-2 lg:border-t-0  lg:border-stone-700">
                        <div id="Cart" className="w-full">
                          <table className="w-full overflow-x-scroll" cellSpacing={120}>
                            <tr id="cartHeadings" className="h-[10vh] bg-stone-700 lg:flex flex-row flex-nowrap justify-evenly items-center hidden w-full">
                              <th>
                                <div id="SerialHeading" className="mx-1">
                                  <span className="text-white">S.No.</span>
                                </div>
                              </th>
                              <th>
                                <div id="SerialHeading" className="mx-1">
                                  <span className="text-white">Product</span>
                                </div>
                              </th>
                              <th>
                                <div id="SerialHeading" className="mx-1">
                                  <span className="text-white">Price</span>
                                </div>
                              </th>
                              <th>
                                <div id="SerialHeading" className="mx-1">
                                  <span className="text-white">Quantity</span>
                                </div>
                              </th>
                              <th>
                                <div id="SerialHeading" className="mx-1">
                                  <span className="text-white">Total Price</span>
                                </div>
                              </th>
                              <th>
                                <div id="SerialHeading" className="mx-1">
                                  <span className="text-white">Remove</span>
                                </div>
                              </th>
                            </tr>
                          </table>
                          {data.map((value, key) => (
                            <React.Fragment>
                              <div id="mobileViewCartItem" className="flex h-full p-1 lg:hidden">
                                <div id="ItemCard" className="flex flex-col w-full bg-gray-200 focus:bg-white focus:scale-110 transition-all duration-700 rounded-md"
                                >
                                  <div id="ImagexButton" className="flex flex-row justify-center items-center">
                                    <div id="image" className=" border-0 relative m-5 transition-all duration-600 my-4">
                                      <img
                                        src={value.get_product_data.ImageSrc}
                                        alt={value.get_product_data.product_name}
                                        className="w-full h-auto"
                                      />
                                    </div>
                                  </div>
                                  <div id="itemDetails" className="grid grid-cols-1 px-6 py-4 pb-1">
                                    <div>
                                      <div id="ProName" className="flex flex-row justify-start my-6 items-center ">
                                        <span id="label" className="text-md leading-4 mx-2 font-semibold">Product Name :</span>
                                        <span className="text-md leading-4 mx-2">
                                          {value.get_product_data.product_name.substring(0,10)}...
                                        </span>
                                      </div>
                                      <div id="ProPrice" className="flex flex-row justify-start my-6 items-center ">
                                        <span id="label" className="text-md leading-4 mx-2 font-semibold">Product Price :</span>
                                        <span className="text-md leading-4 mx-2 text-sky-500 font-bold">
                                          ${value.get_product_data.offer_price}
                                        </span>
                                      </div>
                                      <div id="ProQuantity" className="flex flex-row md:flex-row justify-start my-6 items-center">
                                          <div>
                                            <span id="label" className="text-md leading-4 mx-2 font-semibold">Product Qty :</span>
                                          </div>
                                          <div className="flex flex-row justify-start items-center">
                                            <div id="decreaseQuantity">
                                              {value.quantity == 1 ? (
                                                <Button disabled variant="text" color="primary" size="small" onClick={()=> {
                                                  decreaseQty(key , value.id)
                                                }}>
                                                  <span className="text-xl text-black">
                                                    -
                                                  </span>
                                                </Button>
                                              ) : (
                                                <Button variant="text" color="primary" size="small" onClick={()=> {
                                                  decreaseQty(key , value.id)
                                                }}>
                                                  <span className="text-xl text-black">
                                                    -
                                                  </span>
                                                </Button>
                                              )}
                                            </div>
                                            <div>
                                              <span className="text-md leading-4 mx-2">
                                                {value.quantity}
                                              </span>
                                            </div>
                                            <div id="increaseQty">
                                              {value.quantity == 10 ? (
                                                <Button disabled variant="text" color="primary" size="small" onClick={()=> {
                                                  increaseQty(key , value)
                                                }}>
                                                  <span className="text-xl text-black">
                                                    +
                                                  </span>
                                                </Button>
                                              ) : (
                                                <Button variant="text" color="primary" size="small" onClick={()=> {
                                                  increaseQty(key , value)
                                                }}>
                                                  <span className="text-xl text-black">
                                                    +
                                                  </span>
                                                </Button>
                                              )}
                                            </div>
                                          </div>
                                      </div>
                                      <div id="ProPrice" className="flex flex-row justify-start my-6 items-center">
                                        <span id="label" className="text-md leading-4 mx-2 font-semibold">Total Price :</span>
                                        <span className="text-md leading-4 mx-2 text-sky-500 font-bold">
                                          ${value.get_product_data.offer_price * value.quantity}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex justify-end items-end h-fit place-self-end">
                                      <div id="RemoveButton" className={`relative w-[15vw] m-5 bg-white rounded-md h-fit overflow-hidden transition-all duration-1000 flex justify-center items-center`}
                                      onClick={()=> {
                                        console.log("Remove button clicked")
                                        removeItem(value.id)
                                        setRemoveButton(true)
                                      }}>
                                        <IconButton>
                                          <RemoveShoppingCartTwoToneIcon/>
                                        </IconButton>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <table className="w-full overflow-x-scroll" cellSpacing={120}>
                                <tr id="cartItems" className="h-[10vh] bg-white lg:flex flex-row flex-nowrap justify-between items-center hidden w-full py-14">
                                  <div id="SerialNumber" className="w-full flex justify-center">
                                    <span className="text-sm md:text-md lg:text-lg font-light">
                                      {key+1}
                                    </span>
                                  </div>
                                  <div id="image" className="flex justify-start rounded-md my-4 w-full">
                                    <div>
                                      <img
                                        src={value.get_product_data.ImageSrc}
                                        alt={value.get_product_data.product_name}
                                        className="w-fit h-20"
                                      />
                                    </div>
                                  </div>
                                  <div id="price" className="flex justify-center w-[20vw] border-black my-3 py-2">
                                    <span className="text-lg font-medium text-sky-500">
                                      ${value.get_product_data.offer_price}
                                    </span>
                                  </div>
                                  <div id="cost" className="flex flex-row justify-center items-center w-full">
                                    <div className="w-full flex flex-row justify-center ">
                                      <span className="text-sm lg:text-md font-medium text-gray-500 mx-1">
                                        <div id="qtyUpdate" className="flex flex-row justify-center items-center">
                                          <div id="decreaseQuantity">
                                            {value.quantity == 1 ? (
                                              <Button disabled variant="text" color="primary" size="small" onClick={()=> {
                                                decreaseQty(key , value.id)
                                              }}>
                                                <span className="text-xl text-black">
                                                  -
                                                </span>
                                              </Button>
                                            ) : (
                                              <Button variant="text" color="primary" size="small" onClick={()=> {
                                                decreaseQty(key , value.id)
                                              }}>
                                                <span className="text-xl text-black">
                                                  -
                                                </span>
                                              </Button>
                                            )}
                                          </div>
                                          <div id="Qty">
                                            {value.quantity}
                                          </div>
                                          <div id="increaseQty">
                                            {value.quantity == 10 ? (
                                              <Button disabled variant="text" color="primary" size="small" onClick={()=> {
                                                increaseQty(key , value)
                                              }}>
                                                <span className="text-xl text-black">
                                                  +
                                                </span>
                                              </Button>
                                            ) : (
                                              <Button variant="text" color="primary" size="small" onClick={()=> {
                                                increaseQty(key , value)
                                              }}>
                                                <span className="text-xl text-black">
                                                  +
                                                </span>
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="w-full flex justify-center">
                                    <span className="text-lg font-medium text-sky-500">
                                    ${value.get_product_data.offer_price * value.quantity}
                                    </span>
                                  </div>
                                  <div id="RemoveButton" className="w-full flex justify-center ">
                                    <IconButton onClick={()=> {
                                      removeItem(value.id)
                                    }}>
                                      <RemoveShoppingCartTwoToneIcon/>
                                    </IconButton>
                                  </div>
                                </tr>
                              </table>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-100 flex flex-col h-fit w-full lg:w-[50vw]">
                      <div
                        id="costDetails"
                        className="border-2 border-white my-6 h-fit p-4 mx-2 col-span-4"
                      >
                        <div
                          id="details"
                          className="grid grid-cols-12 justify-between pr-4"
                        >
                          <div
                            id="names"
                            className="flex flex-col w-full col-span-9 overflow-hidden"
                          >
                            <ul>
                              <li className="font-light text-gray-600 my-0.5">
                                <span>Subtotal : </span>
                              </li>
                              <li className="font-light text-gray-600 my-0.5">
                                <span>3% Discount: </span>
                              </li>
                              <li className="font-light text-gray-600 my-0.5">
                                <span>18% Tax: </span>
                              </li>
                              <li className="border-white font-bold">
                                <span>Total: </span>
                              </li>
                            </ul>
                          </div>
                          <div
                            id="amount"
                            className="flex flex-col w-fit px-5 col-span-3 overflow-hidden"
                          >
                            <ul>
                              <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                                {rate}
                              </li>
                              <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                                <span>
                                  {discount}
                                </span>
                              </li>
                              <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                                <span>
                                  {tax}
                                </span>
                              </li>
                              <li className="border-white w-fit font-bold">
                                <span>
                                  {total.toFixed(2)}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="checkoutButton mx-1 h-full flex justify-center items-center  col-span-2">
                        <button 
                          className='flex hover:bg-white bg-black text-white hover:text-black transition duration-700 border-2 border-black font-extralight py-2 px-6 w-[8rem] items-center justify-center'
                          onClick={()=>{
                            if(localStorage.getItem("AT")) {
                              setCheckoutType('Checkout')
                              setInCheckoutType('addToCart')
                              window.scroll(0,0)
                            } else {
                              navigate("/login")
                            }
                          }}>
                            <span>Checkout</span>
                        </button>
                      </div>
                    </div>
                  </div>
              </React.Fragment>
            )}
          </div>
        </>
      ) : checkoutType === "Checkout" ? (
        <>
          <div className="m-2">
            <div className="bg-[#f5f5f7] w-[80vw] md:w-[60vw] lg:w-[30vw] mx-auto pt-7 pb-3 md:pt-10 md:pb-10 rounded-lg shadow-2xl mt-20 mb-20">
              <div id="AmountHead" className="text-center my-2">
                <span className="font-light text-4xl text-black font-Lato">Amount</span>
              </div>
              { inCheckoutType === "addToCart" ? (
                <>
                  <div id="contactForm" className="flex flex-row justify-between items-center border-2 mx-8 my-2">
                    <div id="head" className="px-5 w-fit ml-0">
                        <span className="font-light text-xl md:text-2xl text-black">
                          Enter contact details here :- 
                        </span>
                    </div>
                    <div className="my-2">
                        <div id="expandButton">
                          <Button variant="text" color="primary" size="large" onClick={()=>{
                            setExpandCForm(!expandCForm)
                          }}>
                            {expandCForm ? 
                            <>
                              <ExpandMoreIcon fontSize="large" color="secondary"/>
                            </> : 
                            <>
                              <ExpandLessIcon fontSize="large" color="secondary"/>
                            </>}
                          </Button>
                        </div>
                    </div>
                  </div>
                  <div className={`bg-transparent shadow-lg white overflow-hidden my-6 mx-8 z-50 ${expandCForm? "h-0" : "h-full" } transition-all duration-700` }>
                    <form className="px-2 pt-5">
                      <div id="name" className="px-2 m-2 mb-5">
                        <input
                          type="text"
                          placeholder="Name"
                          name="name"
                          className="w-full h-10 bg-white px-3"
                          value={userDetails.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div
                        id="addressDetails"
                        className="px-2 m-2 mb-5 flex flex-col"
                      >
                        <div id="address">
                          <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            className="w-full h-10 bg-white px-3 my-2"
                            value={userDetails.address}
                            onChange={handleChange}
                          />
                        </div>
                        <div id="cityState" className="flex flex-col md:flex-row">
                          <input
                            type="text"
                            placeholder="City"
                            name="city"
                            className="w-full h-10 bg-white px-3 my-2 md:mr-1"
                            value={userDetails.city}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="State"
                            name="state"
                            className="w-full h-10 bg-white px-3 my-2 md:ml-1"
                            value={userDetails.state}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div id="phoneEmail" className="px-2 m-2">
                        <input
                          type="text"
                          placeholder="Phone no."
                          name="phone"
                          className="w-full h-10 bg-white px-3 my-2"
                          value={userDetails.phone}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          placeholder="Email"
                          name="mail"
                          className="w-full h-10 bg-white px-3 my-2"
                          value={userDetails.mail}
                          onChange={handleChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div
                    id="costDetails"
                    className="my-6 h-fit p-4 mx-2 col-span-4"
                  >
                    <div
                      id="details"
                      className="flex flex-row justify-center pr-4"
                    >
                      <div
                        id="names"
                        className="flex flex-col w-[10em] col-span-6 overflow-hidden"
                      >
                        <ul className="flex flex-col">
                          <li className="font-semibold text-gray-600 my-0.5">
                            <span>Subtotal : </span>
                          </li>
                          <li className="font-semibold text-gray-600 my-0.5">
                            <span>3% Discount: </span>
                          </li>
                          <li className="font-semibold text-gray-600 my-0.5">
                            <span>18% Tax: </span>
                          </li>
                          <li className="border-white font-bold">
                            <span>Total: </span>
                          </li>
                        </ul>
                      </div>
                      <div
                        id="amount"
                        className="flex flex-col w-fit px-5 col-span-6 overflow-hidden"
                      >
                        <ul>
                          <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                              ${rate}
                          </li>
                          <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                            <span>
                            ${discount}
                            </span>
                          </li>
                          <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                            <span>
                              ${tax}
                            </span>
                          </li>
                          <li className="border-white w-fit font-bold">
                            <span>
                              ${total.toFixed(2)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div id="PayButton" className="flex justify-center mt-10 mb-10">
                    <button 
                      className='hover:bg-white bg-black text-white hover:text-black transition duration-700 border-2 border-black font-extralight py-2 px-6 mx-auto w-[10rem] my-2'
                      onClick={()=>{
                        let array = Object.values(userDetails);
                        if(Object.values(userDetails)) {
                          if(array.every( item => item != '' )) {
                            sendKeys(total * 100)
                            displayRazorpay()
                            emptyArrayOnCartPurchase()
                            window.scroll(0,0)
                          } else {
                            alert("Please fillout required fields!!")
                          }
                        } else {
                          alert("Something went wrong!!! line after 1010")
                        }
                      }}>
                        <span>Pay Now</span>
                    </button>
                  </div>
                </>
              ) : inCheckoutType === "buy" ? (
                <>
                  <div
                    id="costDetails"
                    className="h-fit p-4"
                  >
                    <div
                      id="details"
                      className="grid grid-cols-12 justify-between "
                    >
                      <div
                        id="names"
                        className="flex flex-col w-full col-span-6 overflow-hidden"
                      >
                        <ul>
                          <li className="font-light text-gray-600 my-0.5">
                            <span>Product Cost: </span>
                          </li>
                          <li className="font-light text-gray-600 my-0.5">
                            <span>Quantity: </span>
                          </li>
                          <li className="font-light text-gray-600 my-0.5">
                            <span>3% Discount: </span>
                          </li>
                          <li className="font-light text-gray-600 my-0.5">
                            <span>18% Tax: </span>
                          </li>
                          <li className="border-white font-bold">
                            <span>Total: </span>
                          </li>
                        </ul>
                      </div>
                      <div
                      id="amount"
                      className="flex flex-col w-full col-span-6 overflow-hidden"
                      >
                        <ul className="w-fit ml-auto px-3">
                          <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                            <span>${costObj.productCost}</span>
                          </li>
                          <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                            <span>
                              {count}
                            </span>
                          </li>
                          <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                            <span>
                              ${(costObj.discount * count).toFixed(2)}
                            </span>
                          </li>
                          <li className="font-medium text-gray-600 my-0.5 overflow-hidden">
                            <span>
                              ${(costObj.tax * count).toFixed(2)}
                            </span>
                          </li>
                          <li className="border-white w-fit font-bold">
                            <span>
                              ${costObj.totalCost.toFixed(2) * count}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div id="PayButton" className="flex justify-center mt-10 mb-10">
                    <button 
                      className='hover:bg-white bg-black text-white hover:text-black transition duration-700 border-2 border-black font-extralight py-2 px-6 mx-auto w-[10rem] my-2'
                      onClick={()=>{
                        sendKeys((costObj.totalCost * count) * 100)
                        displayRazorpay()
                        window.scroll(0,0)
                      }}>
                        <span>Pay Now</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  Some error occured
                </>
              ) }
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Buy;