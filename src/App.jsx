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

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='products' element={<ProductsList />} />
          <Route path='connexion' element={<Login />} />
          <Route path='create' element={<CreateProduct />} />
          <Route path='product/:id' element={<EditProduct />} />
          <Route path='discount' element={<CreateDiscount />} />
          <Route path='discounted-product/:id' element={<ApplyDiscount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
