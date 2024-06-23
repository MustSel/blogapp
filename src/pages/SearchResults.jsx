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
      <h2 className="text-2xl text-center mb-4">Search Results</h2>
      <div className="space-y-4">
        {!blogs.length ?
        <div >
          <h3 className=' text-center text-red-400'>No blog posts matching your search were found!</h3>
        </div> :
        blogs.map(blog => (
          <SearchCard key={blog._id} blog={blog} categories={categories} users={users} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
