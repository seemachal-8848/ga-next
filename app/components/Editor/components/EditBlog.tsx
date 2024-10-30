import React, { useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { Tools } from './EditorComponent'; 

const EditBlog = ({ blogId }) => {
    const [editor, setEditor] = useState(null);
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        // Fetch the specific blog from local storage
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        const blogToEdit = blogs.find(blog => blog.id === blogId);
        setBlogData(blogToEdit);
    }, [blogId]);

    useEffect(() => {
        if (blogData) {
            const editorInstance = new EditorJS({
                holder: "textEditor",
                data: blogData.content,
                tools: Tools,
                onReady: () => {
                    setEditor(editorInstance);
                }
            });

            return () => {
                editorInstance.destroy(); // Cleanup editor instance on unmount
            };
        }
    }, [blogData]);

    const handleUpdate = () => {
        if (editor) {
            editor.save().then((data) => {
                // Save the updated blog back to localStorage
                const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
                const updatedBlogs = blogs.map(blog => 
                    blog.id === blogId ? { ...blog, content: data } : blog
                );
                localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
                console.log("Blog updated:", updatedBlogs);
            }).catch(err => console.log("Error updating blog:", err));
        }
    };

    return (
        <div>
            <h1>Edit Blog</h1>
            <div id="textEditor"></div>
            <button onClick={handleUpdate}>Publish Changes</button>
        </div>
    );
};

export default EditBlog;
