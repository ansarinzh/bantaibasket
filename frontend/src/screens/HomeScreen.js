import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import ControlledCarousel from '../components/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';




function HomeScreen(props) {
  var save;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [kg, setKg] = useState([]);
  const [gram, setGram] = useState([]);
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { mrp_price, selling_price, products, loading, error } = productList;
  const discountPrice =  selling_price * mrp_price ;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Highest</option>
            <option value="highest">Lowest</option>
          </select>
        </li>
      </ul>
      <ControlledCarousel />
      
       {/*<div className="categories">
      <ul>
          <li>
          <Link to="/category/Root Vegetables" className="category-link">
            <img src="https://freshpoint.com/wp-content/uploads/2018/12/root-vegetables-and-tubers-freshpoint-produce-101.jpg" className="vegetables-img"/>
            Root Vegetables</Link>
          </li>
          <li>
          <Link to="/category/Fruit Vegetables" className="category-link">
          <img src="https://imageresizer.static9.net.au/6-BDj1R_NHECVcD5kLEEgX-8bMA=/600x338/smart/https%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2FNetwork%2FImages%2F2017%2F02%2F14%2F10%2F29%2F170214coach_vegetables.jpg" className="vegetables-img"/>
          Fruit Vegetables</Link>
        </li>
        <li>
        <Link to="/category/Flower Vegetables" className="category-link">
        <img src="https://cdn.britannica.com/s:700x500/17/196817-050-6A15DAC3/vegetables.jpg" className="vegetables-img"/>
          Flower Vegetables</Link>
        </li>
        <li>
        <Link to="/category/Fruits" className="category-link">
        <img src="https://greenmylife-wpengine.netdna-ssl.com/wp-content/uploads/2015/04/Summer-theFruit-season.jpg" className="vegetables-img"/>
          Fruits</Link>
        </li>
        </ul> 
      </div> */}
      {loading ? (
        <div className="loading"></div>
      ) : error ? (
        <div>{error}</div>
      ) : (  

        <ul className="products">
          {products.map((product) => {
        
            return(
              <li key={product._id}>
              <div className="product">
               
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                  
                </Link>
                
                <noscript>{save= product.mrp_price-product.selling_price}</noscript>
                <div className="product-info">
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>

                {
                  product.unit==='Gram' || product.unit==='gram' || product.unit==='GM' || product.unit==='gm' ?(<div className="product-price"><del>&#x20B9;{product.mrp_price}</del> &#x20B9;{product.selling_price/4}</div>):null
                }
                {
                  product.unit==='KG' || product.unit==="Kg" || product.unit==="Pcs" || product.unit==="PCS" ?(<div className="product-price"><del>&#x20B9;{product.mrp_price}</del> &#x20B9; {product.selling_price}</div>):null
                }

                
                {/* <div className="product-price"><del>&#x20B9;{product.mrp_price}</del>  &#x20B9;{product.unit==='KG'?product.selling_price:null}</div>
                <div className="product-price"><del>&#x20B9;{product.mrp_price}</del>  &#x20B9;{product.unit==='Gram'?(product.selling_price/4):null}</div> */}
                <div ><p className="discount">You save: <b>{Math.round(save/product.mrp_price *100)} %</b></p></div>
                <div className="product-rating">
                  <Rating value={product.rating} text={product.numReviews + ' reviews'} />
                </div>
                </div>
              </div>
            </li>
            )
            
})}
         
        </ul>
      )}
    </>
  );
}
export default HomeScreen;