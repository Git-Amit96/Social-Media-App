import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";


const AuthContext = createContext();

const AuthProvider = ( {children} ) => {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    })

    const apiUrl = import.meta.env.VITE_API_URL;

    const checkUser = async () => {
        try {

            const res = await axios.get(`${apiUrl}/user/verify`, {
                withCredentials: true, 
              });
            
            if (res.data.ok) {
                setAuth({ isAuth: true, user: res.data.data})
            }
            else {
                setAuth({ isAuth: false, user: null })
                throw new Error("Verification failed! Login again");
            }

        } catch (error) {
            console.log("Log in again!", error);
        }
    }

    useEffect(() => {
        checkUser();
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
};


export const useAuth = () => {
   return useContext(AuthContext)};

export default AuthProvider;

