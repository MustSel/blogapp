import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { useSelector } from "react-redux";

import useBlogRequests from "../services/useBlogRequests";
import Card from "../components/Card";
import { Button, Pagination, Stack } from "@mui/material";
import ScrollToTop from "../components/ScrollToTop";

function Home({ inBlog, id }) {
  const { currentUserId } = useSelector((state) => state.auth.user);
  const { getBlogs, getUsers, getUserBlogs } = useBlogRequests();
  const { blogs, users, pages, userBlogs } = useSelector(
    (state) => state.blogs
  );
  const [currentPage, setCurrentPage] = useState(pages?.current || 1);
  const { liked } = useSelector((state) => state.blogs);
  const [isPublish, setIsPublish] = useState(true);

  useEffect(() => {
    if (inBlog) {
      getUserBlogs(id, currentPage, isPublish);
    } else {
      getBlogs(currentPage);
      getUsers();
    }
  }, [currentPage, liked, id, isPublish]);

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
              {inBlog ? (
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
                  <h1 className="text-3xl text-gray-800 font-semibold">Blog</h1>
                  <p className="mt-3 text-gray-500">
                    Blogs that are loved by the community. Updated every hour.
                  </p>
                </div>
              )}
            </div>
            <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {(inBlog
                ? isPublish
                  ? userBlogs.published
                  : userBlogs.drafted
                : blogs
              )?.map((blog, idx) => (
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

//? update user fonk

//? categories search fonksi
//?about
//?404
//?profile page buton to profil

//? delete blog warning

//?search buton
//?categories için home kopyala


//?arandıktan sonra beyen yapınca sayfa yenileniyor home atıyor
//?detail içinde yoruma basınca  yorumların oldugu yere gelsin