import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

  useEffect(() => {
    // Get request by id
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((res) => {
        setName(res.data.name);
        setPrice(res.data.price);
        setDescription(res.data.description);
        setCategory(res.data.category);
        setDiscount(res.data.discount);
        setDiscountedPrice(res.data.discountedPrice);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/categories')
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // PUT request to update product
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
            Authorization: 'Bearer my-token',
          },
        }
      )
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
        <div>
          <label htmlFor='description'>Description du produit : </label>
          <textarea
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='category'>Catégorie : </label>
          <input
            type='text'
            value={category?.libelle}
            onChange={(e) => setCategory(e.target.value)}
          />
          <select
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

        <div>
          {discount?.percentage != null && (
            <>
              <p>Promotion appliquée : {discount?.percentage} %</p>
              <p>Prix après promotion : {discountedPrice} €</p>
            </>
          )}
        </div>

        <button type='submit'>Modifier</button>
      </form>
    </div>
  );
}

export default EditProduct;
