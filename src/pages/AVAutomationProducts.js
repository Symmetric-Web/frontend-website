import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './NetworkingProducts.css';

function AVAutomationProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [selectedType, setSelectedType] = useState("all");
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
  }, [location.key]);

  const loadMore = () => {
    setVisibleProducts(prev => prev + 12);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://productsbackend-606484914740.asia-south1.run.app/get_products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_type: "Audio-Visual-Products"
        })
      });
      
      const result = await response.json();
      
      if (result.status === "success") {
        setProducts(result.data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("Error fetching products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDescription = (description) => {
    if (!description) return [];
    return description.split('\n').filter(point => point.trim() !== '');
  };

  const productTypes = ["all", ...new Set(products.map(product => product.type).filter(Boolean))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || product.type === selectedType;
    
    return matchesSearch && matchesType;
  }).slice(0, visibleProducts);

  const hasMore = filteredProducts.length < products.filter(product => {
    const matchesSearch = 
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || product.type === selectedType;
    
    return matchesSearch && matchesType;
  }).length;
  return (
    <div className="networking-products">
      {/* Hero Title Section */}
      <section className="hero-title-section">
        <div className="container">
          <h1>AV and Automation Products</h1>
          <p className="hero-description">
            Advanced audiovisual and automation solutions for modern spaces. From digital signage to home automation,
            we deliver cutting-edge technology that enhances communication and control.
          </p>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="hero-section">
        <div className="container">
          <img 
            src="images/home/AV solutions.png"
            alt="AV and Automation Solutions"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Product List</h2>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="categories-grid">
                <div className="category-card" onClick={() => {
                  setSelectedType('Digital signage');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer' }}>
                  <h3>Digital Signage</h3>
                  <p>Advanced digital signage solutions for dynamic content display and management. Perfect for retail, corporate, and public spaces, offering engaging visual communications and real-time content updates.</p>
                </div>

                <div className="category-card" onClick={() => {
                  setSelectedType('Home Theatres');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer' }}>
                  <h3>Home Theatres</h3>
                  <p>Premium home theatre systems delivering immersive audiovisual experiences. Featuring high-end audio systems, 4K/8K projectors, and professional calibration for the ultimate entertainment setup.</p>
                </div>

                <div className="category-card" onClick={() => {
                  setSelectedType('Home automation');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer' }}>
                  <h3>Home Automation</h3>
                  <p>Comprehensive home automation solutions integrating lighting, climate, security, and entertainment systems. Create smart living spaces with intuitive control and energy-efficient operation.</p>
                </div>

                <div className="category-card" onClick={() => {
                  setSelectedType('Interactive Touch Display');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer' }}>
                  <h3>Interactive Touch Display</h3>
                  <p>State-of-the-art interactive displays for education and business environments. Featuring multi-touch capability, 4K resolution, and seamless collaboration tools.</p>
                </div>

                <div className="category-card" onClick={() => {
                  setSelectedType('Lighting dimming - Dali & DMX');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer' }}>
                  <h3>Lighting Dimming - Dali & DMX</h3>
                  <p>Professional lighting control systems using DALI and DMX protocols. Create perfect ambiance with precise dimming control and scene management for any environment.</p>
                </div>

                <div className="category-card" onClick={() => {
                  setSelectedType('Projectors');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer' }}>
                  <h3>Projectors</h3>
                  <p>High-performance projectors for various applications. From compact business projectors to large-venue installation models, delivering brilliant image quality and reliability.</p>
                </div>

                <div className="category-card" onClick={() => {
                  setSelectedType('Video Conferencing');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer' }}>
                  <h3>Video Conferencing</h3>
                  <p>Complete video conferencing solutions for modern communication needs. Featuring HD cameras, professional audio systems, and seamless integration with popular platforms.</p>
                </div>

                <div className="category-card" onClick={() => {
                  setSelectedType('Video Walls');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer' }}>
                  <h3>Video Walls</h3>
                  <p>Professional video wall solutions for impressive large-scale displays. Offering seamless integration, superior image quality, and flexible configuration options for any space.</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filters">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="type-filter"
              >
                {productTypes.map(type => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {loading ? (
              <div className="loading">Loading products...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div className="no-results">No products found</div>
            ) : (
              <>
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="product-card"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.imageUrl && (
                      <div className="product-image">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          loading="lazy"
                          width="100%"
                          height="100%"
                        />
                      </div>
                    )}
                    <div className="product-content">
                      <h3>{product.name || 'Unnamed Product'}</h3>
                      <span className="product-type">{product.type}</span>
                      <span className="info-link">Info →</span>
                    </div>
                  </div>
                ))}
                {hasMore && (
                  <div className="load-more-container">
                    <button onClick={loadMore} className="load-more-button">
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              className="product-modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-left">
                  <h2>{selectedProduct.name}</h2>
                  {selectedProduct.imageUrl && (
                    <div className="modal-image">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.title} 
                        loading="lazy"
                        width="100%"
                        height="100%"
                      />
                    </div>
                  )}
                </div>
                <div className="modal-right">
                  <div className="full-description">
                    {formatDescription(selectedProduct.description).map((point, index) => (
                      <div key={index} className="description-point">
                        <span className="bullet">•</span>
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                  <div className="product-details">
                    <span className="product-type">{selectedProduct.type}</span>
                  </div>
                </div>
                <button 
                  className="close-modal"
                  onClick={() => setSelectedProduct(null)}
                >
                  ×
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AVAutomationProducts;