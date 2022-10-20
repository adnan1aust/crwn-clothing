import { CategoriesContext } from "../../context/categories.context";
import { useContext } from "react";
import './shop.styles.scss';
import ProductCard from "../../components/product-card/product-card.component";
import { Fragment } from "react";

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => (
                    <Fragment key={title}>
                        <h2>{title.toUpperCase()}</h2>
                        <div className="products-container">
                            {
                                categoriesMap[title].map((product) => (
                                    <ProductCard key={product.id} product={product}/>
                                ))
                            }
                        </div>
                    </Fragment>
                ))
            }
        </Fragment>
    )
}
export default Shop;