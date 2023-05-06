import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<ProductsList />} />
          <Route path='create' element={<CreateProduct />} />
          <Route path='product/:id' element={<EditProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
