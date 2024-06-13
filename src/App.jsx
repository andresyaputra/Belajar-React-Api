import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Man from './pages/Man';
import Women from './pages/Women';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/man" element={<Man />} />
          <Route path="/women" element={<Women />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/product/:id" element={<ProductDetail />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
