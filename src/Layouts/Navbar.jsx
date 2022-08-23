import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Turn as Hamburger } from "hamburger-react";
import { navbarArray } from "../Assets/Apis/NavbarArray";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../Redux/Actions/index";
import { useSelector } from "react-redux";
import { useState } from "react";
import { SideComponents } from "../Assets/Apis/sidebarApi";
import Popover from "@mui/material/Popover";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../Assets/Images/Logos/logo.png'

const Navbar = () => {
  const [ userName , setUserName ] = useState();  

  const dropNav = useSelector((state) => state.dropNavReducer);
  const showSidebar = useSelector((state) => state.sidebarReducer);
  console.log(dropNav);
  const dispatch = useDispatch();
  const { DropNavigationOn, DropNavigationOf, setSidebarOn, setSidebarOf, setSidebarKey } =
    bindActionCreators(actionCreators, dispatch);

  // <--- States --->
  const [globalKey, setGlobalKey] = useState("");
  const [active, setActive] = useState("");
  const [activeColor, setActiveColor] = useState({});
  const [showNav, setShowNav] = useState(false);
  const [isOpen, setOpen] = useState(false);

  // <--- popoverStates --->
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event, index) => { 
    setAnchorEl(event.currentTarget);
    setGlobalKey(index);
  };
  const handlePopoverClose = (event) => {
    setAnchorEl(null);
  };

  // <--- Menu States --->
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const openn = Boolean(anchorEl1);
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };

  const open = Boolean(anchorEl);

  const Active = (index) => {
    DropNavigationOf("-top-96");
    setOpen(false);
    setShowNav(false);
    navbarArray.map((ele, key) => {
      if (index === key) {
        setActive(true);
        setActiveColor({ data: `bg-gray-200`, id: key });
      }
    });
  };

  const colNav = () => {
    showNav ? DropNavigationOf("-top-[90rem]") : DropNavigationOn("top-1") && setShowNav(!showNav);
  };

  return (
    <div
      className={`relative bg-white h-full flex flex-row justify-between items-center`}
    >
      <div id="ham" className="mx-3 block lg:hidden z-50">
        <button
          onClick={() => {
            setShowNav(!showNav);
            colNav();
          }}
        >
          <Hamburger
            size={25}
            rounded
            duration={0.7}
            toggle={setOpen}
            toggled={isOpen}
            color={"gray"}
          />
        </button>
      </div>
      <div
        id="contents"
        className="items-center grid w-fit p-3 h-full basis-1/4"
      >
        <div id="logo" className="hidden lg:block">
          <Link to="/">
            <div id="textLogo" className="overflow-hidden">
              <img src={Logo} alt="justbuyit" className="bg-white w-[6em]"/>
              {/* <span className="text-xl md:text-2xl lg:text-3xl font-Lato">JustBuyIt</span> */}
            </div>
          </Link>
        </div>
      </div>
      <div id="Nav" className="basis-1/2 items-center">
        <nav>
          <ul className="mx-6 hidden lg:flex flex-row flex-nowrap justify-center">
            {navbarArray.map((ele, keyin) => (
              <li
                key={ele.navId}
                className={`mx-3 font-light text-black hover:cursor-pointer hover:scale-105 transition-all p-1 hover:text-gray-500 hover:font-normal rounded-md
                ${
                  active && activeColor.id === keyin
                    ? `${activeColor.data}`
                    : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  handlePopoverOpen(event, keyin);
                }}
                onDoubleClick={(event)=> {
                  event.preventDefault();
                  handlePopoverClose(event)
                }}
              >
                  {ele.navName}
              </li>
            ))}
          </ul>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none"
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            
            disableRestoreFocus
          >
            {navbarArray.map((ele) =>
              ele.navId - 1 === globalKey ? ele.navElementName : ""
            )}
          </Popover>
        </nav>
        {/* <--- Collapsed Navbar ---> */}
        <div
          id="dropDownNavigation"
          className={`bg-white absolute w-screen ${dropNav} left-0 z-40 transition-all duration-1000 border-b-2 border-b-gray-500`}
        >
          <div
            className={`grid justify-items-center items-center bg-transparent h-full px-1 p-7`}
          >
            <div
              className={`px-14 flex flex-col p-5 items-center justify-items-center h-full w-full rounded-md`}
            >
              {navbarArray.map((ele, keyin) => (
                <div
                  key={ele.navId}
                  className={`my-1 p-1 font-normal text-xl text-yellow-600 w-full text-start rounded-sm ${
                    active && activeColor.id === keyin
                      ? `${activeColor.data}`
                      : ""
                  } `}
                  onMouseEnter={(event) => {
                    handlePopoverOpen(event, keyin);
                  }}
                  onMouseLeave={handlePopoverClose}
                >
                  <span>{ele.navName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <--- / of Collapsed Navbar ---> */}
      </div>
      <Link to="/">
        <div id="logo" className="lg:hidden flex w-full justify-end px-4">
          <div id="textLogo" className="overflow-hidden">
            <img src={Logo} alt="justbuyit" className="bg-white w-[6em]"/>
          </div>
        </div>
      </Link>
      <div
        id="drawerIcons"
        className="basis-1/4 w-fit h-full justify-end hidden lg:block"
      >
        <ul className="h-full flex flex-row justify-end items-center z-50">
          {SideComponents.map((ele, key) => (
            <li id={ele.elementId}>
              <IconButton
                onClick={() => {
                  setSidebarOn("right-0")
                  setSidebarKey(key)
                }}
              >
                {ele.elementIcons}
              </IconButton>
            </li>
          ))}
          <li id="Wishlist/Favorite">
            <Link to = "/wish">
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
    </div>
  );
};

export default Navbar;
