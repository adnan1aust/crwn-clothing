import './directory-item.styles.scss';
import {  useNavigate } from 'react-router-dom';

const DirectoryItem = ({category : {title, imageUrl}}) => {
    const navigate = useNavigate();
    const redirectToPage = () => navigate(`/shop/${title}`)

    return(
    <div className="directory-item-container" onClick={redirectToPage}>
        <div className="background-image" style={{backgroundImage:`url(${imageUrl})`}}/>  {/*CSS Apply Rule*/}
        <div className="body">
            <h2>{title}</h2>
            <p>Shop Now</p>
        </div>
    </div>
    )
}

export default DirectoryItem;