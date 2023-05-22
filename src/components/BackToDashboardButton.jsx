import { useNavigate } from 'react-router-dom';
import '../css/BackToDashboard.css';

function BackToDashboardButton() {
  const navigate = useNavigate();

  function backToDashboard() {
    navigate('/dashboard', { replace: true });
  }
  return (
    <div>
      <button
        className='dashboard-button'
        type='submit'
        onClick={backToDashboard}
      >
        Tableau de bord
      </button>
    </div>
  );
}

export default BackToDashboardButton;
