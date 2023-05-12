import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import ProductsList from './components/ProductsList';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './css/Navbar.css';
import Login from './components/Login';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
