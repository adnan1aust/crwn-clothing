import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem: {name, imageUrl, price, quantity}, removeItemFromCart, cartItem, addItemToCart}) => {

    const removeAllSpecificItem = () => removeItemFromCart({...cartItem, quantity: 0});
    const removeItem = () => removeItemFromCart(cartItem);
    const addItem = () => addItemToCart(cartItem);

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItem}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItem}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={removeAllSpecificItem}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;