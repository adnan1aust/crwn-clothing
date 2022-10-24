import './shop.styles.scss';
import CategoriesPreview from "../categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import Category from '../category/category.component';

//REDUX
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import {setCategories} from './../../store/category/category.action'

const Shop = () => {

    //REDUX
    const dispatch = useDispatch();
    useEffect(()=>{
        //addCollectionAndDocument('categories', SHOP_DATA)
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesArray));
        }
        getCategoriesMap();
    }, [dispatch]) 

    return(
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
        </Routes>
    )
}
export default Shop;