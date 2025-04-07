import React, { useEffect, useState } from 'react';
import HomeNavbar from '../home/HomeNavbar';
import { createClient } from '@supabase/supabase-js';

// Supabase müştərisini yaradın
const supabaseUrl = 'https://btsdjmkresicezlbutpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU';
const supabase = createClient(supabaseUrl, supabaseKey);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogpage')
        .select('id, img, blog_header, blog_date, blog_text');

      if (error) {
        console.error('Error fetching data:', error.message);
        return;
      }

      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <HomeNavbar />
      <div className="blog-container">
        {blogs.length === 0 ? (
          <p>Yazılar yüklənir...</p>
        ) : (
          blogs.map((blog, index) => (  
            <div className="blog-post" key={blog.id}>
              <img src={blog.img} alt={blog.blog_header} />
              <div className="blog-post-header">
                <h2>{blog.blog_header}</h2>
              </div>
              <p>{new Date(blog.blog_date).toLocaleDateString()}</p>
              <p>
                {expandedIndex === index ? blog.blog_text : `${blog.blog_text.substring(0, 200)}...`}
                {blog.blog_text.length > 200 && (
                  <span onClick={() => toggleExpand(index)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {expandedIndex === index ? ' Daha az' : ' Daha çox'}
                  </span>
                )}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Blog;
