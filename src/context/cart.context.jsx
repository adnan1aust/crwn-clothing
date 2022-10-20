import { createContext, useState, useEffect } from "react";

//helper funtion
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
    isCartOpen: false,
    setIsCartOpen : () => {},
    cartItems : [],
    addItemToCart: () => {},
    cartCount : 0,
    removeItemFromCart: () => {},
    total: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [ total, setTotal ] = useState(0);

    useEffect(()=>{
        const numberOfItemsInCart = cartItems.reduce((total, prev) => total + prev.quantity , 0)
        setCartCount(numberOfItemsInCart)

        const total = cartItems.reduce((total, item) => total + item.quantity * item.price , 0)
        setTotal(total);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart =(productToRemove) => {
        setCartItems(removeCartItems(cartItems, productToRemove))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount, total};
    return (<CartContext.Provider value ={value}>{children}</CartContext.Provider>)
}
