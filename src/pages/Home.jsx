import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { useSelector } from "react-redux";

import useBlogRequests from "../services/useBlogRequests";

import { Button, Grid, Pagination, Stack } from "@mui/material";
import ScrollToTop from "../components/ScrollToTop";
import BlogCard from "../components/BlogCard";

function Home({ inProfile, id }) {
  const { currentUserId } = useSelector((state) => state.auth.user);
  const { getBlogs, getUsers, getUserBlogs } = useBlogRequests();
  const { blogs, users, pages, userBlogs,liked } = useSelector(
    (state) => state.blogs
  );
  const [currentPage, setCurrentPage] = useState(pages?.current || 1);
  
  const [isPublish, setIsPublish] = useState(true);

  useEffect(() => {
    if (inProfile) {
      getUserBlogs(id, currentPage, isPublish);
      
    } else {
      getBlogs(currentPage);
      getUsers();
    }
  }, [currentPage, liked, id, isPublish]);

  useEffect(() => {
    if(inProfile){
      setCurrentPage(1)
    }
  }, [inProfile])
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <ScrollToTop />
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 3 }}>
          <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="text-center">
              {inProfile ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Button
                    variant={isPublish ? "contained" : "outlined"}
                    onClick={() => {
                      setIsPublish(true);
                      setCurrentPage(1);
                    }}
                  >
                    Published Blogs
                  </Button>
                  {currentUserId === id && (
                    <Button
                      variant={isPublish ? "outlined" : "contained"}
                      onClick={() => {
                        setIsPublish(false);
                        setCurrentPage(1);
                      }}
                    >
                      Draft Blogs
                    </Button>
                  )}
                </Box>
              ) : (
                <div>
                  <h1 className="text-3xl text-gray-800 font-semibold">Blogs</h1>
                  <p className="mt-3 mb-5 text-gray-500">
                    Blogs that are loved by the community. Updated every hour.
                  </p>
                </div>
              )}
            </div>
            <Grid container gap={2} justifyContent={"center"} maxWidth={"1500px"} margin={"auto"}> 
              {(inProfile
                ? isPublish
                  ? userBlogs.published
                  : userBlogs.drafted
                : blogs
              )?.map((blog, idx) => (
                <Grid item  key={idx}> 
            <BlogCard blog={blog} liked={liked} users={users} page={currentPage} />
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
}

export default Home;



