import { Navigate } from "react-router-dom"; 
import {useAuth } from "./AuthProvider";

const PublicRoute=({children})=>{
    const {auth}= useAuth();
    return auth.isAuth ? <Navigate to={'/home'}/> : children;

}

export default PublicRoute;