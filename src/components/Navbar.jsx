import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isOnline } = useContext(UserContext);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className='navbar-toggle' onClick={toggleNavbar}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link to='/' className='nav-link'>
            Accueil
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='products' className='nav-link'>
            Catalogue
          </Link>
        </li>
        <li className='nav-item'>
          {!isOnline ? (
            <Link to='connexion' className='nav-link'>
              Connexion
            </Link>
          ) : (
            <Link to='dashboard' className='nav-link'>
              Tableau de bord
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
