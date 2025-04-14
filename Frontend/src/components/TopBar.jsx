import axios from "axios";
import ToogleTheme from "./ToogleTheme";
import { Heart, LogOut  } from 'lucide-react';
import {useAuth} from "../utils/AuthProvider.jsx"


const TopBar = () => {
    const apiUrl= import.meta.env.VITE_API_URL;
    const {setAuth}= useAuth();
  
    const handleLogout= async()=>{
      try {
        const res = await axios.post(`${apiUrl}/user/logout`, {}, {
          withCredentials: true
        });
        if(res.data.ok){
          setAuth({ isAuth: false, user: null });
        }
      } catch (error) {
        console.log(error)
      }
    }


    return (

        <div className="border-b box-border border-gray-200 dark:border-gray-800 flex px-3 py-0.5 items-center  bg-white dark:bg-black fixed right-0 left-0 z-30 m-auto max-w-[450px] transition-colors duration-300">
            <div className='flex-1 w-fit font-(family-name:--font-dancing) tracking-wide  text-4xl font-bold text-black dark:text-white transition-colors duration-300'>InstaSocial</div>
            <div className="flex items-center gap-2">
                <Heart className="dark:text-white cursor-pointer text-black transition-colors duration-300 " />
                <ToogleTheme/>
                <LogOut onClick={()=> handleLogout()} className="dark:text-white text-black transition-colors duration-300 cursor-pointer "/>

            </div>
        </div>

    )

}

export default TopBar;