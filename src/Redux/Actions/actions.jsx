export const DropNavigationOn = (height)=> {
    return {
        type: "dropNavHeightOn",
        payload: height
    }
}
export const DropNavigationOf = (height)=> {
    return {
        type: "dropNavHeightOf",
        payload: height
    }
}
export const LoadTrendData = (num)=> {
    return {
        type: "loadData",
        payload: num
    }
}
export const ReduceTrendData = (num)=> {
    return {
        type: "reduceData",
        payload: num
    }
}
export const setSidebarOn = (value)=> {
    return {
        type: "sidebarOn",
        payload: value
    }
}
export const setSidebarOf = (value)=> {
    return {
        type: "sidebarOf",
        payload: value
    }
}
export const setSidebarKey = (index)=> {
    return {
        type: "sideKey",
        payload: index
    }
}
export const callProduct = (object)=> {
    return {
        type: "setProduct",
        payload: object
    }
}
export const setCartTotal = (cost)=> {
    return {
        type: "cartTotalCost",
        payload: cost
    }
}
export const cartRedux = (array)=> {
    console.log("CartRedux = ",array)
    return {
        type: 'cartArray',
        payload: array
    }
}
export const switchBuyPage = (pageType) => {
    return {
        type: 'switch',
        payload: pageType
    }
}
export const addQuantity = (qty) => {
    return {
        type : 'iQty',
        payload: qty
    }
}