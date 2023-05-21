import { Link } from 'react-router-dom';
import '../css/Dashboard.css';
import Logout from '../components/Logout';

function Dashboard() {
  return (
    <div className='dashboard-container'>
      <div>
        <Link to='/products' className='dashboard-item'>
          Liste des produits
        </Link>
      </div>
      <div>
        <Link to='/create' className='dashboard-item'>
          Créer un nouveau produit
        </Link>
      </div>

      <div>
        <Link to='/discount' className='dashboard-item'>
          Créer une nouvelle promotion
        </Link>
      </div>
      <Logout />
    </div>
  );
}

export default Dashboard;
