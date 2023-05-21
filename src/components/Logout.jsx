import { useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';
import '../css/Logout.css';

function Logout() {
  const { setIsOnline } = useContext(UserContext);
  const navigate = useNavigate();

  function logoutButton() {
    navigate('/connexion', { replace: true });
    setIsOnline(null);
    localStorage.setItem('user', null);

    Swal.fire({
      icon: 'success',
      title: 'Confirmation',
      text: 'Déconnexion réussie.',
    });
  }

  return (
    <div>
      <button
        className='disconnect-button'
        type='button'
        onClick={logoutButton}
      >
        SE DECONNECTER
      </button>
    </div>
  );
}

export default Logout;
