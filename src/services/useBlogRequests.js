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
        "/blogs/?sort[createdAt]=desc&&limit=6&page=" + page
      );
      console.log(res);
      dispatch(getBlogsSuccess(res.data));
      // dispatch(getPagesSuccess(res.data.details.pages));
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

      const categories = data.map((item) => item.name);
      dispatch(getCategoriesSuccess(categories));
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

  return { getBlogs, getCategories, getUsers, likesss, getBlogDetails };
};

export default useBlogRequests;
