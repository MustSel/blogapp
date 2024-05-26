import { Box, Button, Container, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import { useRef, useState } from "react";
import useBlogRequests from "../services/useBlogRequests";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Comments = ({ id, comments, users, onCommentChange }) => {
  const { handleComments } = useBlogRequests();
  const [commentText, setCommentText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const hrRef = useRef(null);

  const handleChange = (value) => {
    setCommentText(value);
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
      <Box mt={16} mb={4}>
        <hr ref={hrRef} />
      </Box>

      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            mt={4}
            variant="h4"
            sx={{ mb: 2 }}
            fontWeight={700}
            textAlign="center"
          >
            Comments
          </Typography>
          <Box sx={{ width: "100%", maxWidth: 800 }}>
            <ReactQuill
              value={commentText}
              onChange={handleChange}
              style={{ height: "200px" }}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ["link"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "color",
                "background",
                "align",
              ]}
              placeholder="Write your comment here..."
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 6 }}
            >
              <Button
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                color="success"
              >
                {editMode ? "Update Comment" : "Add Comment"}
              </Button>
              {editMode && (
                <Button
                  onClick={() => {
                    setEditMode(false);
                    setEditCommentId(null);
                    setCommentText(""); // Metin alanını temizle
                  }}
                  variant="contained"
                  fullWidth
                  color="error"
                >
                  Cancel Edit
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Box mt={12} display="flex" flexWrap="wrap" justifyContent="center">
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
