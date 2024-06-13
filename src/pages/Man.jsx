// src/pages/Women.jsx
import React, { useEffect, useState } from 'react';
import { getProductsByCategory } from '../services/api';

const Man = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsByCategory('man');
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Man Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="border p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            {product.image && (
              <img
                src={`http://localhost:3000/${product.image}`}
                alt={product.name}
                className="w-[400px] h-[400px] object-cover mb-4"
              />
            )}
            <div className="font-semibold text-lg mb-2 text-center">{product.name}</div>
            <div className="text-gray-700 text-center">${product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Man;
