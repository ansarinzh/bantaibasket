import React from 'react';
import { Link } from 'react-router-dom';





function AboutUs(){

  var loading;
  var error;
    return (
        <>
        <div>
          <div className="back-to-result">
            <Link to="/">&laquo; Back</Link>
          </div>
          {loading ? (
            <div className="loading"></div>
          ) : error ? (
            <div>{error} </div>
          ) : (
              
              <div className="container">
                  
                 <h4> About us</h4>
                  <div className="heading-about text-center">
                   <h2 style={{color:'#669900'}}>  Bantai Basket </h2>
                  </div>
                  <div style={{color:'#669900', fontFamily:'Charcoal', fontSize: '18px'}}>
                    <p>
                      Bantai Basket is a Mumbai Based Grocery delivery service aimed to provide fresh and healthy products to our customers. All our products are directly sourced from farmers near to the city providing an opportunity for the farmers to sell directly to you.
                    </p>
                    <p>
                      We started our business with passion to provide direct connection from our farmers to customers.
                    </p>
                    <p>
                      We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                    </p>
                    <p>
                      Sincerly,
                    </p>
                    <p>
                      Bantai Basket Team
                    </p>
                  </div>
                  <div style={{color:'#669900', fontFamily:'Charcoal', fontSize: '18px'}}>
                    <h3>
                      How to order products
                    </h3>
                    <b>01. BROWSE OUR PRODUCTS</b>
                    <p>
                      Select the products from our bantaibasket.com shop page or search them on the search bar.
                    </p>
                    <b>02. ADD ITEM</b>
                    <p>
                      Click on add to cart for the desired products. You will find a list of all added products in your cart on the top right corner. Go to cart to specify quantity of your desired products.
                    </p>
                    <b>03. DELIVERY</b>
                    <p>
                      Select delivery address and payment method, you can also pay via Cash On Delivery. You can also pick a convenient time of delivery and place the order. Use My Account section to track your delivery. You can also contact us from our contact us page to get more detailed information.
                    </p>
                  </div>
                  <div style={{color:'#669900', fontFamily:'Charcoal', fontSize: '18px'}}>
                    <b>Have a good time shopping with us </b>
                    <p>WE ARE ALWAYS HAPPY TO HELP YOU </p>
                    <p>For any Queries contact us at bantaibasket@gmail.com </p>
                  </div>
              </div>
              
            )}
            </div>
            </>
          );
}
export default AboutUs;