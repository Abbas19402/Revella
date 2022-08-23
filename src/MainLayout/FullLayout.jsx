import React from "react";
import Navbar from "../Layouts/Navbar";
import SwitchComponent from "../Layouts/SwitchComponent";
import Footer from "../Layouts/Footer";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../Redux/Actions/index";
import { useSelector } from "react-redux";
import { SideComponents } from "../Assets/Apis/sidebarApi";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const FullLayout = ()=> {

  const showSidebar = useSelector((state) => state.sidebarReducer);
  const sideKey = useSelector((state) => state.sideKeyReducer);
  const dispatch = useDispatch();
  const { setSidebarOn, setSidebarOf, setSidebarKey } = bindActionCreators(
    actionCreators,
    dispatch
  );
  
  // <--- Menu States --->
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const openn = Boolean(anchorEl1);
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };
  
  return (
    <>
      <div className="relative overflow-x-hidden h-fit">
        <div id="navbar" className="h-20 w-full">
          <Navbar />
        </div>
        <div id="switchComponent" className="relative h-fit">
          <SwitchComponent />
        </div>
        <div id="footer" className="relative h-fit -bottom-full mb-14 md:mb-0">
          <Footer />
        </div>
      </div>
      <div id="sidebar">
        <div className={`fixed overflow-hidden h-[100vh] overflow-y-scroll md:w-[75vw] lg:w-[40vw] w-[75vw] top-0 border-2 bg-white z-40 ${showSidebar} duration-1000 transition-all`}>
          {SideComponents.map((ele) =>
            ele.elementIndex === sideKey ? ele.elementComponent : " "
          )}
          <Button
            onClick={() => {
              setSidebarOf("-right-[50rem]");
            }}
            sx={{ position: "absolute", top: "8px", right: "6px" }}
          >
            <CloseIcon />
          </Button>
        </div>
      </div>
      <div
        id="iconsTray"
        className="z-50 fixed bottom-0 lg:hidden lg:landscape:hidden overflow-hidden mx-auto my-1 flex px-1 w-full "
      >
        <ul className="flex flex-row bg-white justify-between items-center p-2 md:p-4 w-full rounded-lg shadow-2xl shadow-black">
          {SideComponents.map((ele, key) => (
            <li id={ele.elementId}>
              <IconButton
                onClick={() => {
                  setSidebarOn("right-0");
                  setSidebarKey(key);
                }}
              >
                {ele.elementIcons}
              </IconButton>
            </li>
          ))}
          <li id="Wishlist/Favorite">
            <Link to="/wish">
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </Link>
          </li>
          <li id="Profile">
            <IconButton
              id="basic-menu"
              aria-controls={openn ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openn ? 'true' : undefined}
              onClick={handleClick}
            >
              <AccountBoxIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl1}
              open={openn}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {localStorage.getItem("AT") ? (
                // When user is logged In
                <>
                  <MenuItem>
                    <>
                      <div className="flex flex-row justify-evenly items-center">
                        <div id="profileIcon">
                          <AccountCircleIcon/>
                        </div>
                        <div id="profileName" className="mx-2">
                          <span className="font-concertOne text-neutral-700">{localStorage.getItem("username")}</span>
                        </div>
                      </div>
                    </>
                  </MenuItem>
                  <MenuItem onClick={()=> {
                    localStorage.clear("AT")
                    handleClose()
                  }}>Logout</MenuItem>
                </>
              ) : (
                // When user is logged Out
                <Link to="/login" onClick={handleClose}>
                  <MenuItem>
                    <span>Login</span>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FullLayout;
