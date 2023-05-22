/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import BackToDashboardButton from './BackToDashboardButton';
import '../css/CreateProduct.css';
import Swal from 'sweetalert2';

function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState('');
  const { isOnline } = useContext(UserContext);

  // console.log(name, price, description, categoryId, image);
  console.log(isOnline);
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   axios
  //     .post('http://localhost:8080/create', {
  //       name,
  //       price,
  //       description,
  //       categoryId,
  //     })
  //     .then((res) => console.log(res.data));
  // }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    const data = JSON.stringify({
      name,
      price,
      description,
      categoryId,
    });

    formData.append(
      'postProduct',
      new Blob([data], { type: 'application/json' })
    );

    formData.append('image', image);

    // for (let key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    if (isOnline) {
      axios
        .post('http://localhost:8080/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${isOnline}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            icon: 'success',
            title: 'Confirmation',
            text: 'Votre produit a été enregistré avec succès !',
          }).then(() => window.location.reload());
        })
        .catch((error) => {
          console.log(error);
          Swal.fire('Erreur', "Une erreur s'est produite", 'error');
        });
    } else {
      Swal.fire('Erreur', "Une erreur s'est produite", 'error');
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/categories')
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {isOnline ? (
        <div className='create-container'>
          <h1 className='create-title'>Ajouter un produit</h1>
          <form
            className='form-container'
            onSubmit={handleSubmit}
            encType='multipart/form-data'
          >
            <div className='input-container'>
              <label htmlFor='name' className='create-label'>
                Libellé du produit :{' '}
              </label>
              <input
                className='create-input'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='price' className='create-label'>
                Prix :{' '}
              </label>
              <input
                className='create-input'
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='description' className='create-label'>
                Description :{' '}
              </label>
              <textarea
                className='create-input'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='category' className='create-label'>
                Catégorie :{' '}
              </label>
              <select
                className='create-select'
                value={categories.id}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value=''>Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.libelle}
                  </option>
                ))}
              </select>
            </div>
            <div className='input-container'>
              <label htmlFor='photo' className='create-label'>
                Photo :{' '}
              </label>
              <input
                type='file'
                accept='image/png, image/jpeg, image/jpg'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button className='create-button' type='submit'>
              Ajouter
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

export default CreateProduct;
