// SearchResults.jsx
import React from 'react';
import SearchCard from '../components/SearchCard';
import { useSelector } from 'react-redux';

const SearchResults = () => {

    const { blogs, users, categories} = useSelector(
        (state) => state.blogs
      );

      
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-center mb-4">Arama Sonuçları</h2>
      <div className="space-y-4">
        {blogs.map(blog => (
          <SearchCard key={blog._id} blog={blog} categories={categories} users={users} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
