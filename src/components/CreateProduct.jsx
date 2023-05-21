import axios from 'axios';
import { useEffect, useState } from 'react';
import Logout from './Logout';
import BackToDashboardButton from './BackToDashboardButton';

function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState('');

  // console.log(name, price, description, categoryId, image);

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

    axios
      .post('http://localhost:8080/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer my-token',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/categories')
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Ajouter un produit</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <label htmlFor='name'>Libellé du produit : </label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='price'>Prix : </label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='description'>Description : </label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='category'>Catégorie : </label>
          <select
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
        <div>
          <label htmlFor='photo'>Photo : </label>
          <input
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type='submit' onClick={handleSubmit}>
          Ajouter
        </button>
      </form>
      <BackToDashboardButton />
      <Logout />
    </div>
  );
}

export default CreateProduct;
