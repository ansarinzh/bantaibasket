import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import displayRazorpay from '../components/displayRazorpay';

var orderId;
function OrderScreen(props) {
  
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error, razorpay } = orderDetails;
  

  return loading ? <div className="loading"></div> : error ? <div>{error}</div> :

    <div>
      <noscript>{orderId=order._id}</noscript>
      <div className="placeorder">
        <div className="placeorder-info">
        <div>
          <h3>
            User Info 
          </h3>
          <div>
            Name: {userInfo.name} <br></br>
            Email Id: {userInfo.email}
          </div>
        </div>
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
              
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
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
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
                    
          </div>
          
                  :
                  order.orderItems.map(item =>
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
                          
                          Qty: {item.qty}<text>{item.unit}</text>
                        </div>
                      </div>
                      <div className="cart-price">
                      {item.selling_price} x {item.qty}{item.unit} =

                      {
                  item.unit==='Gram' || item.unit==='Gm' ?(<b className="product-price"> &#x20B9;{item.selling_price/4 * item.qty/250}</b>):null
                }
                {
                  item.unit==='KG' || item.unit==="Kg" || item.unit==="Pcs" || item.unit==="PCS" ?(<b className="product-price"> &#x20B9; {item.selling_price * item.qty}</b>):null
                }
            {/* console.log(order); */}



                      </div>
                    </li>
                  )
                  
                  
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {order.payment.paymentMethod==='razorpay' ? 
              !order.isPaid && <button id="btn" onClick={displayRazorpay} className="button">Pay with Razorpay</button>   :
              "PAY ON DELIVERY"             
              }
              
            </li>
            <li></li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>&#x20B9;{order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>Free Shipping</div>
            </li>
            {/* <li>
              <div>Tax</div>
              <div>{order.taxPrice}</div>
            </li> */}
            <li>
              <div>Order Total</div>
              <div>&#x20B9;{order.totalPrice}</div>
            </li>
          </ul>
        


        </div>

      </div>
    </div>

}



export default OrderScreen;
export {orderId};