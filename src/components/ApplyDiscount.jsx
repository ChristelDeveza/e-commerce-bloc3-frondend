/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function ApplyDiscount() {
  const [productById, setProductById] = useState('');
  const [selectDiscount, setSelectDiscount] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  console.log(selectDiscount);
  console.log('sel', selectedDiscount);
  const { id } = useParams();
  const { isOnline } = useContext(UserContext);
  const discountIdRef = useRef();

  useEffect(() => {
    if (isOnline) {
      axios
        .get(`http://localhost:8080/products/${id}`, {
          headers: {
            Authorization: `Bearer ${isOnline}`,
          },
        })
        .then((res) => setProductById(res.data));
    }
  }, [id, isOnline]);

  useEffect(() => {
    if (isOnline) {
      axios
        .get(`http://localhost:8080/discounts`, {
          headers: {
            Authorization: `Bearer ${isOnline}`,
          },
        })
        .then((res) => setSelectDiscount(res.data));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const selectedDiscountId = discountIdRef.current.value;
    console.log(selectedDiscountId);
    if (isOnline) {
      if (selectedDiscountId) {
        axios
          .get(`http://localhost:8080/discount/${selectedDiscountId}`, {
            headers: {
              Authorization: `Bearer ${isOnline}`,
            },
          })
          .then((res) => {
            setSelectedDiscount(res.data);
            return axios.post(
              `http://localhost:8080/productsBeta/apply/${id}/${selectedDiscountId}`,
              {
                discountBeta: selectedDiscountId,
              },
              {
                headers: {
                  Authorization: `Bearer ${isOnline}`,
                },
              }
            );
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
    }
  }

  return (
    <div>
      {isOnline ? (
        <div>
          <h1>Appliquer une promotion à un produit</h1>
          <div>{productById.id}</div>
          <div>{productById.name}</div>
          <div>{productById.description}</div>
          <div>{productById.price}</div>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='category'>Promotion : </label>
              <select ref={discountIdRef}>
                <option value=''>Sélectionnez une promotion</option>
                {selectDiscount.map((discount) => (
                  <option key={discount.id} value={discount.id}>
                    {discount.percentage}
                  </option>
                ))}
              </select>
            </div>
            <button type='submit'>Appliquer</button>
          </form>
        </div>
      ) : (
        <p className='message-access'>
          Vous n'êtes pas autorisé à accéder à cette page
        </p>
      )}
    </div>
  );
}

export default ApplyDiscount;
