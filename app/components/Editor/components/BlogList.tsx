"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch blogs from local storage
        const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
        setBlogs(storedBlogs);
    }, []);

    return (
        <div>
            <h1>Published Blogs</h1>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <h2>{blog.content.blocks[0]?.data.text}</h2> {/* Display the title */}
                        <p>{blog.content.blocks[1]?.data.text}</p> {/* Display a snippet or description */}
                        <Link href={`/edit/${blog.id}`}>
                            <button>Edit</button>
                        </Link>
                        <Link href={`/view/${blog.id}`}>
                            <button>View</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
