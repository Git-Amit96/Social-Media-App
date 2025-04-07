import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const RedirectBasedOnAuth = () => {
  const { auth } = useAuth();
  return auth?.isAuth ? <Navigate to="/home" /> : <Navigate to="/auth" />;
};

export default RedirectBasedOnAuth;
