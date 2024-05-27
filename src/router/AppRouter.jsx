import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import BlogDetails from "../pages/BlogDetails";
import AddBlog from "../pages/AddBlog";
import Profile from "../pages/Profile";
import Categories from "../pages/Categories";
import SearchResults from "../pages/SearchResults";
import NotFound from "../pages/NotFound";
import About from "../pages/About";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="categories/:id" element={<Categories />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="about" element={<About />} />
      <Route path="" element={<PrivateRouter />}>
        <Route path="details/:id" element={<BlogDetails />} />
        <Route path="addblog" element={<AddBlog />} />
        <Route path="searchresults" element={<SearchResults />} />
        <Route path="profil/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
