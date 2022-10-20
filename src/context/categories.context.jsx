import { createContext, useState, useEffect } from "react";
/* import SHOP_DATA from "../routes/shop/shop-data.js";
import { addCollectionAndDocument } from "../utils/firebase/firebase.utils.js"; */
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    products: [],
    setProducts : () => {}
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setcategoriesMap] = useState({});

    useEffect(()=>{
        //addCollectionAndDocument('categories', SHOP_DATA)
        const getCategoriesMap = async () => {
             const categoryMap = await getCategoriesAndDocuments();
             setcategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []) 


    const value ={categoriesMap, setcategoriesMap};
    return(<CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>)
}