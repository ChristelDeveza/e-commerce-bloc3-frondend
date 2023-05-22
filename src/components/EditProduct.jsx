/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../css/EditProduct.css';
import BackToDashboardButton from './BackToDashboardButton';
import Swal from 'sweetalert2';

function EditProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  const [discount, setDiscount] = useState();
  const [discountedPrice, setDiscountedPrice] = useState();
  const { id } = useParams();
  const { isOnline } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Get request by id
    if (isOnline) {
      axios
        .get(`http://localhost:8080/products/${id}`, {
          headers: {
            Authorization: `Bearer ${isOnline}`,
          },
        })
        .then((res) => {
          setName(res.data.name);
          setPrice(res.data.price);
          setDescription(res.data.description);
          setCategory(res.data.category);
          setDiscount(res.data.discount);
          setDiscountedPrice(res.data.discountedPrice);
        })
        .catch((err) => console.log(err));
    }
  }, [id, isOnline]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/categories')
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // PUT request to update product
    if (isOnline) {
      axios
        .put(
          `http://localhost:8080/update/${id}`,
          {
            name,
            price,
            description,
            categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${isOnline}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Confirmation',
            text: 'Votre produit a été mis à jour avec succès !',
          }).then(() => {
            navigate('/products', { replace: true });
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire('Erreur', "Une erreur s'est produite", 'error');
        });
    } else {
      Swal.fire('Erreur', "Une erreur s'est produite", 'error');
    }
  };

  return (
    <div className='edit-container'>
      {isOnline ? (
        <div>
          <h1 className='edit-title'>Modifier un produit</h1>
          <form onSubmit={handleSubmit}>
            <div className='edit-input-container'>
              <label htmlFor='id'>Numéro du produit : </label>
              <input className='edit-input' type='number' value={id} readOnly />
            </div>
            <div className='edit-input-container'>
              <label htmlFor='name' className='edit-label'>
                Libellé du produit :{' '}
              </label>
              <input
                className='edit-input'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='edit-input-container'>
              <label htmlFor='price' className='edit-label'>
                Prix :{' '}
              </label>
              <input
                className='edit-input'
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className='edit-input-container'>
              <label htmlFor='description' className='edit-label'>
                Description du produit :{' '}
              </label>
              <textarea
                className='edit-input description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='edit-input-container'>
              <label htmlFor='category' className='edit-label'>
                Catégorie :{' '}
              </label>
              <input
                className='edit-input'
                type='text'
                value={category?.libelle}
                onChange={(e) => setCategory(e.target.value)}
              />
              <select
                className='edit-select'
                value={categories.id}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value=''>Changer la catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.libelle}
                  </option>
                ))}
              </select>
            </div>

            <div className='edit-input-container'>
              {discount?.percentage != null && (
                <>
                  <p className='promo-discount'>
                    Cet article est en promotion. En cas de changement de prix,
                    merci de réappliquer la promotion afin de mettre à jour le
                    prix après promotion ou de changer la promotion.
                  </p>
                  <p className='promo-discount'>
                    Promotion appliquée : {discount?.percentage} %
                  </p>
                  <p className='promo-discount'>
                    Prix après promotion : {discountedPrice} €
                  </p>
                  <p className='promo-discount'>
                    Date de début : {discount.startDate}
                  </p>
                  <p className='promo-discount'>
                    Date de fin : {discount.startDate}
                  </p>
                </>
              )}
            </div>

            <button className='edit-button' type='submit'>
              Modifier
            </button>
          </form>
          <BackToDashboardButton />
        </div>
      ) : (
        <p className='message-access'>
          Vous n'êtes pas autorisé à accéder à cette page
        </p>
      )}
    </div>
  );
}

export default EditProduct;
