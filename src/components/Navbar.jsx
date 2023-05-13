import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link to='connexion' className='nav-link'>
            Connexion
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
