import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useBlogRequests from "../services/useBlogRequests";
import { setEditMode } from "../features/blogsSlice";
const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    categoryId: "",
    isPublish: false,
  });
  const [previewMode, setPreviewMode] = useState(false); 
  const dispatch = useDispatch();
  const { categories, editMode } = useSelector((state) => state.blogs);
 
  const { addBlog, editBlog } = useBlogRequests();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      isPublish: !prevData.isPublish,
    }));
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  const getCategoryName = (categoryId) => {
    return categories.find((cat) => cat._id === categoryId)?.name || "Unknown";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode.mode) {
      editBlog(editMode?.blogId, formData);
    } else {
      addBlog(formData);
    }
    dispatch(
      setEditMode({
        mode: false,
        blog: {
          title: "",
          image: "",
          content: "",
          categoryId: "",
          isPublish: false,
        },
      })
    );
  };

  useEffect(() => {
    if (editMode?.mode) {
      setFormData(editMode?.blog);
    } else {
      setFormData({
        title: "",
        image: "",
        content: "",
        categoryId: "",
        isPublish: false,
      })

    }
  }, [editMode]);

  return (
    <Container maxWidth="lg">
      <Box
        mt={4}
        display="flex"
        justifyContent="center"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box width={{ xs: "100%", md: "50%" }} mr={{ xs: 0, md: 4 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              name="image"
              label="Image URL"
              value={formData.image}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <FormControl fullWidth margin="normal" variant="outlined" required>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="content"
              label="Content"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={8}
              required
            />

            <Box display="flex" justifyContent={"center"} alignItems="center">
              <p>Draft</p>
              <Switch checked={formData.isPublish} onChange={handleToggle} />
              <p>Publish</p>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                type="button"
                variant="contained"
                onClick={handlePreview}
                sx={{ mr: 2 }} 
              >
                {previewMode ? "Edit" : "Preview"}
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {editMode.mode ? "UpdateBlog" : "Add Blog"}
              </Button>
            </Box>
          </form>
        </Box>
        {previewMode && (
          <Box
            width={{ xs: "100%", md: "50%" }}
            ml={{ xs: 0, md: 4 }}
            mt={{ xs: 4, md: 0 }}
          >
            <Card sx={{ maxWidth: 800, width: "100%" }}>
              <Box
                component="img"
                src={formData.image || "https://via.placeholder.com/800x300"}
                alt={formData.title}
                sx={{ width: "100%", height: 300, objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x300";
                }}
              />
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ width: 50, height: 50 }} />
                  <Box ml={2}>
                    <Typography variant="h6" component="div">
                      Unknown User
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  {formData.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {formData.content}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Category: {getCategoryName(formData.categoryId)}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AddBlog;
