import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import {
  fetchStart,
  getBlogDetailsSuccess,
  getBlogsSuccess,
  getCategoriesSuccess,
 
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
        "/blogs/?sort[createdAt]=asc&limit=6&page=" + page
      );
      console.log(res);
      dispatch(getBlogsSuccess(res.data));
      
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
  const getUsers = async () => {
    try {
      const { data } = await axiosAdminToken("/users");
      console.log(data);

      dispatch(getUsersSuccess(data));
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
      toastSuccessNotify("Blog Başarıyla Paylaşıldı.")
      navigate("/")
    } catch (error) {
      console.log(error);
      toastErrorNotify("Blog Paylaşılamadı.");
    }
  };
  const editBlog = async (id,blogData) => {
    try {
      const res = await axiosToken.put("/blogs/"+id, blogData);
      console.log(res);
      toastSuccessNotify("Blog Başarıyla Düzenlendi.")
    } catch (error) {
      console.log(error);
      toastErrorNotify("Blog Düzenlenemedi.");
    }
  };
  const deleteBlog = async (id) => {
    try {
      const res = await axiosToken.delete("/blogs/"+id);
      console.log(res);
      toastSuccessNotify("Blog Başarıyla Silindi")
    } catch (error) {
      console.log(error);
      toastErrorNotify("Blog Silinemedi")
    }
  };

  return { getBlogs, getCategories, getUsers, likesss, getBlogDetails, addBlog, editBlog, deleteBlog };
};

export default useBlogRequests;
