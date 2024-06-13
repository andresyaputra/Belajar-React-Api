import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/',
});

export const getProducts = () => API.get('/products');
export const getProductsByCategory = (category) =>
  API.get(`/products?category=${category}`);
export const addProduct = (product) => API.post('/products', product, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const getProductById = (id) => API.get(`/products/${id}`).then(response => response.data);

export default API;
