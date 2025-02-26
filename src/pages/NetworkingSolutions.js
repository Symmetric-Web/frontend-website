import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './NetworkingSolutions.css';

function NetworkingSolutions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [location.key]); // This will trigger fetch on navigation and page refresh

  const fetchProducts = async () => {
    console.log("fetching products");
    setLoading(true);
    setError(null);
    try {
      console.log("Making API call to: http://127.0.0.1:5003/data_get");
      const response = await fetch('http://127.0.0.1:5003/data_get');
      console.log("API Response status:", response.status);
      console.log("API Response headers:", response.headers);
      
      const result = await response.json();
      console.log("API Response data:", result);
      
      if (result.status === "success") {
        console.log("Successfully fetched products:", result.data.length);
        setProducts(result.data);
      } else {
        console.error("API returned error status");
        setError("Failed to fetch products");
      }
    } catch (err) {
      console.error("API call failed with error:", err);
      setError("Error fetching products: " + err.message);
    } finally {
      console.log("Fetch operation completed");
      setLoading(false);
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Add this helper function to format the description
  const formatDescription = (description) => {
    if (!description) return [];
    return description.split('\n').filter(point => point.trim() !== '');
  };

  return (
    <div className="networking-solutions">
      {/* Hero Title Section */}
      <section className="hero-title-section">
        <div className="container">
          <h1>Networking Solutions</h1>
          <p className="hero-description">
            Comprehensive networking solutions that power modern enterprises. From structured cabling to advanced security systems, 
            we deliver reliable and scalable network infrastructure for businesses of all sizes.
          </p>
        </div>
      </section>

      {/* Hero Image Grid Section */}
      <section className="hero-image-grid">
        <div className="grid-container">
          <div className="grid-item">
            <img 
              src="/images/networking/Scada network center.png" 
              alt="Network Infrastructure"
              className="grid-image"
            />
          </div>
          <div className="grid-item">
            <img 
              src="/images/networking/servers.webp" 
              alt="Server Room"
              className="grid-image"
            />
          </div>
          <div className="grid-item">
            <img 
              src="/images/networking/fire solutions.jpg" 
              alt="Network Cables"
              className="grid-image"
            />
          </div>
          <div className="grid-item">
            <img 
              src="/images/networking/cctv.jpg" 
              alt="Data Center"
              className="grid-image"
            />
          </div>
        </div>
      </section>

      {/* Categories Description */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Our Networking Solutions</h2>
          <div className="categories-grid">
            <div className="category-card">
              <h3>Fiber Optic Cable & Accessories</h3>
              <p>High-performance fiber optic cables and components designed for reliable, high-speed data transmission. Our solutions include single-mode and multi-mode cables, connectors, patch cords, and complete fiber distribution systems.</p>
            </div>

            <div className="category-card">
              <h3>Structured Cable & Accessories</h3>
              <p>Comprehensive structured cabling solutions featuring Cat6, Cat6A, and Cat7 cables, patch panels, keystones, and cable management systems. Designed for optimal network performance and easy maintenance.</p>
            </div>

            <div className="category-card">
              <h3>Enterprise & Industrial Network Racks</h3>
              <p>Professional-grade network racks and cabinets engineered for both enterprise and industrial environments. Features include optimal airflow design, cable management, and various mounting options.</p>
            </div>

            <div className="category-card">
              <h3>Enterprise Switching</h3>
              <p>Advanced enterprise-grade switches providing high-performance connectivity, enhanced security features, and intelligent network management capabilities. Perfect for modern business networks.</p>
            </div>

            <div className="category-card">
              <h3>Industrial Switches & Convertors</h3>
              <p>Rugged industrial networking solutions built to withstand harsh environments. Our range includes managed and unmanaged switches, media converters, and industrial-grade network accessories.</p>
            </div>

            <div className="category-card">
              <h3>Firewalls</h3>
              <p>Next-generation firewall solutions offering comprehensive network security, threat prevention, and advanced traffic management. Designed to protect your network infrastructure from modern cyber threats.</p>
            </div>

            <div className="category-card">
              <h3>Wireless Products</h3>
              <p>Complete wireless networking solutions including access points, controllers, and management systems. Delivering reliable Wi-Fi coverage with enterprise-grade security and performance.</p>
            </div>

            <div className="category-card">
              <h3>Surge Protectors</h3>
              <p>Professional-grade surge protection devices designed to safeguard your valuable network equipment from power surges and electrical disturbances. Essential for maintaining network reliability.</p>
            </div>
          </div>
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
              {/* Add your filter options here */}
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
              filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="product-card"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.imageUrl && (
                    <div className="product-image">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                  )}
                  <div className="product-content">
                    <h3>{product.name || 'Unnamed Product'}</h3>
                    <span className="product-type">{product.type}</span>
                    <span className="info-link">Info →</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
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
                      <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
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

export default NetworkingSolutions; 