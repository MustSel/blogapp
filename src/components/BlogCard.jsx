import React from "react";
import IconComp from "./IconComp";
import { useNavigate } from "react-router-dom";
import {
  CardMedia,
  Tooltip,
  Card,
  Box,
  Typography,
  Avatar,
  CardContent,
} from "@mui/material";
const BlogCard = ({ blog, users }) => {
  const navigate = useNavigate();
  const defaultImage =
    "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg";
  const defaultAuthorImage =
    "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";

    

  return (
    <Card
      sx={{
        width: 380,
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        image={blog?.image || defaultImage}
        onError={(e) => {
          e.target.src = defaultImage;
        }}
        alt={blog?.title}
        sx={{
          height: "200px",
          objectFit: "cover",
          "&:hover": { transform: "scale(1.05)" },
        }}
      />
      <CardContent sx={{ flexGrow: 1, mt:'10px' }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Tooltip title={"Go to Profile"} arrow>
            <Avatar
              sx={{cursor:"pointer"}}
              src={
                users.find((user) => user._id === blog?.userId)?.image ||
                defaultAuthorImage
              }
              onClick={() => navigate(`/profil/${blog?.userId}`)}
            />
          </Tooltip>

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2">
              {users.find((user) => user._id === blog?.userId)?.username ||
                "Unknown User"}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(blog?.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Typography
            gutterBottom
            variant="h5"
            component="div"
           
          >
            {blog?.title}
          </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3, 
            WebkitBoxOrient: "vertical",
          }}
        >
          {blog?.content}
        </Typography>

      </CardContent>
        <IconComp users={users} blog={blog} />
    </Card>
  );
};

export default React.memo(BlogCard);
