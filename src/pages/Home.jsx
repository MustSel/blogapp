import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { useSelector } from "react-redux";

import useBlogRequests from "../services/useBlogRequests";
import Card from "../components/Card";
import { Pagination, Stack } from "@mui/material";
import ScrollToTop from "../components/ScrollToTop";

function Home({ inBlog, id }) {
  const { user } = useSelector((state) => state.auth);
  const { getBlogs, getUsers, getUserBlogs } = useBlogRequests();
  const { blogs, users, pages, userBlogs } = useSelector((state) => state.blogs);
  const [currentPage, setCurrentPage] = useState(pages?.current || 1);
  const { liked } = useSelector((state) => state.blogs);
const [drafted,setDrafted] = useState(true)
  console.log(userBlogs);
  console.log(inBlog);
  useEffect(() => {
    if (inBlog) {
      getUserBlogs(id);
    } else {
      getBlogs(currentPage);
      getUsers();
    }
  }, [currentPage, liked, id]);

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
              <h1 className="text-3xl text-gray-800 font-semibold">Blog</h1>
              <p className="mt-3 text-gray-500">
                Blogs that are loved by the community. Updated every hour.
              </p>
            </div>
            <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {(inBlog ? (drafted?userBlogs.drafted :userBlogs.published)  : blogs)?.map((blog, idx) => (
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

//? blog button in profil
//? profil edit user buton
//? update user fonk
//? blog comments length + draft sayısı ekle
//? categories search fonksi
//?about
//?404
//?profile page buton to profil
//? login- register currentusera gösterme
//? delete blog warning
//? navbar username
//?search buton
//?categories için home kopyala

