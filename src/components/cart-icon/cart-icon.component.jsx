import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { CartContext } from '../../context/cart.context';
import { useContext } from 'react';

const CartIcon = () => {
    const { cartItems } = useContext(CartContext);
    const numberOfItemsInCart = cartItems.reduce((total, prev) => total + prev.quantity , 0)
    return(
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{numberOfItemsInCart}</span>
        </div>
    )
}

export default CartIcon;