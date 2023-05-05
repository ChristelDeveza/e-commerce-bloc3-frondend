import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <div>
      <ProductsList />
      <CreateProduct />

      <Router>
        <Routes>
          <Route path='product/:id' element={<EditProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
