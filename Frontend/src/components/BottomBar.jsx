import { House, Search, Send, TvMinimalPlay,CircleUserRound } from 'lucide-react';
import { useContext} from 'react';
import { ThemeContext } from '../utils/ThemeContext';


const BottomBar=()=>{
    const {theme}= useContext(ThemeContext);
    const size=24;
    return (
        <div className='sm:px-10 box-border p-2 m-auto border-t border-gray-300 transition-colors duration-300 dark:border-gray-700 fixed bottom-0 right-0 left-0 flex py-2 w-full z-30 justify-between bg-white dark:bg-black max-w-[450px]'>
            <div className=''>
                <span className='w-[18px] h-[18px] rounded-full absolute bg-red-600  translate-x-4 -translate-y-0.5 text-white text-center text-[12px] font-bold'>4</span> 
                <House size={size} color={theme ? "white" : "black"} className="transition-colors duration-300"/>
            </div>
            <div>
                <Search size={size} color={theme ? "white" : "black"} className="transition-colors duration-300"/>
            </div>
            <div>
                <TvMinimalPlay size={size} color={theme ? "white" : "black"} className="transition-colors duration-300"/>
            </div>
            <div>
                <span className='w-[18px] h-[18px] rounded-full absolute bg-red-600  translate-x-4 -translate-y-0.5 text-white text-center text-[12px] font-bold'>4</span> 
                <Send size={size} color={theme ? "white" : "black"} className="transition-colors duration-300"/>
            </div>
            <div>
                
                <CircleUserRound size={size} color={theme ? "white" : "black"} className="transition-colors duration-300 "/>
            </div>
        </div>
    )
}

export default BottomBar;