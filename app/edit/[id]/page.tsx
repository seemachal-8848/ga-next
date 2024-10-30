// pages/edit/[id].js
"use client"
import React from 'react';
import EditBlog from '@/app/components/Editor/components/EditBlog';
import { useParams } from 'next/navigation';

const EditBlogPage = () => {
    const params= useParams() // Get the blog ID from the URL
    const {id} = params
    return <EditBlog blogId={id} />;
};

export default EditBlogPage;
