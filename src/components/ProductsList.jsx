import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';
import { UserContext } from '../context/UserContext';
import '../css/ProductList.css';
// import photo from '../../../commercial/src/main/resources/static/photo/56/heather-ford-5gkYsrH_ebY-unsplash.jpg';
import legumes from '../assets/legumes.jpg';
import fruits from '../assets/fruits.jpg';
import poisson from '../assets/poisson.jpg';
import viande from '../assets/viande.jpg';
import vetement from '../assets/Vetement.jpg';

import BackToDashboardButton from './BackToDashboardButton';

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
        (element) => element !== category
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
      {isOnline && <BackToDashboardButton />}
      <button onClick={() => handleCategoryFilter('Viande')}>
        {selectedCategories.includes('Viande')
          ? 'Annuler filtre Viande'
          : 'Filtrer Viande'}
      </button>
      <button onClick={() => handleCategoryFilter('Vêtements')}>
        {selectedCategories.includes('Vêtements')
          ? 'Annuler filtre Vêtements'
          : 'Filtrer Vêtements'}
      </button>
      <button onClick={() => handleCategoryFilter('Poisson')}>
        {selectedCategories.includes('Poisson')
          ? 'Annuler filtre Poisson'
          : 'Filtrer Poisson'}
      </button>
      <button onClick={() => handleCategoryFilter('Fruits')}>
        {selectedCategories.includes('Fruits')
          ? 'Annuler filtre Fruits'
          : 'Filtrer Fruits'}
      </button>
      <button onClick={() => handleCategoryFilter('Légumes')}>
        {selectedCategories.includes('Légumes')
          ? 'Annuler filtre Légumes'
          : 'Filtrer Légumes'}
      </button>
      <ul>
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <>
                <li className='card' key={product.id}>
                  <div className='card-image'>
                    <div className='button-container'>
                      {isOnline && <DeleteProduct product={product} />}
                      {isOnline && (
                        <Link to={`/products/${product.id}`}>
                          <button type='button' className='modify-button'>
                            Modifier
                          </button>
                        </Link>
                      )}
                      {isOnline && (
                        <Link to={`/discounted-product/${product.id}`}>
                          <button type='button' className='discount-button'>
                            Promotion
                          </button>
                        </Link>
                      )}
                    </div>
                    {product.category?.libelle === 'Légumes' ? (
                      <img src={legumes} alt='picture' />
                    ) : product.category?.libelle === 'Fruits' ? (
                      <img src={fruits} alt='picture' />
                    ) : product.category?.libelle === 'Poisson' ? (
                      <img src={poisson} alt='picture' />
                    ) : product.category?.libelle === 'Viande' ? (
                      <img src={viande} alt='picture' />
                    ) : product.category?.libelle === 'Vêtements' ? (
                      <img src={vetement} alt='picture' />
                    ) : null}{' '}
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
                      {isOnline && <DeleteProduct product={product} />}
                      {isOnline && (
                        <Link to={`/products/${product.id}`}>
                          <button type='button' className='modify-button'>
                            Modifier
                          </button>
                        </Link>
                      )}
                      {isOnline && (
                        <Link to={`/discounted-product/${product.id}`}>
                          <button type='button' className='discount-button'>
                            Promotion
                          </button>
                        </Link>
                      )}
                    </div>
                    {product.category?.libelle === 'Légumes' ? (
                      <img src={legumes} alt='picture' />
                    ) : product.category?.libelle === 'Fruits' ? (
                      <img src={fruits} alt='picture' />
                    ) : product.category?.libelle === 'Poisson' ? (
                      <img src={poisson} alt='picture' />
                    ) : product.category?.libelle === 'Viande' ? (
                      <img src={viande} alt='picture' />
                    ) : product.category?.libelle === 'Vêtements' ? (
                      <img src={vetement} alt='picture' />
                    ) : null}

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
