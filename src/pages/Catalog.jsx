// src/pages/Catalog.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = category === 'all'
    ? products
    : products.filter(product => product.category.toLowerCase() === category);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 flex">
      <div className="w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          <li>
            <button
              className={`w-full p-2 mb-2 ${category === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setCategory('all')}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={`w-full p-2 mb-2 ${category === 'man' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setCategory('man')}
            >
              Man
            </button>
          </li>
          <li>
            <button
              className={`w-full p-2 mb-2 ${category === 'women' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setCategory('women')}
            >
              Women
            </button>
          </li>
        </ul>
      </div>
      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-6 text-center">Catalog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="border p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
              {product.image && (
                <img
                  src={`http://localhost:3000/${product.image}`}
                  alt={product.name}
                  className="w-[400px] h-[400px] object-cover mb-4"
                />
              )}
              <div className="font-semibold text-lg mb-2 text-center">{product.name}</div>
              <div className="text-gray-700 text-center">IDR {product.price}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
