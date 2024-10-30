"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ViewBlog = ({ blogId }) => {
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        // Fetch the specific blog from local storage
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        const blogToView = blogs.find(blog => blog.id === blogId);
        setBlogData(blogToView);
    }, [blogId]);

    const renderBlock = (block) => {
        switch (block.type) {
            case "header":
                return <h1 dangerouslySetInnerHTML={{ __html: block.data.text }} />;
            case "paragraph":
                return <p dangerouslySetInnerHTML={{ __html: block.data.text }} />;
            case "list":
                return (
                    <ul>
                        {block.data.items.map((item, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                    </ul>
                );
            case "image":
                return (
                    <img src={block.data.file.url} alt={block.data.caption || ''} />
                );
            // Add more cases for other block types if needed
            default:
                return null;
        }
    };

    return (
        <div>
            <h1>View Blog</h1>
            {blogData ? (
                <div>
                    {blogData.content.blocks.map((block) => (
                        <div key={block.id}>
                            {renderBlock(block)}
                        </div>
                    ))}
                   
                    <Link href={`/edit/${blogId}`}>
                        <button>Edit</button>
                    </Link>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ViewBlog;
