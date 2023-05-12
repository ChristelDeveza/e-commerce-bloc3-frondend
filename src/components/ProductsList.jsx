import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './DeleteProduct';
import '../css/ProductList.css';
import photo from '../assets/photo2.jpg';

function ProductsList() {
  const [products, setProducts] = useState([]);

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
              </div>
              <div className='note'>Catégorie</div>
              <div className='card-title'>
                {product.name} <br/><span className='price'>{product.price} €</span>
              </div>
              <div className='card-description'>
                Descripion Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Totam, exercitationem itaque consequatur hic soluta dolor{' '}
              </div>
            </li>
           
          </>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
