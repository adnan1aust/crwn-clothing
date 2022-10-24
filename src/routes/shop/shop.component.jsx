import './shop.styles.scss';
import CategoriesPreview from "../categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import Category from '../category/category.component';

//REDUX
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCategoriesMap } from '../../store/category/category.action';

const Shop = () => {

    //REDUX
    const dispatch = useDispatch();
    useEffect(()=>{
        //addCollectionAndDocument('categories', SHOP_DATA)
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            dispatch(setCategoriesMap(categoryMap));
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