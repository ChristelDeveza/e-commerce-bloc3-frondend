/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

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
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      {isOnline ? (
        <div>
          <h1>Créer une nouvelle promotion</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='startDate'>Date de commencement : </label>
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='endDate'>Date de fin : </label>
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='pourcentDiscount'>
                Pourcentage à appliquer :{' '}
              </label>
              <input
                type='number'
                value={pourcentDiscount}
                onChange={(e) => setPourcentDiscount(e.target.value)}
              />
            </div>
            <button type='submit'>Créer</button>
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

export default CreateDiscount;
