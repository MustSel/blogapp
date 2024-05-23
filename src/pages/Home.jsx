import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { useSelector } from "react-redux";

import useBlogRequests from "../services/useBlogRequests";
import Card from "../components/Card";
import { Pagination, Stack } from "@mui/material";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const { getBlogs, getUsers } = useBlogRequests();
  const { blogs, users, pages } = useSelector((state) => state.blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const { liked } = useSelector((state) => state.blogs);
  useEffect(() => {
    getBlogs(currentPage);
    getUsers();
    console.log("first");
  }, [currentPage]);

  useEffect(() => {
    getBlogs(currentPage);
    console.log("second");
  }, [liked]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 3 }}>
          <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="text-center">
              <h1 className="text-3xl text-gray-800 font-semibold">Blog</h1>
              <p className="mt-3 text-gray-500">
                Blogs that are loved by the community. Updated every hour.
              </p>
            </div>
            <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {blogs?.map((blog, idx) => (
                <Card
                  key={idx}
                  blog={blog}
                  liked={liked}
                  users={users}
                  page={currentPage}
                />
              ))}
            </div>
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
