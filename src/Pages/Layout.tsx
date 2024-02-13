import { Outlet } from "react-router-dom";

import { Topnav } from "../components/Topnav";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <>
      <Topnav />

      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
};
