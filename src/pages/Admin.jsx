// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../services/api';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: null });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    if (newProduct.image instanceof File) {
      formData.append('image', newProduct.image, newProduct.image.name);
    }

    try {
      const response = await addProduct(formData);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', category: '', image: null });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
};

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setNewProduct(product);
  };

  const handleUpdateProduct = async (id) => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    if (newProduct.image instanceof File) {
      formData.append('image', newProduct.image, newProduct.image.name);
    }

    try {
      const response = await updateProduct(id, formData);
      setProducts(products.map(product => (product.id === id ? response.data : product)));
      setEditProduct(null);
      setNewProduct({ name: '', price: '', category: '', image: null });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Product Price"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        >
          <option value="">Select Category</option>
          <option value="man">Man</option>
          <option value="women">Women</option>
        </select>
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 mr-2"
        />
        {editProduct ? (
          <button onClick={() => handleUpdateProduct(editProduct.id)} className="bg-blue-500 text-white p-2">
            Update Product
          </button>
        ) : (
          <button onClick={handleAddProduct} className="bg-green-500 text-white p-2">
            Add Product
          </button>
        )}
      </div>
      <ul className="list-disc pl-5">
        {products.map(product => (
          <li key={product.id} className="mb-2">
            <div className="flex items-center">
              {product.image && <img src={`http://localhost:3000/${product.image}`} alt={product.name} className="w-16 h-16 mr-4" />}
              <div>
                {product.name} - ${product.price} ({product.category})
              </div>
              <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white p-2 ml-4">
                Delete
              </button>
              <button onClick={() => handleEditProduct(product)} className="bg-yellow-500 text-white p-2 ml-2">
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
