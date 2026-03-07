import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaClock, 
  FaEye, 
  FaHeart, 
  FaRegHeart,
  FaBookmark, 
  FaRegBookmark,
  FaShareAlt, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaWhatsapp,
  FaArrowLeft,
  FaTag
} from 'react-icons/fa';
import { singleblog } from '../../Component/Api';
import LoadingSpinner from './LoadingSpinner';

const SingleBlog = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Fetch single blog data
  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => singleblog(id),
    staleTime: 5 * 60 * 1000,
  });

 

  const handleLike = () => {
    setLiked(!liked);
    // API call to update like
  };

  const handleSave = () => {
    setSaved(!saved);
    // API call to save post
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || 'Check this blog';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`
    };
    
    window.open(shareUrls[platform], '_blank');
    setShowShareMenu(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Error: {error?.message || 'Failed to load blog'}</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FaArrowLeft /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mb-10 bg-[#f8f8f8]">
     
      <div className="container">
        
        <div className="py-6">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <FaArrowLeft /> Back to Blogs
          </Link>
        </div>

     
        <h1 className="title">
          {blog?.title}
        </h1>
        <p className="subtitle">
          {blog?.description || blog?.summary || 'Read our latest article'}
        </p>

       
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FaUser className="text-green-600" />
            </div>
            <span className="font-medium">{blog?.author || 'Admin'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-600" />
            <span>{new Date(blog?.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaClock className="text-green-600" />
            <span>{blog?.readTime || '5 min read'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaEye className="text-green-600" />
            <span>{blog?.views || 1240} views</span>
          </div>
        </div>

  
        <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={blog?.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200'} 
            alt={blog?.title}
            className="w-full h-auto object-cover"
          />
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
            
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-bold text-gray-800 mb-3">Category</h3>
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                  {blog?.category || 'Technology'}
                </span>
              </div>

           
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-bold text-gray-800 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={handleLike}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      liked ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-700 hover:bg-red-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                      Like
                    </span>
                    <span className="font-semibold">{blog?.likes || 245}</span>
                  </button>
                  
                  <button 
                    onClick={handleSave}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      saved ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {saved ? <FaBookmark className="text-green-600" /> : <FaRegBookmark />}
                      Save
                    </span>
                  </button>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <FaShareAlt />
                        Share
                      </span>
                    </button>
                    
                    {showShareMenu && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border p-3 z-10">
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => handleShare('facebook')}
                            className="flex items-center gap-2 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                          >
                            <FaFacebook /> Facebook
                          </button>
                          <button 
                            onClick={() => handleShare('twitter')}
                            className="flex items-center gap-2 p-2 bg-sky-50 text-sky-400 rounded-lg hover:bg-sky-100"
                          >
                            <FaTwitter /> Twitter
                          </button>
                          <button 
                            onClick={() => handleShare('linkedin')}
                            className="flex items-center gap-2 p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                          >
                            <FaLinkedin /> LinkedIn
                          </button>
                          <button 
                            onClick={() => handleShare('whatsapp')}
                            className="flex items-center gap-2 p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                          >
                            <FaWhatsapp /> WhatsApp
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

             
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaTag /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">Shopping Tips</span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">E-commerce</span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">Bangladesh</span>
                  <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">Online Shopping</span>
                </div>
              </div>
            </div>
          </div>

         
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
         
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {blog?.content ? (
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  ) : (
                    <>
                      <p className="text-lg text-gray-600 mb-4">
                        {blog?.description || blog?.summary}
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                      </p>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Key Points</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Important point number one with detailed explanation</li>
                        <li>Second key point that readers should know about</li>
                        <li>Third important aspect of this topic</li>
                      </ul>
                      <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600 my-6">
                        "This is a meaningful quote from the article that highlights the main message or insight."
                      </blockquote>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleBlog;