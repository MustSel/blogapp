import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";

import useBlogRequests from "../services/useBlogRequests";
import Card from "../components/Card";
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
  const { blogs, users, pages } = useSelector((state) => state.blogs);
  const [currentPage, setCurrentPage] = useState(pages?.current || 1);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const getCategoryBlogs = async (id) => {
    dispatch(fetchStart());
    try {
      const res = await axiosToken(`/blogs/?search[categoryId]=${id}`);

      dispatch(getBlogsSuccess(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryBlogs(id);
    getUsers();
  }, [id, liked]);

  return (
    <>
      <ScrollToTop />
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 3 }}>
          <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="text-center">
              <div>
                <h1 className="text-3xl text-gray-800 font-semibold">Blog</h1>
                <p className="mt-3 text-gray-500">
                  Blogs that are loved by the community. Updated every hour.
                </p>
              </div>
            </div>
            <Grid container spacing={2}>  
        {blogs?.map((blog, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}> 
            <Card blog={blog} liked={liked} users={users} page={currentPage} />
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
