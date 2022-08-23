import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Login } from "@mui/icons-material";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../Redux/Actions/index";
import { useLocation } from "react-router-dom";

const LoginRegister = () => {
  const location = useLocation();
  const [ checkLoginInfo , setCheckLoginInfo ] = useState();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  console.log("Inside the LR component");
  const dispatch = useDispatch();
  const { setSidebarOn, setSidebarOf } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const handleChangeLogin = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };
  const handleSignIn = () => {
    console.log("Login information : ", login);
    // const checkUsername = location.state.loginInfo.userLoginInfo.username;
    // const checkPassword = location.state.loginInfo.userLoginInfo.password;
    console.log("Username from API = ",location)
    // console.log("Password from API = ",location.state.loginInfo.userLoginInfo.password)
    setLogin({
      username: "",
      password: "",
    });
  };
  return (
    <div className="z-40">
      <div id="Head" className="px-5 py-3">
        <span className="text-xl font-firaCode">Login</span>
      </div>
      <hr />
      <div id="loginRegisterFrom">        

            <form id="LoginForm">
          <div id="Login" className="p-4">
            <div id="LoginHead">
              <span className="text-lg font-medium">Login</span>
            </div>
            <div id="usernameInput" className="px-6 my-3">
              <input
                type="text"
                placeholder="Username"
                className="bg-slate-100 rounded-lg px-3 py-1.5 w-full"
                name="username"
                value={login.username}
                onChange={handleChangeLogin}
              />
            </div>
            <div id="passwordInput" className="px-6 my-3">
              <input
                type="password"
                placeholder="Password"
                className="bg-slate-100 rounded-lg px-3 py-1.5 w-full"
                name="password"
                value={login.password}
                onChange={handleChangeLogin}
              />
            </div>
            <div id="switchLRUI" className="px-6 my-3 flex flex-row flex-nowrap">
            <span>
                not a user? New Account
                <Link to="/register">
                <button 
              onClick={() => {
                setSidebarOf("-right-[90rem]");
                }}  
              className="text-blue-500 hover:underline mx-1"
              > here </button>
              </Link>
              </span>
            </div>
            <div id="loginButton" className="px-6 my-3 flex justify-end">
              <Button variant="outlined" color="primary" onClick={handleSignIn}>
                Sign In
              </Button>
            </div>
          </div>
        </form> 
      </div>
    </div>
  );
};

export default LoginRegister;
