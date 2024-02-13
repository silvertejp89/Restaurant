import  { createBrowserRouter } from "react-router-dom";
import  { Home } from "./Pages/Home";
import  {About } from "./Pages/About";
import  {Contact}  from "./Pages/Contact";
import  {Booking} from "./Pages/Booking";
import  {Layout}  from "./Pages/Layout";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/movie/:movieId",
        element: <Booking />,
      },
    ],
  },
]);