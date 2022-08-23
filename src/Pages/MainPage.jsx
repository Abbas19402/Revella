import React, { useEffect } from "react";
import BestSeller from "./views/BestSeller";
import BlogComponent from "./views/BlogComponent";
import GridBanner from "./views/GridBanner";
import ItemsGrid from "./views/ItemsGrid";
import Trending from "./views/Trending";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../Redux/Actions/index";
import { SideComponents } from "../Assets/Apis/sidebarApi";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

const MainPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { setSidebarOn, setSidebarKey } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect (()=>{
    console.log(location)
    window.scrollTo(0, 0)
  },[])

  const render = value => {
    navigate('/product',{state:{
      data: value,
    }})
  }
  return (
    <React.Fragment>
      <div className="justify-items-center items-center scroll-smooth">
        <div
          id="iconsTray"
          className="z-50 fixed bottom-0 bg-white w-full lg:hidden lg:landscape:hidden overflow-hidden "
        >
          <ul className="flex flex-row justify-between items-center p-2 md:p-4">
            {SideComponents.map((item, key) => (
              <li id={item.elementId}>
                <IconButton
                  onClick={() => {
                    setSidebarOn("right-0");
                    setSidebarKey(key);
                  }}
                >
                  {item.elementIcons}
                </IconButton>
              </li>
            ))}
            <li id="Wishlist/Favorite">
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </li>
          </ul>
        </div>

        <div
          id="banner"
          className="w-screen overflow-y-hidden  bg-slate-100 h-fit"
        >
          <img
            src="https://img.freepik.com/free-vector/discount-banner-with-yellow-shopping-cart-black-gift-bags-realistic-style-vector-illustration_548887-102.jpg?t=st=1648790923~exp=1648791523~hmac=9a05dc140c5d13508bf136002abcec7788afaa37297831ce0cb499433b7f3d07&w=826"
            alt="banner"
            className="mx-auto"
            width="auto"
          />
        </div>
        <div id="itemsGrid">
          <ItemsGrid />
        </div>
        <div id="trending">
          <Trending onclick={render}/>
        </div>
        <div id="grid">
          <GridBanner />
        </div>
        <div id="Best Seller">
          <BestSeller onclick={render}/>
        </div>
        <div id="Blog">
          <BlogComponent />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainPage;
