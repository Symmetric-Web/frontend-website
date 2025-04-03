import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './NetworkingProducts.css';

function NetworkingProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(12); // 3 rows x 4 columns
  const [selectedType, setSelectedType] = useState("all");
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
  }, [location.key]);

  const loadMore = () => {
    setVisibleProducts(prev => prev + 12); // Load 3 more rows
  };

  const fetchProducts = async () => {
    console.log("fetching products");
    setLoading(true);
    setError(null);
    try {
      console.log("Making API call to api");
      const response = await fetch('https://productsbackend-606484914740.asia-south1.run.app/get_products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_type: "Networking Products"
        })
      });
      
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

  // Helper function to format description text
  const formatDescription = (description) => {
    if (!description) return [];
    return description.split('\n').filter(point => point.trim() !== '');
  };

  // Get unique product types
  const productTypes = ["all", ...new Set(products.map(product => product.type).filter(Boolean))];

  // Filter products based on search query and selected type
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
          <h1>Networking Products</h1>
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
              src="/images/Networking/Scada network center.webp" 
              alt="Network Infrastructure"
              className="grid-image"
            />
          </div>
          <div className="grid-item">
            <img 
              src="/images/Networking/servers.webp" 
              alt="Server Room"
              className="grid-image"
            />
          </div>
          <div className="grid-item">
            <img 
              src="/images/Networking/fire solutions.webp" 
              alt="Network Cables"
              className="grid-image"
            />
          </div>
          <div className="grid-item">
            <img 
              src="/images/Networking/cctv.webp" 
              alt="Data Center"
              className="grid-image"
            />
          </div>
        </div>
      </section>

      {/* Categories Description */}
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
                  setSelectedType('Optical Fibre Cable (OFC) & Accessoreis');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }}>
                  <h3>Fiber Optic Cable & Accessories</h3>
                  <p>High-performance fiber optic cables and components designed for reliable, high-speed data transmission. Our solutions include single-mode and multi-mode cables, connectors, patch cords, and complete fiber distribution systems.</p>
                </div>
              
                <div className="category-card" onClick={() => {
                  setSelectedType('Structured Cable & Accessories');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }}>
                  <h3>Structured Cable & Accessories</h3>
                  <p>Comprehensive structured cabling solutions featuring Cat6, Cat6A, and Cat7 cables, patch panels, keystones, and cable management systems. Designed for optimal network performance and easy maintenance.</p>
                </div>
              
                <div className="category-card" onClick={() => {
                  setSelectedType('Enterprise & Industrial Network Racks');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }}>
                  <h3>Enterprise & Industrial Network Racks</h3>
                  <p>Professional-grade network racks and cabinets engineered for both enterprise and industrial environments. Features include optimal airflow design, cable management, and various mounting options.</p>
                </div>
              
                <div className="category-card" onClick={() => {
                  setSelectedType('Enterprise Switching');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }}>
                  <h3>Enterprise Switching</h3>
                  <p>Advanced enterprise-grade switches providing high-performance connectivity, enhanced security features, and intelligent network management capabilities. Perfect for modern business networks.</p>
                </div>
              
                <div className="category-card" onClick={() => {
                  setSelectedType('Industrial Switches & Convertors');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }}>
                  <h3>Industrial Switches & Convertors</h3>
                  <p>Rugged industrial networking solutions built to withstand harsh environments. Our range includes managed and unmanaged switches, media converters, and industrial-grade network accessories.</p>
                </div>
              
                <div className="category-card" onClick={() => {
                  setSelectedType('Firewall');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }}>
                  <h3>Firewalls</h3>
                  <p>Next-generation firewall solutions offering comprehensive network security, threat prevention, and advanced traffic management. Designed to protect your network infrastructure from modern cyber threats.</p>
                </div>
              
                <div className="category-card" onClick={() => {
                  setSelectedType('Wireless products');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }}>
                  <h3>Wireless Products</h3>
                  <p>Complete wireless networking solutions including access points, controllers, and management systems. Delivering reliable Wi-Fi coverage with enterprise-grade security and performance.</p>
                </div>
              
                <div className="category-card" onClick={() => {
                  setSelectedType('Surge protection');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }}>
                  <h3>Surge Protectors</h3>
                  <p>Professional-grade surge protection devices designed to safeguard your valuable network equipment from power surges and electrical disturbances. Essential for maintaining network reliability.</p>
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
                          src={product.imageUrl.startsWith('http') ? product.imageUrl : `/images/products/${product.imageUrl}`} 
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
                        src={selectedProduct.imageUrl.startsWith('http') ? selectedProduct.imageUrl : `/images/products/${selectedProduct.imageUrl}`} 
                        alt={selectedProduct.name}
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

export default NetworkingProducts;