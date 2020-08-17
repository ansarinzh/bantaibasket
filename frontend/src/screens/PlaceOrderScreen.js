import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import axios from 'axios';


function PlaceOrderScreen(props) {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const [email, setEmail] =useState('')
  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  // const itemsPrice = cartItems.reduce((a, c) => a + c.selling_price * c.qty, 0);
  //const shippingPrice = itemsPrice > 100 ? 0 : 10;
  //const taxPrice = 0.15 * itemsPrice;
  
  const CartCalc=()=>{
   
    var total=0;
    var gram=0;
    var kg=0;
   cartItems.map((data,i)=>{
    
     if(data.unit==="KG"){
       kg+=data.selling_price*data.qty
     }
     else if(data.unit==="gram"){
       gram+= ((data.selling_price*data.qty)/1000)
       console.log(gram,"gram");
     }else{
       return total;
     }
     return total;
   })
   total=gram+kg;
   return total
 }
 const itemsPrice =CartCalc();
 const totalPrice = itemsPrice ;
//  console.log(totalPrice);
 

  const dispatch = useDispatch();



  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  return <div>
    <script>

    </script>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping {userInfo.email}
          </h3>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
          {cart.shipping.postalCode}, {cart.shipping.country},
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
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
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <li>
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
                        Qty: {item.qty}<text>{item.unit}</text>
                      </div>
                      
                    </div>
                    <div className="cart-price">
                    &#x20B9;{item.selling_price}/Kg
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

      
      </div>
      <div className="placeorder-action">
        <ul>
          
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>&#x20B9;{CartCalc()}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>Free Shipping</div>
          </li>
          {/* <li>
            <div>Tax</div>
            <div>&#x20B9;{taxPrice}</div>
          </li> */}
          <li>
            <div>Order Total</div>
            <div>&#x20B9;{CartCalc()}</div>
          </li>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
        </ul>
      </div>
    </div>
  </div>

}

export default PlaceOrderScreen;
