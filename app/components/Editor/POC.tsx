"use client"
import React, { useEffect, useState } from 'react'
import EditorComponent from './components/EditorComponent';
import Link from 'next/link';

const POC = () => {
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [blogData, setBlogData] = useState({ content: [] });

  const handlePublish = () => {
    if (textEditor.isReady) {
      textEditor.save().then((data) => {
        if (data?.blocks.length > 0) {
          const uniqueId = `blog_${new Date().getTime()}`;
          const newBlogData = { id: uniqueId, content: data };
          setBlogData(newBlogData);
  
          // Retrieve existing blogs from localStorage or initialize an empty array
          const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  
          // Append the new blog entry to the existing blogs
          existingBlogs.push(newBlogData);
  
          // Save the updated blogs array back to localStorage
          localStorage.setItem("blogs", JSON.stringify(existingBlogs));
  
          console.log("Saved blog data:", newBlogData);
        }
      }).catch(err => console.log("Error saving blog:", err));
    }
  };
  
  return (
    <div>
      <button onClick={handlePublish}>Publish</button>
      <Link href='/do'>do</Link>
      <EditorComponent
        textEditor={textEditor}
        setTextEditor={setTextEditor}
        blogData={blogData}
      />
    </div>
  )
}

export default POC;
