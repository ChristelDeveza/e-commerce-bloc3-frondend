/* eslint-disable react/prop-types */
import axios from 'axios';

function DeleteProduct({ product }) {
  //console.log(product.id);

  function deleteById() {
    axios
      .delete(`http://localhost:8080/products/${product.id}`)
      .catch(() => console.error('error'));
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
