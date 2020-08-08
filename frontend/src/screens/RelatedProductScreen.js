import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

function RelatedProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const category = props.match.params.id ? props.match.params.id : '';
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();


  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  const Increment= ()=>{
    if (qty < product.countInStock){
     //setQty(qty+1);
       setQty((qty) => qty=qty+1)
    }
    else{
      alert("Maximum Limit has reached ")
    }
  }
  const Decrement= ()=>{
    if (qty > 1){
      setQty(qty-1);
    }
    else{
      alert("Minimum Limit has reached")
    }
  }

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div className="loading"></div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image img-zoom-container">
              <img className="magnify-img" src={product.image} alt="product"></img>
            </div>

            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li>
                <li>
                  Price: <b><del>&#x20B9;{product.mrp_price}</del>  &#x20B9;{product.selling_price}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Price: &#x20B9;{product.selling_price}</li>
                <li>
                  Status:{' '}
                  {product.countInStock > 0 +'kg'? 'In Stock' : 'Unavailable.'}
                </li>
                <li>
                  Qty:{' '}
                  <div>
                    <button  onClick={Decrement} className="btn-rem">-</button>
                    <input type="number" className="input-qty" id="number" value={qty} onChange={(e) => {setQty(e.target.value);}} min="1" max={product.countInStock}></input>
                    <button onClick={Increment} className="btn-add">+</button>{product.unit}
                  </div>
                </li>
                <li>
                  {product.countInStock > 0  && (
                    <button onClick={handleAddToCart} className="button primary">
                      Add to Cart
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Reviews</h2>
            {!product.reviews.length && <div>There is no review</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div>
          </div>
        </>
      )}
    </div>
  );

}
export default RelatedProductScreen;