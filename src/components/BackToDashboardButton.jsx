import { useNavigate } from 'react-router-dom';

function BackToDashboardButton() {
  const navigate = useNavigate();

  function backToDashboard() {
    navigate('/dashboard', { replace: true });
  }
  return (
    <div>
      <button type='submit' onClick={backToDashboard}>
        Tableau de bord
      </button>
    </div>
  );
}

export default BackToDashboardButton;
