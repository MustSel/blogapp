// IconComp.js

import { Button, Tooltip } from "@mui/material";
import { BiLike } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import useBlogRequests from "../services/useBlogRequests";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAxios from "../services/useAxios";

const IconComp = ({ blog, users, inBlog }) => {
  const { liked } = useSelector((state) => state.blogs);
  const { currentUserId } = useSelector((state) => state.auth.user);
  const { likesss} = useBlogRequests();
  const {axiosPublic} = useAxios()
  const [likers, setLikers] = useState([]);
  const [userLiked, setUserLiked] = useState(blog?.likes?.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(blog?.likes?.length || 0);

console.log(blog)
  const getLikers = (likes) => {
    return likes
      ?.map((userId) => users.find((user) => user._id === userId)?.username)
      .filter(Boolean) || [];
  };

  useEffect(() => {
    setLikers(getLikers(blog?.likes));
    setLikeCount(blog?.likes?.length || 0);
  }, [blog?.likes, users]);

  useEffect(() => {
    setUserLiked(blog?.likes?.includes(currentUserId))
    if (liked?.id === blog?._id) {
      setUserLiked(liked?.data?.didUserLike);
      
    }
  }, [liked, blog?._id]);

  const handleLike = async () => {
    await likesss(blog?._id);
    if (inBlog) {
     
      const updatedBlog = await getUpdatedBlog();
      setLikers(getLikers(updatedBlog.likes));
      setUserLiked(updatedBlog.likes?.includes(currentUserId));
      setLikeCount(updatedBlog.likes?.length || 0);
    }
  };

  
  const getUpdatedBlog = async () => {
    try {
      const response = await axiosPublic(
        "/blogs");;
      const updatedBlog = response.data.data.find((b) => b._id === blog._id);
      return updatedBlog;
    } catch (error) {
      console.error("Error updating blog:", error);
      return null;
    }
  };

  return (
    <div className="flex justify-between flex-nowrap items-center space-x-4 mt-2 mb-2">
      <div className="flex justify-between flex-nowrap items-center space-x-4 mx-2 gap-4">
        <Tooltip
          title={likers?.length ? likers.join(", ") : "No likes yet"}
          arrow
        >
          <span className="flex flex-nowrap items-center gap-2">
            <BiLike
              onClick={handleLike}
              className={`scale-125 cursor-pointer ${
                 userLiked ? "text-red-600" : ""}`}
            />
            {likeCount}
          </span>
        </Tooltip>
        <span className="flex flex-nowrap items-center gap-2">
          <GoCommentDiscussion className="scale-125 cursor-pointer" />
          {blog?.comments?.length}
        </span>

        <span className="flex flex-nowrap items-center gap-2">
          <GrView className="scale-125 cursor-pointer" />
          {blog?.countOfVisitors}
        </span>
      </div>
      <div>
        {!inBlog && (
          <Button sx={{ marginRight: "5px" }} variant="contained">
            <Link to={`/details/${blog._id}`}>Read More</Link>
          </Button>
        )}
        {inBlog && blog?.userId?._id === currentUserId && 
        <div>
          <Button sx={{ marginRight: "5px" }} variant="outlined" size="small" color="info">
        <Link to={"#"}>Edit Blog</Link>
      </Button>
          <Button sx={{ marginRight: "5px" }} variant="outlined" size="small" color="warning">
        <Link to={"#"}>Delete Blog</Link>
      </Button>
        </div>
        }
      </div>
    </div>
  );
};

export default IconComp;
