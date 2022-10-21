import { createContext, useReducer } from "react";

//HELPER FUNCTIONS
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
    if(existingCartItem){
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItems = (cartItems, productToRemove) => {
    if(productToRemove.quantity === 0){
        return cartItems.filter(item => item.id !== productToRemove.id);
    }
    const updatedCart = cartItems.map(cartItem => cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
    return updatedCart.filter(item => item.quantity > 0);
}

export const CartContext = createContext({
    cartItems : [],
    isCartOpen: true,
    cartCount : 0,
    total: 0,
    setIsCartOpen : () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
})

const INITIAL_STATE ={
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case 'SET_CART_ITEM':
            return {...state, ...payload}
        case 'TOGGLE_CART_VISIBILITY':
            return {...state, isCartOpen: !state.isCartOpen}
        default:
            throw new Error(`Unhandled type of ${type} in cart reducer`)
    }
}


export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {cartItems, isCartOpen, cartCount, total} = state;

    const updateCartItemReducer = (newCartItems) => {
        const numberOfItemsInCart = newCartItems.reduce((total, prev) => total + prev.quantity , 0);
        const total = newCartItems.reduce((total, item) => total + item.quantity * item.price , 0);
    
        dispatch({type: 'SET_CART_ITEM', payload: {cartItems: newCartItems, total: total, cartCount: numberOfItemsInCart}})
    }

    const toggleCartVisibilityReducer = () => {
        dispatch({type: 'TOGGLE_CART_VISIBILITY'})
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }

    const removeItemFromCart =(productToRemove) => {
        const newCartItems = removeCartItems(cartItems, productToRemove);
        updateCartItemReducer(newCartItems);
    }

    const setIsCartOpen = () => {
        toggleCartVisibilityReducer();
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount, total};
    return (<CartContext.Provider value ={value}>{children}</CartContext.Provider>)
}
