import { CART_ACTION_TYPES } from "./cart.types";
import {createAction} from '../../utils/reducer/reducer.utils';

export const setIscatOpen = () => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart =(cartItems, productToRemove) => {
    const newCartItems = removeCartItems(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const setIsCartOpen = () => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN)
}

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