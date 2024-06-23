import React, { useCallback, useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";

import useBlogRequests from "../services/useBlogRequests";
import BlogCard from "../components/BlogCard";
import { Grid, Pagination, Stack } from "@mui/material";
import ScrollToTop from "../components/ScrollToTop";
import { fetchStart, getBlogsSuccess } from "../features/blogsSlice";
import { useParams } from "react-router-dom";
import useAxios from "../services/useAxios";

const Categories = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { axiosToken } = useAxios();

  const { getUsers, liked } = useBlogRequests();
  const { blogs, users, pages, categories } = useSelector(
    (state) => state.blogs
  );
  const [currentPage, setCurrentPage] = useState(pages?.current || 1);
  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
  }, []); 
  const getCategoryBlogs = async (id) => {
    dispatch(fetchStart());
    try {
      const res = await axiosToken(`/blogs/?search[categoryId]=${id}`);
      console.log(res);
      dispatch(getBlogsSuccess(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const MemoizedBlogCard = React.memo(BlogCard);
  const categoryName = useMemo(() => {
    return categories?.find((cat) => cat._id === id)?.name;
  }, [id, categories]);
  console.log("categories render oldu");
  useEffect(() => {
    getCategoryBlogs(id);
  }, [id]);

  useEffect(() => {
    getUsers();
  }, [liked]);

  return (
    <>
      <ScrollToTop />
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 3 }}>
          <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="text-center">
              <div>
                <h1 className="text-3xl text-gray-800 font-semibold mb-5">
                  {categoryName} Blogs
                </h1>
              </div>
            </div>
            <Grid
              container
              gap={2}
              justifyContent={"center"}
              maxWidth={"1500px"}
              margin={"auto"}
            >
              {blogs?.map((blog, idx) => (
                <Grid item key={idx}>
                  <MemoizedBlogCard
                    blog={blog}
                    liked={liked}
                    users={users}
                    page={currentPage}
                  />
                </Grid>
              ))}
            </Grid>
          </section>
          <Stack spacing={2} alignItems="center" mt={4}>
            <Pagination
              count={pages.total}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Categories;
