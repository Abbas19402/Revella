// ****** Reducers ******
export const dropNavReducer = (state=0 , action)=> {
    if(action.type === 'dropNavHeightOn') {
        return "top-1"
    } else if (action.type === 'dropNavHeightOf') {
        return "-top-[50rem]"
    } else {
        return "-top-[50rem]"
    }
}
export const trendReducer = (state=8, action)=> {
    if(action.type === 'loadData') {
        return action.payload + state
    } else if(action.type === 'reduceData') {
        return action.payload - state
    } else {
        return state
    }
}
export const sidebarReducer = (state="-right-[90rem]", action) => {
    if(action.type === 'sidebarOn') {
        return action.payload
    } else if (action.type === 'sidebarOf') {
        console.log("4")
        return action.payload
    } else {
        return state
    }
}
export const sideKeyReducer = (state=" ",action) => {
    if(action.type === 'sideKey' ) {
        console.log("3")
        return action.payload
    } else {
        return state
    }
}
export const setProductReducer = (state = 0 , action) => {
    if(action.type === 'setProduct') {
        console.log("2")      
        return action.payload
    } else {
        return state
    }
}
export const setCC = (state = 0 , action )=> {
    if(action.type === 'cartTotalCost'){
        return action.payload + state
    } else {
        return state
    }
}
const INIT_STATE = {
    cartArray: [],
    filteredArray: []
}
const BACKUP_STATE = {
    cartArray:[]
}
export const cartReducer = (state = INIT_STATE  , action )=> {
    if(action.type === 'cartArray') {
        state.cartArray=[...state.cartArray , action.payload];
        return state
    } else {
        return state
    }
}
export const switchCartReducer = (state = "" , action) => {
    if(action.type === 'switch') {
        return action.payload
    } else {
        return state
    }
}
export const addCartQty = (state=0 , action) => {
    if(action.type === 'iQty') {
        return action.payload
    } else {
        return state
    }
}