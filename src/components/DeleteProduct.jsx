/* eslint-disable react/prop-types */
import axios from 'axios';
import { useContext } from 'react';
import Swal from 'sweetalert2';
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
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Confirmation',
            text: 'Votre produit a été supprimé avec succès !',
          }).then(() => window.location.reload());
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
