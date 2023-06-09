import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import ProductsList from './components/ProductsList';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './css/Navbar.css';
import Login from './components/Login';
import CreateDiscount from './components/CreateDiscount';
import ApplyDiscount from './components/ApplyDiscount';
import UserContextIsOnline from './context/UserContext';
import Dashboard from './page/Dashboard';

function App() {
  return (
    <div>
      <UserContextIsOnline>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='products/:id' element={<EditProduct />} />
            <Route path='products' element={<ProductsList />} />
            <Route path='connexion' element={<Login />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='create' element={<CreateProduct />} />
            <Route path='discount' element={<CreateDiscount />} />
            <Route path='discounted-product/:id' element={<ApplyDiscount />} />
          </Routes>
        </Router>
      </UserContextIsOnline>
    </div>
  );
}

export default App;
