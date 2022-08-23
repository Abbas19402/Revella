import Cart from "../../Layouts/Drawers/Cart";
import LoginRegister from "../../Layouts/Drawers/LoginRegister";
import Search from "../../Layouts/Drawers/Search";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export const SideComponents = [
    {
        elementIndex: 0,
        elementId: "searchIcon",
        elementName: "Search",
        elementComponent: <Search/>,
        elementIcons: <SearchIcon/>
    },
    {
        elementIndex: 1,
        elementId: "cartIcon",
        elementName: "Cart",
        elementComponent: <Cart/>,
        elementIcons: <AddShoppingCartIcon/>
    },
]