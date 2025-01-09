import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className=" flex justify-center items-center bg-gradient-to-r from-indigo-300 from-33% via-sky-300 via-66% to-pink-200 to-99% h-[100vh] box-content">
      <Outlet />
    </div>
  );
};

export default App;
