import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  axios from 'axios';
import { saveProduct, deleteProduct, listProducts } from '../actions/productActions';


function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [mrp_price, setMRP_Price] = useState('');
  const [selling_price, setSelling_Price] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setMRP_Price(product.mrp_price);
    setSelling_Price(product.selling_price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setUnit(product.unit);
    window.scrollTo({
      top: 0
  })
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        mrp_price,
        selling_price,
        image,
        brand,
        category,
        countInStock,
        description,
        unit
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    console.log(file);
    setUploading(true);
    axios
      .post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form" id="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} required placeholder="Ex. Onion"
                ></input>
              </li>
              <li>
                <label htmlFor="mrp_price">MRP Price</label>
                <input type="text" name="mrp_price" value={mrp_price} id="mrp_price" onChange={(e) => setMRP_Price(e.target.value)} required placeholder="Ex. 100"></input>
              </li>
              <li>
                <label htmlFor="selling_price">Selling Price</label>
                <input type="text" name="selling_price" value={selling_price} id="selling_price" onChange={(e) => setSelling_Price(e.target.value)} required placeholder="Ex. 80"></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)} required placeholder="Paste image URL"></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input  type="text" name="brand" value={brand} id="brand" onChange={(e) => setBrand(e.target.value)} required placeholder="Ex. Bantai Basket"></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)} required placeholder="Ex. 100"></input>
              </li>
              <li>
              <label htmlFor="unit">Unit</label>
              <input type="text" value={unit} name="unit" id="unit" onChange={(e) => setUnit(e.target.value)} required placeholder='Ex. KG, GM OR Pcs'>
                
              </input>
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)} required placeholder="Vegetables"></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)} required></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>MRP Price</th>
              <th>Selling Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td><img className="edit-image" src={product.image}/></td>
                <td>&#x20B9;{product.mrp_price}</td>
                <td>&#x20B9;{product.selling_price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;