const API_BASE_URL = 'https://blog-backend-three-psi.vercel.app/api';

export const getAllBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    const data = await response.json();
    return data.blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) {
      throw new Error('Blog not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

export const seedDatabase = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/seed`, {
      method: 'POST',
    });
    return await response.json();
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};