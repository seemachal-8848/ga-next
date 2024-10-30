// pages/view/[id].js
"use client"
import ViewBlog from '@/app/components/Editor/components/ViewBlog';
import { useParams } from 'next/navigation';

const ViewBlogPage = () => {
    const params= useParams() // Get the blog ID from the URL
    const {id} = params
  // Get the blog ID from the URL

    return <ViewBlog blogId={id} />;
};

export default ViewBlogPage;
