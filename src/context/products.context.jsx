import { createContext, useState } from "react";
import PRODUCTS from '../routes/shop/shop-data.json';

export const ProductContext = createContext({
    products: [],
    setProducts : () => []
})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value ={products, setProducts};
    return(<ProductContext.Provider value={value}>{children}</ProductContext.Provider>)
}