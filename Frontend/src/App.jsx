import React from "react";
import { Outlet } from "react-router-dom";


const App = () => {
  return (
    <div className={`w-full box-border flex-col flex  bg-white dark:bg-black transition-colors duration-300 `}>
        <Outlet />
    </div>
  );
};

export default App;
