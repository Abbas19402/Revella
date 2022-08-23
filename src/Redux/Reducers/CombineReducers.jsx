import { combineReducers } from "redux";
import { dropNavReducer } from "./reducer";
import { trendReducer } from "./reducer";
import { sidebarReducer } from "./reducer";
import { sideKeyReducer } from "./reducer";
import { setProductReducer } from "./reducer";
import { cartReducer } from "./reducer";
import { setCC } from "./reducer"
import { switchCartReducer } from "./reducer"
import { addCartQty } from "./reducer";

const reducers = combineReducers({
    dropNavReducer ,
    trendReducer , 
    sidebarReducer, 
    sideKeyReducer, 
    setProductReducer,
    cartReducer, 
    setCC,
    switchCartReducer,
    addCartQty
})

export default reducers