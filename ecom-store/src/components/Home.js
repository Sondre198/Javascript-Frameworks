import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://v2.api.noroff.dev/online-shop')
      .then(response => {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const defaultImage = 'https://via.placeholder.com/150';

  return (
    <div>
      <h1>Product List</h1>
      {error && <p>Error: {error}</p>}
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearch} 
        placeholder="Search for products..." 
      />
      <ul>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <li key={product.id} style={{ listStyleType: 'none', marginBottom: '20px' }}>
              <img 
                src={product.image && product.image.url ? product.image.url : defaultImage} 
                alt={product.title} 
                className="product-image" 
                onError={(e) => e.target.src = defaultImage}
                style={{ width: '150px', height: '150px' }}
              />
              <div>
                <h2>{product.title}</h2>
                <p>${product.price}</p>
                <Link to={`/product/${product.id}`}>
                  <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    View Product
                  </button>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
