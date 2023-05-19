import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

function ApplyDiscount() {
  const [productById, setProductById] = useState('');
  const [selectDiscount, setSelectDiscount] = useState([]);
  const [discountId, setDiscountId] = useState('');
  console.log(discountId);
  const { id } = useParams();

  const discountIdRef = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((res) => setProductById(res.data));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/discounts`)
      .then((res) => setSelectDiscount(res.data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const selectedDiscountId = discountIdRef.current.value;

    if (selectedDiscountId) {
      axios
        .get(`http://localhost:8080/discount/${selectedDiscountId}`)
        .then((res) => {
          setDiscountId(res.data);
          return axios.post(
            `http://localhost:8080/productsBeta/apply/${id}/${selectedDiscountId}`,
            {
              discountBeta: selectedDiscountId,
            }
          );
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  }

  return (
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
  );
}

export default ApplyDiscount;
