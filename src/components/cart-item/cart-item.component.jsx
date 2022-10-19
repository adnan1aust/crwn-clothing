import './cart-item.styles.scss';

const CartItem = ({cartItem : {name, quantity, imageUrl, price}}) => 
    (<div className='cart-item-container'>
        <img src={imageUrl} alt={name}/>
        <div className='item-details'>
            <span className='name'>{name}</span>
            <span className='price'>{quantity} X ${price}</span>
        </div>
    </div>);

export default CartItem;