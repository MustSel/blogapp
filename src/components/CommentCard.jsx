import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

const CommentCard = ({ users, comment, __v, createdAt, updatedAt, _id,  userId, onEdit, handleComments, onCommentChange }) => {
  const { currentUserId } = useSelector((state) => state.auth.user);
  const author = users.find((user) => user._id === userId?._id) || {};
  const cleanHTML = DOMPurify.sanitize(comment);
  const handleDelete = async () => {
    await handleComments(_id)
    onCommentChange()
  }

  return (
    <Card sx={{ maxWidth: 800, width: "100%", marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={author.image || avatar}
            alt={author.username || "Unknown User"}
            sx={{ width: 50, height: 50 }}
          />
          <Box ml={2}>
            <Typography variant="h6" component="div">
              {author.username || "Unknown User"}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" mr={1} color="text.secondary">
                {new Date(createdAt).toLocaleString()}
              </Typography>
              {__v !== 0 && (
                <Typography variant="caption" color="text.secondary">
                  (updated: {new Date(updatedAt).toLocaleString()})
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Typography variant="p" component="h1" gutterBottom>
        <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
        </Typography>
      </CardContent>
      {userId?._id == currentUserId && (
        <CardActions sx={{justifyContent:"end"}}>
          <Button
            sx={{ marginRight: "5px" }}
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => onEdit(_id, comment)}
          >
            Edit
          </Button>
          <Button
            sx={{ marginRight: "5px" }}
            variant="outlined"
            size="small"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CommentCard;
