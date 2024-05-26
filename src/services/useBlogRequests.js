import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import {
  fetchStart,
  getBlogDetailsSuccess,
  getBlogsSuccess,
  getCategoriesSuccess,
  getSingleUserSuccess,
  getUserBlogsSuccess,
  getUserCommentsSuccess,
  getUsersSuccess,
  likedSuccess,
} from "../features/blogsSlice";

const useBlogRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosToken, axiosPublic, axiosAdminToken } = useAxios();

  const getBlogs = async (page) => {
    dispatch(fetchStart());
    try {
      const res = await axiosPublic(
        "/blogs/?sort[createdAt]=desc&limit=6&page=" + page
      );
      console.log(res);
      dispatch(getBlogsSuccess(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserBlogs = async (id, page, isPublish) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(
        "/blogs/?filter[isPublish]=" +
          isPublish +
          "&sort[createdAt]=desc&limit=3&page=" +
          page +
          "&filter[userId]=" +
          id
      );

      dispatch(getUserBlogsSuccess({ data, isPublish }));
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogDetails = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken("/blogs/" + id);

      dispatch(getBlogDetailsSuccess(data));
    } catch (error) {
      toastErrorNotify("blog bilgisi alma başarısız oldu");
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const {
        data: { data },
      } = await axiosPublic("/categories");

      dispatch(getCategoriesSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async (id) => {
    try {
      if (id) {
        const { data } = await axiosAdminToken("/users/" + id);
        console.log(data);
        dispatch(getSingleUserSuccess(data));
      } else {
        const { data } = await axiosAdminToken("/users");
        console.log(data);
        dispatch(getUsersSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likesss = async (id) => {
    try {
      const { data } = await axiosToken.post("/blogs/" + id + "/postLike", {});
      console.log(data);
      dispatch(likedSuccess({ id, data }));
    } catch (error) {
      console.log(error);
    }
  };
  const addBlog = async (blogData) => {
    try {
      const { data } = await axiosToken.post("/blogs/", blogData);
      console.log(data);
      toastSuccessNotify("Blog Başarıyla Paylaşıldı.");
      navigate("/details/" + data.data._id);
    } catch (error) {
      console.log(error);
      toastErrorNotify("Blog Paylaşılamadı.");
    }
  };
  const editBlog = async (id, blogData) => {
    try {
      const { data } = await axiosToken.put("/blogs/" + id, blogData);

      toastSuccessNotify("Blog Başarıyla Düzenlendi.");
      navigate("/details/" + data?.new?._id);
    } catch (error) {
      console.log(error);
      toastErrorNotify("Blog Düzenlenemedi.");
    }
  };
  const deleteBlog = async (id) => {
    try {
      const res = await axiosToken.delete("/blogs/" + id);
      console.log(res);
      toastSuccessNotify("Blog Başarıyla Silindi");
    } catch (error) {
      console.log(error);
      toastErrorNotify("Blog Silinemedi");
    }
  };
  const handleComments = async (id, commentData, userId) => {
    dispatch(fetchStart());
    try {
      if (id && commentData) {
        const res = await axiosToken.put("/comments/" + id, commentData);
        toastSuccessNotify("Yorum Başarıyla Güncellendi");
        console.log(res);
      } else if (id && !commentData) {
        const res = await axiosToken.delete("/comments/" + id);
        toastSuccessNotify("Yorum Başarıyla Silindi");
        console.log(res);
      } else if (!id && commentData) {
        const res = await axiosToken.post("/comments/", commentData);
        toastSuccessNotify("Yorum Başarıyla Eklendi");
        console.log(res);
      } else if (!id && !commentData && userId) {
        const { data } = await axiosToken(
          "/comments/?filter[userId]=" + userId
        );
        console.log(data);
        dispatch(getUserCommentsSuccess(data));
      }
    } catch (error) {
      toastErrorNotify("Yorum işlemi başarısız oldu");
      console.log(error);
    }
  };

  return {
    getBlogs,
    getCategories,
    getUsers,
    likesss,
    getBlogDetails,
    addBlog,
    editBlog,
    deleteBlog,
    handleComments,
    getUserBlogs,
  };
};

export default useBlogRequests;
