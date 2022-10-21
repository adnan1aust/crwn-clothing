import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
/* import { UserContext } from '../../context/user.context'; */
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';
import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles';

/* Redux */
 import { useSelector} from 'react-redux';

const Navigation = () => {
    //const { currentUser } = useContext(UserContext);
    const currentUser = useSelector(state => state.user.currentUser)
    const { isCartOpen, setIsCartOpen} = useContext(CartContext);
    const signOUtHander = async () => {
        await signOutUser();
    }

    const toggleCartVisibility = () => setIsCartOpen(!isCartOpen);

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <div><CrwnLogo className='logo'/></div>
                </LogoContainer>
                <NavLinks>
                    {currentUser &&  <span>Welcome {currentUser.displayName}</span>}
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    <NavLink as='span'>
                        {currentUser ? <span onClick={signOUtHander}>Sign Out</span> : <NavLink to='/auth'>Sign In</NavLink>}
                    </NavLink >
                    <span onClick={toggleCartVisibility}><CartIcon/></span>
                </NavLinks>
                {isCartOpen && <CartDropDown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;