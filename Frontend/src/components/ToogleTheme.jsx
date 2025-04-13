import { useContext, useEffect, useState } from "react";
import { Sun } from "lucide-react";
import { ThemeContext } from "../utils/ThemeContext";

const ToogleTheme = () => {
  const {theme, setTheme}= useContext(ThemeContext);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (theme) {
      setRotation((prev) => prev + 90);
    } else {
      setRotation((prev) => prev - 90); 
    }
  }, [theme]);

  return (
    <div className="flex items-center justify-center ">
      <button
        onClick={()=>{setTheme((prev)=>!prev)}}
        className="transition-transform duration-500 ease-in-out p-2 rounded-full hover:scale-110"
      >
        <Sun
          className="transition-all duration-500 ease-in-out cursor-pointer"
          style={{ transform: `rotate(${rotation}deg)` }}
          
          color = {theme ? "white" : "black"}
          size={26}
        />
      </button>
    </div>
  );
};

export default ToogleTheme;
