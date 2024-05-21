import React from "react";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { GrView } from "react-icons/gr";
import { Button } from "@mui/material";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import useBlogRequests from "../services/useBlogRequests";

const Card = ({ blogs, users }) => {
  const defaultImage = "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg"
  const {currentUserId} = useSelector(state=>state.auth)
  const {likesss} = useBlogRequests()
  
  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">Blog</h1>
        <p className="mt-3 text-gray-500">
          Blogs that are loved by the community. Updated every hour.
        </p>
      </div>
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article
            className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
            key={blog._id}
          >
            <img
              src={blog.image || defaultImage}
              onError={(e) => { e.target.src = defaultImage; }}
              loading="lazy"
              alt={blog.title}
              className="w-full h-48 rounded-t-md"
            />
            
            <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
              <div className="flex-none w-10 h-10 rounded-full">
                <img
                  src={users.find((user) => user._id === blog.userId)?.image ||
                    "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"}
                  className="w-full h-full rounded-full"
                  alt={blog.userId}
                />
              </div>
              <div className="ml-3">
                <span className="block text-gray-900">
                  {" "}
                  {users.find((user) => user._id === blog.userId)?.username ||
                    "Unknown User"}
                </span>
                <span className="block text-gray-400 text-sm">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="pt-3 ml-4 mr-2 mb-3 h-32">
              <h3 className="text-xl text-gray-900">{blog.title}</h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-3">
                {blog.content}
              </p>
            </div>
            <div className="flex justify-between flex-nowrap items-center space-x-4 mt-2 mb-2">
              <div className="flex justify-between flex-nowrap items-center space-x-4 mx-2 gap-4">
                <span className="flex flex-nowrap items-center gap-2">
                  <BiLike onClick={()=> likesss(blog._id)} className={`scale-125 ${blog.likes.includes(currentUserId) ? "text-red-600" : ""}`} />
                  {blog.likes.length}
                </span>

                <span className="flex flex-nowrap items-center gap-2">
                  <GoCommentDiscussion className="scale-125" />
                  {blog.comments.length}
                </span>

                <span className="flex flex-nowrap items-center gap-2">
                  <GrView className="scale-125" />
                  {blog.countOfVisitors}
                </span>
              </div>
              <div>
                <Button sx={{ marginRight: "5px" }} variant="contained">
                  <Link to="#">Read More</Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Card;
