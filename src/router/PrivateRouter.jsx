import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {
  const { currentUserId } = useSelector((state) => state.auth.user);

  return currentUserId ? <Outlet /> : <Navigate to="login" />
}

export default PrivateRouter
