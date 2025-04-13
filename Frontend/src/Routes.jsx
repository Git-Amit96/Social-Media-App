import { createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home.jsx";
import Auth from "./Pages/Auth.jsx";
import Chat from "./Pages/Chat.jsx";
import PublicRoute from "./utils/PublicRoute.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import RedirectBasedOnAuth from "./utils/RedirectBasedOnAuth.jsx";



const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {   
               index: true,
               element: <RedirectBasedOnAuth/>
            },
            {
                path: 'auth',
                element: <PublicRoute><Auth/></PublicRoute>
            },
            {
                path: 'home',
                element: <ProtectedRoute><Home/></ProtectedRoute>,
                children: [
                    {
                        path: "chat",
                        element: <Chat/>
                    }
                ]
            }
        ]
    }
])

export default Routes;
