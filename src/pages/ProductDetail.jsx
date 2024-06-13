// ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError('Error fetching product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      {product.image && (
        <img
          src={`http://localhost:3000/${product.image}`}
          alt={product.name}
          className="w-[400px] h-[400px] object-cover mb-4"
        />
      )}
      <div className="text-gray-700 mb-4">IDR {product.price}</div>
      <div>{product.description}</div>
    </div>
  );
};

export default ProductDetail;
