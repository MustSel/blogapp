import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { GrView } from "react-icons/gr";
import { Button, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import useBlogRequests from "../services/useBlogRequests";

const Card = ({ blog, users, page,liked }) => {
  const currentUserId = useSelector((state) => state.auth.user?.currentUserId);
  const { likesss } = useBlogRequests();
  
  const [userLiked, setUserLiked] = useState(blog?.likes?.includes(currentUserId));
  const [likers, setLikers] = useState([]);


  const defaultImage =
    "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg";
  const defaultAuthorImage =
    "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";

  const getLikers = (likes) => {
    return likes
      ?.map((userId) => users.find((user) => user._id === userId)?.username)
      .filter(Boolean) || [];
  };

  useEffect(() => {
    setLikers(getLikers(blog?.likes));
  }, [blog?.likes, blog._id, page]);

  useEffect(() => {
    setUserLiked(blog?.likes?.includes(currentUserId))
    if (liked?.id === blog?._id) {
      setUserLiked(liked.data.didUserLike);
      
    } 
    
  }, [liked, blog?._id, page]);

  const handleLike = async () => {
    await likesss(blog._id);
  };

  

  return (
    <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm">
      <img
        src={blog?.image || defaultImage}
        onError={(e) => {
          e.target.src = defaultImage;
        }}
        loading="lazy"
        alt={blog?.title}
        className="w-full h-48 rounded-t-md"
      />

      <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
        <div className="flex-none w-10 h-10 rounded-full">
          <img
            src={
              users.find((user) => user._id === blog?.userId)?.image ||
              defaultAuthorImage
            }
            className="w-full h-full rounded-full"
            alt={blog?.userId}
          />
        </div>
        <div className="ml-3">
          <span className="block text-gray-900">
            {users.find((user) => user._id === blog?.userId)?.username ||
              "Unknown User"}
          </span>
          <span className="block text-gray-400 text-sm">
            {new Date(blog?.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="pt-3 ml-4 mr-2 mb-3 h-32">
        <h3 className="text-xl text-gray-900">{blog?.title}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-3">
          {blog?.content}
        </p>
      </div>
      <div className="flex justify-between flex-nowrap items-center space-x-4 mt-2 mb-2">
        <div className="flex justify-between flex-nowrap items-center space-x-4 mx-2 gap-4">
          <Tooltip
            title={likers.length ? likers.join(", ") : "No likes yet"}
            arrow
          >
            <span className="flex flex-nowrap items-center gap-2">
              <BiLike
                onClick={handleLike}
                className={`scale-125 cursor-pointer ${
                   userLiked ? "text-red-600" : ""}`}
              />
              {blog?.likes.length}
            </span>
          </Tooltip>
          <span className="flex flex-nowrap items-center gap-2">
            <GoCommentDiscussion className="scale-125 cursor-pointer" />
            {blog?.comments.length}
          </span>

          <span className="flex flex-nowrap items-center gap-2">
            <GrView className="scale-125 cursor-pointer" />
            {blog?.countOfVisitors}
          </span>
        </div>
        <div>
          <Button sx={{ marginRight: "5px" }} variant="contained">
            <Link to={`/details/${blog._id}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default React.memo(Card);
