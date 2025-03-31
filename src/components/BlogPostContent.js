import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogsData from '../data/blogs/blogs.json';
import './BlogPost.css';

const BlogPostContent = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const currentBlog = blogsData.blogs.find(b => b.id === blogId);
    if (!currentBlog) {
      navigate('/blog');
      return;
    }
    setBlog(currentBlog);
  }, [blogId, navigate]);

  if (!blog) {
    return <div className="blog-post-container">Loading...</div>;
  }

  return (
    <article className="blog-post-container">
      <header className="blog-post-header">
        <div className="blog-category">{blog.category}</div>
        <h1 className="blog-title">{blog.title}</h1>
        <div className="blog-meta">
          
          <span className="blog-date">{blog.date}</span>
        </div>
      </header>

      <div className="blog-post-image">
        <img src={blog.image} alt={blog.title} />
      </div>

      <div className="blog-post-content">
        <p className="blog-introduction">{blog.content.introduction}</p>

        {blog.content.sections.map((section, index) => (
          <section key={index} className="blog-section">
            <h2 className="section-title">{section.title}</h2>
            <div className="section-content">{section.content}</div>
          </section>
        ))}

        <p className="blog-conclusion">{blog.content.conclusion}</p>
      </div>
    </article>
  );
};

export default BlogPostContent;