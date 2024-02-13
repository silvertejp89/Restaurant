

import { Outlet } from "react-router-dom";

import { Topnav } from "../components/Topnav";



export const Layout = () => {
  return (
    <>
      
        <Topnav/>
        
      
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};