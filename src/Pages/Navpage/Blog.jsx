import React, { useState, useEffect } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { blogcategories, blogs } from '../../Component/Api';



import BlogContent from '../../Component/blog/BlogContent';
import BlogRightSidebar from '../../Component/blog/BlogRightSidebar';
import MobileBottomNav from '../../Component/blog/MobileBottomNav';
import MobileFilterModal from '../../Component/blog/MobileFilterModal';
import LoadingSpinner from '../../Component/blog/LoadingSpinner';
import BlogHeader from '../../Component/blog/BlogHeader';
import BlogSidebar from '../../Component/blog/BlogSidebar';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Intersection Observer for infinite scroll
  const { ref, inView } = useInView();

  // Categories Query
  const { 
    data: categoriesData, 
    isLoading: categoriesLoading 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: blogcategories,
    staleTime: 5 * 60 * 1000,
  });

  // Categories format for UI
  const getCategoryIcon = (category) => {
    const icons = {
      'E-commerce': '🛒',
      'Food': '🍎',
      'Health': '❤️',
      'Tech': '📱',
      'Business': '💼',
      'Lifestyle': '🌟'
    };
    return icons[category] || '📝';
  };

  const categories = categoriesData ? [
    { name: "All", count: categoriesData.reduce((acc, cat) => acc + cat.count, 0), icon: "📝" },
    ...categoriesData.map(cat => ({
      name: cat.name,
      count: cat.count,
      icon: getCategoryIcon(cat.name)
    }))
  ] : [];

  // Blogs Infinite Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: blogsLoading,
    isError,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['blogs', activeCategory, searchTerm],
    queryFn: ({ pageParam = 1 }) => 
      blogs({ 
        pageParam, 
        category: activeCategory === 'All' ? '' : activeCategory, 
        search: searchTerm 
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Load more when scroll reaches bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all blog posts from pages
  const allBlogs = data?.pages.flatMap(page => page.blogs) || [];

  // Featured এবং Trending পোস্ট
  const featuredPosts = allBlogs.filter(post => post.featured === true).slice(0, 2);
  const trendingPosts = allBlogs.filter(post => post.trending === true).slice(0, 3);
  
  const displayFeatured = featuredPosts.length > 0 ? featuredPosts : allBlogs.slice(0, 2);
  const displayTrending = trendingPosts.length > 0 ? trendingPosts : allBlogs.slice(2, 5);

  // Handlers
  const toggleSave = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (categoriesLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">Error: {error?.message || 'Failed to load blogs'}</p>
          <button 
            onClick={() => refetch()}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <BlogHeader
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        setShowMobileFilter={setShowMobileFilter}
      />

      <MobileFilterModal 
        showMobileFilter={showMobileFilter}
        setShowMobileFilter={setShowMobileFilter}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <BlogSidebar
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            allBlogs={allBlogs}
          />

          <BlogContent 
            blogsLoading={blogsLoading}
            displayFeatured={displayFeatured}
            displayTrending={displayTrending}
            allBlogs={allBlogs}
            activeCategory={activeCategory}
            likedPosts={likedPosts}
            savedPosts={savedPosts}
            toggleLike={toggleLike}
            toggleSave={toggleSave}
            ref={ref}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />

          <BlogRightSidebar 
            allBlogs={allBlogs}
            savedPosts={savedPosts}
          />
        </div>
      </div>

      <MobileBottomNav 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </div>
  );
};

export default Blog;