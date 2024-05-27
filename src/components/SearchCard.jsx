// SearchCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const SearchCard = ({ blog, users,categories }) => {
  const navigate = useNavigate();
  const defaultAuthorImage = "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";

  const handleTitleClick = () => {
    navigate(`/details/${blog?._id}`);
  };

  return (
    <article className="flex items-center p-4 mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm w-4/5">
      <Tooltip title={"Go to Profile"} arrow>
        <div className="flex-none w-16 h-16">
          <img
            src={users.find(user => user?._id === blog?.userId)?.image || defaultAuthorImage}
            className="w-full h-full rounded-full cursor-pointer"
            alt={blog?.userId}
            onClick={() => navigate(`/profil/${blog?.userId}`)}
          />
          <div className="text-center mt-2 text-gray-900">
            {users.find(user => user._id === blog?.userId)?.username || "Unknown User"}
          </div>
        </div>
      </Tooltip>
      <div className="flex-grow ml-4">
        <h3
          className="text-xl text-gray-900 cursor-pointer hover:underline"
          onClick={handleTitleClick}
        >
          {blog?.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-3">
          {blog?.content}
        </p>
        <p className="text-gray-400 text-xs mt-1">
        created at : {new Date(blog?.createdAt).toLocaleString()}
        <span  className=' ml-3 font-extrabold'> • </span>  
        <span className=' ml-3'>
            comments : {blog?.comments?.length}
        </span>
        <span  className=' ml-3 font-extrabold'> • </span>  
        <span className=' ml-3'>
            category : {categories?.find(item=> item._id ===blog?.categoryId)?.name}
        </span>
        </p>
      </div>
    </article>
  );
};

export default React.memo(SearchCard);
