import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './DeleteProduct';
import '../css/ProductList.css';
import photo from '../../../commercial/src/main/resources/static/photo/56/heather-ford-5gkYsrH_ebY-unsplash.jpg';

function ProductsList() {
  const [products, setProducts] = useState([]);
  console.log(products);
  // const url = "../../../commercial/src/main/resources/static"

  useEffect(() => {
    axios
      .get('http://localhost:8080/products')
      .then((res) => setProducts(res.data));
  }, []);
  return (
    <div className='container'>
      {' '}
      <h1>Catalogues de nos produits</h1>
      <ul>
        {products.map((product) => (
          <>
            <li className='card' key={product.product_id}>
              <div className='card-image'>
                <DeleteProduct product={product} />
                <img src={photo} alt='picture' />

                {/* <img src={`../../../commercial/src/main/resources/static${product.photosImagePath}`} alt='picture' /> */}
              </div>
              <div className='note'>{product.category?.libelle}</div>
              <div className='card-title'>
                {product.name} <br />
                <span className='price'>{product.price} €</span>
              </div>
              <div className='card-description'>{product.description}</div>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
