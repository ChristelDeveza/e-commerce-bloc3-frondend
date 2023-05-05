import axios from 'axios';
import { useState } from 'react';

function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('http://localhost:8080/products', {
        name,
        price,
      })
      .then((res) => console.log(res.data));
  }

  
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
        <button type='button' onClick={handleSubmit}>
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
