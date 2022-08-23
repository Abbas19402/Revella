import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import Loader from "../../Assets/Loader";
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

const Product = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ****** API & API States ******
  const [ data , setData ] = useState();
  const [ loading , setLoading ] = useState(true)
  const [ count, setCount ] = useState(1);

  // ****** Modal States ******
  const [ showClearCartModal , setShowClearCartModal ] = useState(false);
  const [open, setOpen] = useState(false);
  const [ errorMessage , setErrorMessage ] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickSnackBar = () => {
    console.log("Triggered SnackBar Function");
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const getDataWithSearch = async()=> {
    console.log("Get data with search called!!");
    await axios({
      url: `https://admin.nily.com.br/api/v2/user/productById/${location.state.data.id}`,
      method: "GET"
    })
    .then((res)=>{
      console.log(res)
      setData(res.data.data.product)
      setLoading(false)
    })
    .catch((err)=> {
      console.log(err)
    }) 
    
  }

  const getData = async() => {
    await axios({
      url: `https://admin.nily.com.br/api/v2/user/productById/${location.state.data.id}`,
      method: "GET"
    })
    .then((res)=>{
      console.log(res)
      setData(res.data.data.product)
      setLoading(false)
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if(location.state.comingFrom === 'search') {
      console.log("Coming from = search");
      getDataWithSearch();
    } else {
      console.log(location)
      getData();
    }
  }, []);
  
  if(loading) {
    return (
      <Loader/>
    )
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  let _formData=new FormData();
  _formData.append('vendor_id',data.vendor.id);
  _formData.append('product_id',data.id);
  _formData.append('quantity', 1)
  _formData.append('orignal_price', data.price)
  _formData.append("offer_price" , data.offer_price);
  _formData.append("session_id" , 138)
  
  const buy = ()=> {
    if(localStorage.getItem("AT")) {
      console.log("Data = ",location.state.data)
      navigate('/buy',{state:{
        value: location.state.data,
        valueCost: location.state.data.offer_price,
        qty: count,
        pageSection: 'buy'
      }})
    } else {
      navigate('/login')
    }
    
  }

  const refreshPage = ()=> {
    window.location.reload();
  }

  const addCart = async()=> {
    // API Way -->
    await axios.post("https://admin.nily.com.br/api/v2/user/cart/save" ,_formData )
    .then((res)=> {
      console.log("Response = ",res);
      setData(res)
      navigate("/buy",{state: {  
        qty: count,
        pageSection: 'addToCart'
      }})
      refreshPage();
    })
    .catch((err)=> {
      console.log(err);
      setShowClearCartModal(true)
      handleOpen()
      setErrorMessage(err.response.data.errors)
    })
  }

  const sellorNotSame = async()=> {
    await axios.post("https://admin.nily.com.br/api/v2/user/cart/seller-not-same",_formData)
    .then(()=>{
      console.log("Other Items are removed Successfully!")
    })
    .catch((err)=> {
      console.log(err);
    })
  }

  return (
    typeof data!=='undefined' &&
    <div>
      <div id="product" className="overflow-hidden bg-slate-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-screen h-fit p-14 my-24 items-center">
          <div>
            <div id="Image" className='flex flex-col justify-center bg-white rounded-lg'>
              <div id="productimage" className='p-10 overflow-hidden'>
                <img src={data.ImageSrc} alt={data.id} className='h-[30vh] mx-auto'/>
              </div>
            </div>
          </div>
          <div id="Details" className='px-2 md:px-10 lg:px-12'>
            <div id="ProductTitle" className='relative mx-1'>
              <span className='text-2xl font-semibold '>{data.product_name}</span>
            </div>
            <div id="productPrice" className=' my-3 flex flex-row'>
              <div id="offerPrice" className='mx-2'>
                <span className='text-zinc-600 text-3xl'>${data.offer_price}</span>
              </div>
              <div id="orignalPrice" className='mx-2'>
                <span className='text-zinc-600 text-3xl line-through'>${data.price}</span>
              </div>
            </div>
            <div id="productDescription" className='m-2'>
              <span className='text-md font-medium text-gray-500'>{data.short_desc}</span>
            </div>
            <div id="button" className="flex flex-col lg:flex-row justify-center w-fit mx-auto md:mx-0 md:justify-around mt-4">
              <button 
                className='hover:bg-white bg-black text-white hover:text-black transition duration-700 border-2 border-black font-extralight py-2 px-6 mx-2 w-[10rem] my-2'
                onClick={()=>{
                  buy()
                }}>
                  <span>Buy</span>
              </button>
              <button 
                className='hover:bg-white bg-black text-white hover:text-black transition duration-700 border-2 border-black font-extralight py-2 px-6 mx-2 w-[10rem] my-2'
                onClick={()=>{
                  addCart()
                }}>
                  <span>Add to Cart</span>
              </button>
            </div>
            <div id="cartClearModal">
            {showClearCartModal ? (
              <>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className='w-fit h-[15vh] flex text-justify items-center px-10 my-2'>
                        <span className='text-lg font-medium text-red-700'>{errorMessage}</span>
                    </div>
                    <div id="buttons" className='relative bottom-0 flex flex-row justify-end'>
                      <div id="buttons" className='mx-3'>
                        <Button variant='outlined' onClick={handleClose}>Close</Button>
                      </div>
                      <div id="buttons">
                        <Button variant='outlined' onClick={()=> {
                          handleClose();
                          handleClickSnackBar();
                          sellorNotSame();
                        }}>Remove & Add</Button>
                      </div>
                    </div>
                  </Box>
                </Modal>

                <div>
                  <Snackbar
                    open={openSnackBar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackBar}
                    message="Items From Cart removed Successfully"
                    action={action}
                  />
                </div>
              </>
            ) : (
              <>
                <div className='hidden'>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div>Hello this is a modal</div>
                    </Box>
                  </Modal>
                </div>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product