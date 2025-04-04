import React, { useState, useEffect, useCallback } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import BlogPostContent from '../components/BlogPostContent';
import { getAllBlogs } from '../services/blogService';
import './Blog.css';

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const slides = [
    {
      title: "Networking Products",
      image: "/images/home/Networking.webp"
    },
    {
      title: "Building Technology Products",
      image: "/images/home/Building Technology.webp"
    },
    {
      title: "AV & Automation Products",
      image: "/images/home/AV solutions.webp"
    },
    {
      title: "Networking Solutions",
      image: "/images/home/Networking.webp"
    },
    {
      title: "Building Technology Solutions",
      image: "/images/home/Building Technology.webp"
    },
    {
      title: "AV & Automation Solutions",
      image: "/images/home/AV solutions.webp"
    },
    // Add more slides as needed
  ];

  const slidesPerPage = 3;
  const totalPages = Math.ceil(slides.length / slidesPerPage);

  const handleSlideChange = useCallback((direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const slidesContainer = document.querySelector('.slides-grid');
    slidesContainer.classList.add('slide-exit');

    setTimeout(() => {
      if (direction === 'prev') {
        setCurrentPage(prev => prev === 0 ? totalPages - 1 : prev - 1);
      } else {
        setCurrentPage(prev => prev === totalPages - 1 ? 0 : prev + 1);
      }
      
      slidesContainer.classList.remove('slide-exit');
      slidesContainer.classList.add('slide-enter');

      setTimeout(() => {
        slidesContainer.classList.remove('slide-enter');
        setIsAnimating(false);
      }, 500);
    }, 500);
  }, [totalPages, isAnimating]);

  // Update the auto-sliding useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange('next');
    }, 3000);

    return () => clearInterval(timer);
  }, [totalPages, handleSlideChange]);

  const currentSlides = slides.slice(
    currentPage * slidesPerPage, 
    (currentPage + 1) * slidesPerPage
  );

  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getAllBlogs();
        setBlogPosts(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-content">
            <div className="blog-hero-text">
              <div className="blog-hero-logo-small">Powering Tomorrow</div>
              <h1>Symmetric IT<br />Services</h1>
              <p className="blog-hero-description">
                Our commitment to innovative technology solutions is paving the way for a smarter, 
                more connected future. Join us on a journey towards transforming the way businesses operate.
              </p>
            </div>

            <div className="slider-container">
              <div className="slider-frame">
                <div className="slider-nav">
                  <button 
                    className="nav-btn prev"
                    onClick={() => handleSlideChange('prev')}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  <button 
                    className="nav-btn next"
                    onClick={() => handleSlideChange('next')}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                  </button>
                </div>
                <div className="slide-content">
                  <div className="slides-grid">
                    {currentSlides.map((slide, index) => (
                      <div key={index} className="slide-item">
                        <h2 className="slide-title">{slide.title}</h2>
                        <div className="slide-image">
                          <img src={slide.image} alt={slide.title} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-grid">
        <div className="container">
          <div className="blog-cards">
            {blogPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="blog-list-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="blog-list-card-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-list-card-content">
                  <div className="blog-list-card-header">
                    <span className="blog-list-category">{post.category}</span>
                    <h3 className="blog-list-title">{post.title}</h3>
                    <p className="blog-list-description">{post.description}</p>
                  </div>
                  <div className="blog-list-footer">
                    <span className="blog-list-author">{post.author}</span>
                    <button className="blog-list-read-more">Read More</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Blog = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/:blogId" element={<BlogPostContent />} />
    </Routes>
  );
};

export default Blog;