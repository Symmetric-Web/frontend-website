import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './BuildingTechnologyProducts.css';

const BuildingTechnologyProducts = () => {
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
    console.log("fetching products");
    setLoading(true);
    setError(null);
    try {
      console.log("Making API call to api");
      const response = await fetch('https://productsbackend-606484914740.asia-south1.run.app/get_products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_type: "Building Technology Products"
        })
      });
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
    <div className="products-container">
      {/* Hero Section */}
      <br />
      <br />
      <section className="hero-section">
        <h2>Building Technology Products</h2>
        <img src="/images/products/building technology products/home.webp" alt="Building Technology Products" />
        
      </section>

      {/* Access Control Section */}
      <section className="product-section">
        <div className="container">
          <div className="product-content">
            <div className="product-text">
              <h2>Access Control & Time Attendance</h2>
              <p className="product-description">
                Enhance your facility's security and workforce management with our comprehensive 
                access control and time attendance solutions. Our systems provide seamless 
                integration and advanced monitoring capabilities.
              </p>
              <div className="features-grid">
                <div onClick={() => {
                  setSelectedType('Access Control & Time attendence');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3>Access Control Systems</h3>
                  <p>Comprehensive access management solutions for enhanced security</p>
                </div>
                <div onClick={() => {
                  setSelectedType('Access Control & Time attendence');
                  document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3>Time Attendance Systems</h3>
                  <p>Advanced time tracking and attendance management solutions</p>
                </div>
              </div>
            </div>
            <div className="product-image-wrapper">
              <img 
                src="/images/products/building technology products/2_access control and time attendance.webp" 
                alt="Access Control" 
              />
              <div className="shape-overlay"></div>
              <div className="dots-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* IP CCTV Section */}
      <section className="product-section">
        <div className="container">
          <div className="product-content">
            <div className="product-text">
              <h2>IP CCTV</h2>
              <p className="product-description">
                Advanced IP surveillance solutions that provide high-definition monitoring 
                and comprehensive security coverage for your premises. Our systems offer 
                cutting-edge features for enhanced protection.
              </p>
              <div className="features-grid">
                <div  onClick={() => {
                setSelectedType('IP CCTV');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3>IP Surveillance Systems</h3>
                  <p>High-definition IP camera solutions for comprehensive monitoring and security</p>
                </div>
                <div  onClick={() => {
                setSelectedType('IP CCTV');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }}className="feature-card">
                  <h3>Video Management</h3>
                  <p>Intelligent video management systems with advanced analytics capabilities</p>
                </div>
              </div>
            </div>
            <div className="product-image-wrapper">
              <img 
                src="/images/products/building technology products/3_ip cctv.webp" 
                alt="IP CCTV" 
              />
              <div className="shape-overlay"></div>
              <div className="dots-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Fire Safety Section */}
      <section className="product-section">
        <div className="container">
          <div className="product-content">
            <div className="product-text">
              <h2>Fire Safety Systems</h2>
              <p className="product-description">
                Comprehensive fire safety solutions designed to protect lives and property. 
                Our advanced systems provide early detection, swift response, and reliable 
                protection against fire hazards.
              </p>
              <div className="features-grid">
                <div onClick={() => {
                setSelectedType('Fire Alarm System');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3>Fire Alarm Products</h3>
                  <p>Advanced fire detection and alarm systems with immediate alert capabilities</p>
                </div>
                <div onClick={() => {
                setSelectedType('Fire Sprinkler system');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3>Fire Sprinkler Systems</h3>
                  <p>Automated fire suppression solutions for rapid emergency response</p>
                </div>
              </div>
            </div>
            <div className="product-image-wrapper">
              <img 
                src="/images/products/building technology products/4_fire safety systems.webp" 
                alt="Fire Safety" 
              />
              <div className="shape-overlay"></div>
              <div className="dots-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Communication Systems Section */}
      <section className="product-section">
        <div className="container">
          <div className="product-content">
            <div className="product-text">
              <h2 >Communication Systems</h2>
              <p className="product-description">
                State-of-the-art communication solutions that ensure clear and reliable 
                audio delivery across your facility. Our systems are designed for optimal 
                performance in various environments.
              </p>
              <div className="features-grid">
                <div onClick={() => {
                setSelectedType('Public Address System');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }}  className="feature-card">
                  <h3>Public Address System</h3>
                  <p>Professional audio solutions for clear communication and announcements across facilities</p>
                </div>
                <div onClick={() => {
                setSelectedType('Public Address System');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }}  className="feature-card">
                  <h3>Emergency Communication</h3>
                  <p>Reliable emergency broadcast and notification systems for critical situations</p>
                </div>
              </div>
            </div>
            <div className="product-image-wrapper">
              <img 
                src="/images/products/building technology products/5_public addressal systems.webp" 
                alt="Communication Systems" 
              />
              <div className="shape-overlay"></div>
              <div className="dots-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Solutions Section */}
      <section className="product-section">
        <div className="container">
          <div className="product-content">
            <div className="product-text">
              <h2>Security Solutions</h2>
              <p className="product-description">
                Comprehensive security solutions that provide multiple layers of protection 
                for your facility. From perimeter security to specialized monitoring systems, 
                we ensure complete coverage.
              </p>
              <div className="features-grid">
                <div onClick={() => {
                setSelectedType('Boom barrier and physical security');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3 >Physical Security</h3>
                  <p>Comprehensive physical security infrastructure for complete facility protection</p>
                </div>
                <div onClick={() => {
                setSelectedType('Under vehicle survelliance');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3>Under Vehicle Surveillance</h3>
                  <p>Specialized under-vehicle inspection systems for enhanced security</p>
                </div>
                <div onClick={() => {
                setSelectedType('Guard Tour monitoring');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3>Guard Tour Monitoring</h3>
                  <p>Advanced patrol management solutions for security personnel</p>
                </div>
                <div onClick={() => {
                setSelectedType('Perimeter Fencing');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3>Perimeter Protection</h3>
                  <p>Secure perimeter fencing and monitoring systems</p>
                </div>
              </div>
            </div>
            <div className="product-image-wrapper">
              <img 
                src="/images/products/building technology products/6_security solutions.webp" 
                alt="Security Solutions" 
              />
              <div className="shape-overlay"></div>
              <div className="dots-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Protection Section */}
      <section className="product-section">
        <div className="container">
          <div className="product-content">
            <div className="product-text">
              <h2>Facility Protection</h2>
              <p className="product-description">
                Advanced protection systems to safeguard your facility from various threats. 
                Our solutions help prevent damage and maintain the integrity of your infrastructure.
              </p>
              <div className="features-grid">
                <div onClick={() => {
                setSelectedType('Rodent Repellent');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3>Rodent Repellent System</h3>
                  <p>Electronic pest control solutions for comprehensive facility protection</p>
                </div>
                <div onClick={() => {
                setSelectedType('Water leak detection system');
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
              }} style={{ cursor: 'pointer' }} className="feature-card">
                  <h3>Water Leak Detection</h3>
                  <p>Early warning water leak detection systems to prevent water damage</p>
                </div>
              </div>
            </div>
            <div className="product-image-wrapper">
              <img 
                src="/images/products/building technology products/7_facility protection.webp" 
                alt="Facility Protection" 
              />
              <div className="shape-overlay"></div>
              <div className="dots-overlay"></div>
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
                        <img src={product.imageUrl} alt={product.name} />
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
};

export default BuildingTechnologyProducts;