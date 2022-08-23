import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux/Actions";
import axios from 'axios'

const Login = () => {
  var setFieldPosition
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setSidebarOn, setSidebarKey } = bindActionCreators(actionCreators, dispatch);

  const [ button , setButton ] = useState(true);
  const [ userID , setUserID ] = useState();
  const [ accessToken , setAccessToken ] = useState();
  const [login, setLogin] = useState({
    dialing_code: "",
    phone: "",
    otp: ""
  });

  const handleChangeLogin = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log("Login Information : ", login);
    postApi(login);
  };

  const postApi = async(login)=>{
    console.log("Fetching Login API");
    await axios.post('https://easybuy.servepratham.com/api/v2/login',login)
    .then((response)=> {
      localStorage.setItem("username" , response.data.data.user.name);
      console.log("Login API Fetched Successfully");
      setAccessToken(response.data.data.access_token);
      localStorage.setItem("AT" , response.data.data.access_token);
      setUserID(response.data.data.user.id);
      setButton(false)
    })
  }

  const otpVerify = async(event)=> {
    event.preventDefault();
    console.log("Verifying Otp and otp = ",login.otp)
    let _formData = new FormData()
    _formData.append("dialing_code",login.dialing_code)
    _formData.append("otp",login.otp)
    _formData.append("phone",login.phone)
    await axios.post('https://easybuy.servepratham.com/api/v2/otp/verify',_formData)
    .then(()=>{
      console.log("OTP Vefified Successfully");
    })
    .catch((err)=>{
      console.log(err);
      return <div className="w-full text-center p-2">
        <span className="text-xl text-red-500">
          OTP Verify Failed.... Please Enter correct OTP.
        </span>
      </div>
    })
    navigateToHome()
  }

  const navigateToHome = () => {
    if(typeof userID !== 'undefined' && typeof accessToken !== 'undefined') {
      navigate('/',{
        state:
        {
          token:accessToken,
          user_id: userID 
        }})
        setLogin({
          dialing_code: "",
          phone: "",
          otp: ""
        });
    } else {
       console.log("user id and at is undefined")
    }
  }

  if(button) {
    setFieldPosition = "-right-[50rem]"
  } else {
    setFieldPosition = "mx-auto"
  }
  return (
    <div id="login" className="bg-white h-fit lg:h-screen w-screen">
      <div id="grid" className="flex flex-col lg:grid grid-cols-12 h-fit my-16 lg:my-0 lg:h-full">
        <div id="loginForm" className="col-span-4 bg-white h-fit lg:h-full">
        <div
            id="Grid-1"
            className="bg-white saturate-200 flex flex-col items-center h-fit lg:h-full overflow-hidden"
          >
            <div
              id="Heading"
              className="lg:relative text-center lg:text-right w-full h-fit my-8 py-1.5 lg:px-20 top-28 lg:top-24"
            >
              <span className="text-black text-4xl lg:text-5xl font-light">JustBuyIt</span>
            </div>
            <div id="usernamePasswordform" className="h-fit w-[80vw] md:w-fit my-auto lg:ml-auto">
              <form id="LoginForm">
                <div id="Login" className="px-8 pb-20">
                  <div id="email" className="px-6 my-1.5">
                  <div id="userPwd" className="flex flex-col px-3">
                    <div id="userInput" className="px-3 my-1.5">
                      <input
                        type="text"
                        placeholder="Dialing Code"
                        className="bg-transparent focus:bg-gray-100 px-1.5 py-2 w-full border-b-4 border-gray-400 text-gray-400 focus:text-blue-500 focus:placeholder:text-black font-concertOne"
                        name="dialing_code"
                        value={login.dialing_code}
                        onChange={handleChangeLogin}
                      />
                    </div>
                    <div id="passwordInput" className="px-3 my-1.5">
                      <input
                        type="text"
                        placeholder="Enter phone"
                        className="bg-transparent focus:bg-gray-100 px-1.5 py-2 w-full border-b-4 border-gray-400 text-gray-400 focus:text-blue-500 focus:placeholder:text-black font-concertOne"
                        name="phone"
                        value={login.phone}
                        onChange={handleChangeLogin}
                      />
                    </div>
                    <div id="passwordInput" className={`relative px-3 my-1.5 ${setFieldPosition} duration-1000 transition-all ease-in-out w-full`}>
                      <input
                        type="text"
                        placeholder="Enter Otp"
                        className="bg-transparent focus:bg-gray-100 px-1.5 py-2 w-full border-b-4 border-gray-400 text-gray-400 focus:text-blue-500 focus:placeholder:text-black font-concertOne"
                        name="otp"
                        value={login.otp}
                        onChange={handleChangeLogin}
                      />
                    </div>
                  </div>
                  {button? (
                    <>
                      <div
                        id="verifyButton"
                        className="px-6 my-6 hidden justify-center"
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={otpVerify}
                        >
                          Sign In
                        </Button>
                      </div>
                      <div
                        id="loginButton"
                        className="px-6 my-6 justify-center flex"
                      >
                        <button
                          className="bg-black text-gray-300 p-4 w-full lg:w-[8vw] rounded-full font-bold leading-relaxed hover:scale-95 transition-all duration-1000 "
                          onClick={handleSignIn}
                        >
                          Verify
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        id="verifyButton"
                        className="flex px-6 my-6 justify-center"
                      >
                        <button
                          className="bg-black text-gray-300 p-4 w-full lg:w-[8vw] rounded-full font-bold leading-relaxed hover:scale-95 transition-all duration-1000 "
                          onClick={otpVerify}
                        >
                          Sign In
                        </button>
                      </div>
                      <div
                        id="loginButton"
                        className="px-6 my-6 justify-center hidden"
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleSignIn}
                        >
                          Verify
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="svg" className="col-span-8 bg-white hidden h-full lg:flex justify-center items-center">
            <div className="py-3">
              <img src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37372.jpg?t=st=1654768907~exp=1654769507~hmac=60f8db577c2f1c4b6bf6bce2febbdf68e700532055dcb0d7db9d7a1bd87a39ff&w=740" alt="loginImage" className="w-full h-auto"/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
