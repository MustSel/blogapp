import { Box, Button, Container, TextField, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import { useRef, useState } from "react";
import useBlogRequests from "../services/useBlogRequests";

const Comments = ({ id, comments, users, onCommentChange }) => {
  const { handleComments } = useBlogRequests();
  const [commentText, setCommentText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const hrRef = useRef(null);

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };
  const handleEdit = (commentId, comment) => {
    setCommentText(comment);
    setEditMode(true);
    setEditCommentId(commentId);
    hrRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      blogId: id,
      comment: commentText,
    };
    if (editMode) {
     await handleComments(editCommentId, commentData);
    } else {
     await handleComments(false, commentData);
    }
    onCommentChange();
    setCommentText("");
    setEditMode(false);
    setEditCommentId(null);
  };


  return (
    <>
      <hr ref={hrRef} className=" mt-10 " />
      <Container maxWidth="md">
        <Typography mt={4} mx={"auto"} variant="h3">
          Comments
        </Typography>
        <TextField
          
          name="comment"
          label="Comment"
          value={commentText}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={8}
          required
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          color="success"
        >
          {editMode ? "Update Comment" : "Add Comment"}
        </Button>
        <Box mt={12} display="flex" flexWrap={"wrap"} justifyContent="center">
          {comments?.map((comment) => (
            <CommentCard
              key={comment?._id}
              handleComments={handleComments}
              {...comment}
              users={users}
              onEdit={handleEdit}
              onCommentChange={onCommentChange}
            />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Comments;
