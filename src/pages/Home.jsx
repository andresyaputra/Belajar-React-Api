import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Home.css';
import NavbarImage1 from "../assets/final.png";
import NavbarImage2 from "../assets/final2.png"; 
import NavbarImage3 from "../assets/final3.png"; 

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => {
        // Slice the first three products
        setRecommendedProducts(response.data.slice(0, 3));
      })
      .catch(error => console.error('Error fetching recommended products:', error));
  }, []);

  const images = [NavbarImage1, NavbarImage2, NavbarImage3];

  const handlePrevious = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleShopNow = () => {
    navigate('/catalog');
  };

  const handleDotClick = index => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      <div className="slider h-screen flex justify-center items-center overflow-hidden relative">
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white px-4 py-2 rounded-md border border-white"
          onClick={handlePrevious}
        >
          &#8592; Previous
        </button>
        <div className="w-full h-full flex relative">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`object-cover w-full h-full absolute top-0 transition-transform duration-1000 ${
                currentImageIndex === index ? 'translate-x-0' : 'translate-x-full'
              }`}
            />
          ))}
        </div>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white px-4 py-2 rounded-md border border-white"
          onClick={handleNext}
        >
          Next &#8594;
        </button>
        <button
          className="absolute left-1/2 transform -translate-x-1/2 bottom-8 bg-white text-black px-4 py-2 rounded-md border border-black"
          onClick={handleShopNow}
        >
          Shop Now
        </button>
        <div className="carousel-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot w-3 h-3 rounded-full cursor-pointer ${currentImageIndex === index ? 'bg-white' : 'bg-gray-500'}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>

      <div className="recommended-products-container py-8">
        <h2 className="text-center text-3xl mb-8">Recommended Products</h2>
        <div className="flex justify-center items-center gap-8">
          {recommendedProducts.map(product => (
            <div key={product.id} className="recommended-product">
                <img
                  src={`http://localhost:3000/${product.image}`}
                  alt={product.name}
                  className="recommended-image w-[400px] h-[400px] object-cover mb-4"
                />
              <h3 className="product-name text-xl">{product.name}</h3>
              <p className="product-price text-lg">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Home;
