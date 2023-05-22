/* eslint-disable react/prop-types */
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function DeleteProduct({ product }) {
  const { isOnline } = useContext(UserContext);

  function deleteById() {
    if (isOnline) {
      axios
        .delete(`http://localhost:8080/products/${product.id}`, {
          headers: {
            Authorization: `Bearer ${isOnline}`,
          },
        })
        .catch(() => console.error('error'));
    }
  }

  return (
    <div>
      {product.id && (
        <button type='button' className='delete-button' onClick={deleteById}>
          Supprimer
        </button>
      )}
    </div>
  );
}

export default DeleteProduct;
