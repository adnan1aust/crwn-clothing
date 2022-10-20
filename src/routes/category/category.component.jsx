import './category.styles.scss';
import { useParams} from 'react-router-dom';
import { useContext } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { useState, useEffect } from 'react';

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [ category, categoriesMap])

    return(
        <>
        <h2 className='title-item'>{category.toUpperCase()}</h2>
        <div className='category-container'> 
            {
               products && products.map((product)=> <ProductCard product={product} key={product.id}/>)
            }
        </div>
        </>
    )
}

export default  Category;