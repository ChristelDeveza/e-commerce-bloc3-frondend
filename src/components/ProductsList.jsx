import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';
import { UserContext } from '../context/UserContext';
import '../css/ProductList.css';
// import photo from '../../../commercial/src/main/resources/static/photo/56/heather-ford-5gkYsrH_ebY-unsplash.jpg';
import photo from '../assets/background2.jpg';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { isOnline } = useContext(UserContext);

  // const url = "../../../commercial/src/main/resources/static"
  console.log(isOnline);
  useEffect(() => {
    axios
      .get('http://localhost:8080/products')
      .then((res) => setProducts(res.data));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/products')
  //     .then((res) => console.log("test", res.data.filter((el)=>el.category?.libelle === "Alimentation")))
  // }, []);

  const handleCategoryFilter = (category) => {
    if (selectedCategories.includes(category)) {
      const updatedCategories = selectedCategories.filter(
        (c) => c !== category
      );
      setSelectedCategories(updatedCategories);

      const filtered = products.filter((product) =>
        updatedCategories.includes(product.category?.libelle)
      );
      setFilteredProducts(filtered);
    } else {
      const updatedCategories = [...selectedCategories, category];
      setSelectedCategories(updatedCategories);

      const filtered = products.filter((product) =>
        updatedCategories.includes(product.category?.libelle)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className='container'>
      {' '}
      <h1>Catalogues de nos produits</h1>
      <button onClick={() => handleCategoryFilter('Alimentation')}>
        {selectedCategories.includes('Alimentation')
          ? 'Annuler filtre Alimentation'
          : 'Filtrer Alimentation'}
      </button>
      <button onClick={() => handleCategoryFilter('Vêtement')}>
        {selectedCategories.includes('Vêtement')
          ? 'Annuler filtre Vêtement'
          : 'Filtrer Vêtement'}
      </button>
      <ul>
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <>
                <li className='card' key={product.id}>
                  <div className='card-image'>
                    <div className='button-container'>
                      <DeleteProduct product={product} />
                      {isOnline && (
                        <Link to={`/products/${product.id}`}>
                          <button type='button' className='modify-button'>
                            Modifier
                          </button>
                        </Link>
                      )}
                    </div>
                    <img src={photo} alt='picture' />
                    {/* <img src={`../../../commercial/src/main/resources/static/${product.photosImagePath}`} alt='picture' /> */}
                  </div>
                  <div className='note'>{product.category?.libelle}</div>
                  <div className='card-title'>
                    {product.name} <br />
                    <span className='price'>
                      {product.price} €{' '}
                      <span className='discount-price'>
                        {' '}
                        {product.discountedPrice != null &&
                          `| Promo ${product.discountedPrice} € (-${product.discount?.percentage} %)`}
                      </span>
                    </span>
                  </div>
                  <div className='card-description'>{product.description}</div>
                </li>
              </>
            ))
          : products.map((product) => (
              <>
                <li className='card' key={product.id}>
                  <div className='card-image'>
                    <div className='button-container'>
                      <DeleteProduct product={product} />
                      {isOnline && (
                        <Link to={`/products/${product.id}`}>
                          <button type='button' className='modify-button'>
                            Modifier
                          </button>
                        </Link>
                      )}
                    </div>
                    <img src={photo} alt='picture' />

                    {/* <img
                      src={`../../../commercial/src/main/resources/static/${product?.photosImagePath}`}
                      alt='picture'
                    /> */}
                  </div>
                  <div className='note'>{product.category?.libelle}</div>
                  <div className='card-title'>
                    {product.name} <br />
                    <span className='price'>
                      {product.price} €{' '}
                      <span className='discount-price'>
                        {' '}
                        {product.discountedPrice != null &&
                          `| Promo ${product.discountedPrice} € (-${product.discount?.percentage} %)`}
                      </span>
                    </span>
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
