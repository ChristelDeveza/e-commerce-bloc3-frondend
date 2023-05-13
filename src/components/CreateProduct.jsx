import axios from 'axios';
import { useEffect, useState } from 'react';

function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('http://localhost:8080/create', {
        name,
        price,
        description,
        categoryId,
      })
      .then((res) => console.log(res.data));
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
      <form onSubmit={handleSubmit}>
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
        <button type='button' onClick={handleSubmit}>
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
