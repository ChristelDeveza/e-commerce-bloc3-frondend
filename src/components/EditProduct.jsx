import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { id } = useParams();

  useEffect(() => {
    // Get request by id
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((res) => {
        setName(res.data.name);
        setPrice(res.data.price);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // PUT request to update product
    axios
      .put(`http://localhost:8080/products/${id}`, {
        name,
        price,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Modifier un produit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='id'>Numéro du produit : </label>
          <input type='number' value={id} readOnly />
        </div>
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
        <button type='submit'>Modifier</button>
      </form>
    </div>
  );
}

export default EditProduct;
