import React, { useEffect, useState } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartScreen(props) {
  
  const cart = useSelector(state => state.cart);
  var countInStock;
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }
     
  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Cart
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              <div className="no-item">No items in your Basket</div>
              <Link to="/"  className="btn-shopping">Start Shopping Now!</Link>
          </div>
            :
            cartItems.map((item) => (
          
              <li key={item._id}>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Qty:                   
                      <div>
                      <input type="number" className="input-qty" value={item.qty} onChange={(e) => dispatch(addToCart(item.product,e.target.value))} disabled >
                      </input>                      
                      <text>{item.unit}</text>
                    </div>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                      Delete
                    </button>
                  </div>
                </div>
              <div className="cart-price">&#x20B9;{item.selling_price}</div>
              </li>
            ))
        }
      </ul>
    </div>
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + '-' + c.qty, 0)} items)
        :
        &#x20B9;  {cartItems.reduce((a, c) => a + c.selling_price * c.qty, 0)} 
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>
    
    </div>
      
  </div>
}

export default CartScreen;