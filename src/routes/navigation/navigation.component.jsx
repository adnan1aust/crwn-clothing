import './navigation.styles.scss';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen} = useContext(CartContext);
    const signOUtHander = async () => {
        await signOutUser();
    }

    const toggleCartVisibility = () => setIsCartOpen(!isCartOpen);

    return(
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <div><CrwnLogo className='logo'/></div>
                </Link>
                <div className='nav-links-container'>
                    {currentUser &&  <span>Welcome {currentUser.displayName}</span>}
                    <Link className='nav-link' to='/shop'>
                        Shop
                    </Link>
                    <span className='nav-link'>
                        {currentUser ? <span onClick={signOUtHander}>Sign Out</span> : <Link className='nav-link' to='/auth'>Sign In</Link>}
                    </span>
                    <span onClick={toggleCartVisibility}><CartIcon/></span>
                </div>
                {isCartOpen && <CartDropDown/>}
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;