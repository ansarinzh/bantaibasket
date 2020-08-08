import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import RelatedProductScreen from './screens/RelatedProductScreen';
import Footer from './components/footer';
import AboutUs from './screens/aboutus';

function loadScript(src){
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };


  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776; </button>
            <Link to="/"><img src="images/logo1.png" className="logo"/></Link>
          </div>
          <div className="header-links">
            <Link to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true" ></i></Link>
            {userInfo ? (
              <Link to="/profile"><i class="fa fa-user-circle-o" aria-hidden="true"></i> {userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="nav-categories">
            <li>
              <Link to="/"><i class="fa fa-home" aria-hidden="true"></i> &nbsp;Home</Link>
            </li>

            
            <li>
            <div className="mobile-header-links" >
            <Link to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true" ></i>&nbsp; Cart </Link>
            {userInfo ? (
              <Link to="/profile"><i class="fa fa-user-circle-o" aria-hidden="true"></i> {userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="mobile-dropdown">
                <a href="#">Admin</a>
                <ul className="mobile-dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
            </li>
            <hr />
            <li>
              <Link to="/about-us" >About Us</Link>
            </li>
          </ul>
        </aside>
        <main className="main" style={{width: "100%"}}>
          <div className="content">
            <Route path="/related-product/:id" component={RelatedProductScreen}/>
            <Route path="/about-us" component={AboutUs} />
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <div>
        <Footer />
        </div>
        
      </div>
    </BrowserRouter>
    
  );
}

export default App;
export {loadScript};