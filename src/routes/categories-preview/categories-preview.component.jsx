/* import { CategoriesContext } from "../../context/categories.context"; */
/* import { useContext } from "react"; */
import CategoryPreview from "../../components/category-preview/category-preview.component";

//REDUX
import { selectCategoriesMap } from "../../store/category/category.selector";
import { useSelector } from "react-redux";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    //const { categoriesMap } = useContext(CategoriesContext);
    return (
        <>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} products={products} title={title}/>
                })
            }
        </>
    )
}
export default CategoriesPreview;