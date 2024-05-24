import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import BlogDetails from "../pages/BlogDetails";
import AddBlog from "../pages/AddBlog";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="" element={<PrivateRouter />}>
        <Route path="details/:id" element={<BlogDetails />} />
        <Route path="addblog" element={<AddBlog />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
