import React from "react";
import '../footer.css';

function Footer() {
  return (
  <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">BantaiBasket <i>A COMPLETE GROCERY SHOP </i> </p>
          </div>

          <div className="col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li><a href="#">Fruits</a></li>
              <li><a href="#">Vegetables</a></li>
            </ul>
          </div>

          {/* <div className="col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Contribute</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div> */}
        </div>
     
      <div className="row">
      <div className="col-md-3">
            <h6>Contact Us</h6>
            <ul className="footer-links">
              <li> <a class="fa fa-phone" href="tel:9945976336"> 9945976336</a></li>
              <li> <a class="fa fa-envelope" href="mailto:bantaibasket@gmail.com"> bantaibasket@gmail.com</a></li>
            </ul>
          </div>
      </div>

        <hr />
      </div>
     
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 ">
            <p className="copyright-text">Copyright &copy; 2017 All Rights Reserved by 
            <a href="/">  BantaiBasket </a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6">
            <ul className="social-icons">
              <li><a className="facebook" href="https://www.facebook.com/bantaibasket/"><i className="fa fa-facebook"></i></a></li>
              <li><a className="twitter" href="https://twitter.com/bantaibasket?s=08"><i className="fa fa-twitter"></i></a></li>
              <li><a className="youtube" href="https://www.youtube.com/c/BantaiBasket"><i className="fa fa-youtube"></i></a></li>
              <li><a className="instagram" href="https://www.instagram.com/p/CCQ1wLpHTQD/?igshid=1vbt2cqlq0d78"><i className="fa fa-instagram"></i></a></li>   
            </ul>
          </div>
          <div className="col-md-4 col-sm-6">
            {/* <ul className="payment-icons">
              <li><img src="../public/images/visa.png" className="visa" ></img></li>
              <li><img className="masrter-card" src="#"></img></li>
              <li><img className="rupay" src="#"></img></li>
              <li><img className="paytm" src="#"></img></li>   
              <li><img className="maestro" src="#"></img></li>   
              <li><img className="bhim-upi" src="#"></img></li>
            </ul> */}
          </div>

        </div>
      </div>
  </footer>
          
        
  );
}

export default Footer;