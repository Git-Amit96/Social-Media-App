import { Navigate } from "react-router-dom"; 
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  return auth?.isAuth ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;