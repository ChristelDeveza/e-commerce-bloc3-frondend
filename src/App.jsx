
import './App.css';
import CreateProduct from './components/CreateProduct';
import ProductsList from './components/ProductsList';

function App() {
 
  return (
    <>
      <div>
        <ProductsList />
        <CreateProduct />
      </div>
    </>
  );
}

export default App;
