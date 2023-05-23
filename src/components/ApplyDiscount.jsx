/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../css/ApplyDiscount.css';
import BackToDashboardButton from './BackToDashboardButton';
import Swal from 'sweetalert2';

function ApplyDiscount() {
  const [productById, setProductById] = useState('');
  const [selectDiscount, setSelectDiscount] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  console.log('sel', selectedDiscount);
  const { id } = useParams();
  const { isOnline } = useContext(UserContext);
  const discountIdRef = useRef();
  const navigate = useNavigate();

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
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              icon: 'success',
              title: 'Confirmation',
              text: 'La promotion a été appliquée avec succès !',
            }).then(() => {
              navigate('/products', { replace: true });
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire('Erreur', "Une erreur s'est produite", 'error');
          });
      }
    }
  }

  return (
    <div className='apply-container'>
      {isOnline ? (
        <div>
          <h1 className='apply-title'>Appliquer une promotion à un produit</h1>
          <div>
            <p className='apply-label'>Numéro du produit</p>
            <p className='apply-input'>{productById.id}</p>
          </div>
          <div>
            <p className='apply-label'>Nom du produit</p>
            <p className='apply-input'>{productById.name}</p>
          </div>
          <div>
            {' '}
            <p className='apply-label'>Description</p>
            <p className='apply-input'>{productById.description}</p>
          </div>
          <div>
            {' '}
            <p className='apply-label'>Prix</p>
            <p className='apply-input'>{productById.price} €</p>
          </div>

          <form className='form-container' onSubmit={handleSubmit}>
            <div>
              <label className='apply-label' htmlFor='promotion'>
                Promotion :{' '}
              </label>
              <select className='apply-select' ref={discountIdRef}>
                <option value=''>Sélectionnez une promotion</option>
                {selectDiscount.map((discount) => (
                  <option key={discount.id} value={discount.id}>
                    {discount.percentage}
                  </option>
                ))}
              </select>
            </div>
            <button className='apply-button' type='submit'>
              Appliquer
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

export default ApplyDiscount;
