import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './DeleteProduct';

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/products')
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      {' '}
      <h1>Liste des produits</h1>
      <ul>
        {products.map((product) => (
          <>
            <li key={product.product_id}>
              {product.name} ({product.price} €)
            </li>
            <DeleteProduct product={product} />
          </>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
