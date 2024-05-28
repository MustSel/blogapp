import React from "react";
import IconComp from "./IconComp";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
;

const Card = ({ blog, users }) => {
  const navigate = useNavigate()
  const defaultImage =
    "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg";
  const defaultAuthorImage =
    "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";

   
  return (
    <article className="max-w-full mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm">
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
        <Tooltip 
        title={"Go to Profile"}
        arrow>
          <div className="flex-none w-10 h-10 rounded-full">
          <img
            src={
              users.find((user) => user._id === blog?.userId)?.image ||
              defaultAuthorImage
            }
            className="w-full h-full rounded-full cursor-pointer"
            alt={blog?.userId}
           onClick={()=> navigate (`/profil/${blog?.userId}`)}
           
          />
        </div>
        </Tooltip>
        
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

      
        <IconComp
          users={users}
          blog={blog}
         
          
        />
      
    </article>
  );
};

export default React.memo(Card);


// import React from "react";
// import IconComp from "./IconComp";
// import { useNavigate } from "react-router-dom";
// import { Tooltip } from "@mui/material";
// ;

// const Card = ({ blog, users }) => {
//   const navigate = useNavigate()
//   const defaultImage =
//     "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg";
//   const defaultAuthorImage =
//     "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";

   
//   return (
//     <article className="max-w-full mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm">
//       <img
//         src={blog?.image || defaultImage}
//         onError={(e) => {
//           e.target.src = defaultImage;
//         }}
//         loading="lazy"
//         alt={blog?.title}
//         className="w-full h-48 rounded-t-md"
        
//       />

//       <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
//         <Tooltip 
//         title={"Go to Profile"}
//         arrow>
//           <div className="flex-none w-10 h-10 rounded-full">
//           <img
//             src={
//               users.find((user) => user._id === blog?.userId)?.image ||
//               defaultAuthorImage
//             }
//             className="w-full h-full rounded-full cursor-pointer"
//             alt={blog?.userId}
//            onClick={()=> navigate (`/profil/${blog?.userId}`)}
           
//           />
//         </div>
//         </Tooltip>
        
//         <div className="ml-3">
//           <span className="block text-gray-900">
//             {users.find((user) => user._id === blog?.userId)?.username ||
//               "Unknown User"}
//           </span>
//           <span className="block text-gray-400 text-sm">
//             {new Date(blog?.createdAt).toLocaleString()}
//           </span>
//         </div>
//       </div>
//       <div className="pt-3 ml-4 mr-2 mb-3 h-32">
//         <h3 className="text-xl text-gray-900">{blog?.title}</h3>
//         <p className="text-gray-400 text-sm mb-1 line-clamp-3 min-h-[4.5rem]">
//           {blog?.content}
//         </p>
//       </div>

      
//         <IconComp
//           users={users}
//           blog={blog}
         
          
//         />
      
//     </article>
//   );
// };

// export default React.memo(Card);
