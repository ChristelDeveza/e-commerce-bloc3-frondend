/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import '../css/CreateDiscount.css';
import BackToDashboardButton from './BackToDashboardButton';

function CreateDiscount() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pourcentDiscount, setPourcentDiscount] = useState(0);
  const { isOnline } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (isOnline) {
      axios
        .post(
          'http://localhost:8080/discount',
          {
            startDate,
            endDate,
            percentage: pourcentDiscount,
          },
          {
            headers: {
              Authorization: `Bearer ${isOnline}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            icon: 'success',
            title: 'Confirmation',
            text: 'Votre promotion a été enregistrée avec succès !',
          }).then(() => window.location.reload());
        })
        .catch((err) => {
          console.log(err);
          Swal.fire('Erreur', "Une erreur s'est produite", 'error');
        });
    }
  }

  return (
    <div>
      {isOnline ? (
        <div className='discount-container'>
          <h1 className='discount-title'>Créer une nouvelle promotion</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='discount-label' htmlFor='startDate'>
                Date de commencement :{' '}
              </label>
              <input
                className='discount-input'
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className='discount-label' htmlFor='endDate'>
                Date de fin :{' '}
              </label>
              <input
                className='discount-input'
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label className='discount-label' htmlFor='pourcentDiscount'>
                Pourcentage à appliquer :{' '}
              </label>
              <input
                className='discount-input'
                type='number'
                value={pourcentDiscount}
                onChange={(e) => setPourcentDiscount(e.target.value)}
              />
            </div>
            <button className='discount-create-button' type='submit'>
              Créer
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

export default CreateDiscount;
