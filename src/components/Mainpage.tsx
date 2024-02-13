import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FaHome } from "react-icons/fa";
import { MdOutlineRoundaboutRight } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";





export function Mainpage() {
  
  return (
    <main>
      
      <div className="MainButtons">
        <Box sx={{ "& button": { m: 1 } }}>
          <Button variant="outlined" size="medium" >
            Menu
          </Button>
          <Button variant="outlined" size="medium" >
            Book now
          </Button>
        </Box>
      </div>

      <header className="topnav">
        <section className="p-menu1">
          <nav id="navbar" className="navigation" role="navigation">
            <input id="toggle1" type="checkbox" />
            <label className="hamburger1" htmlFor="toggle1">
              <div className="top"></div>
              <div className="meat"></div>
              <div className="bottom"></div>
            </label>

            <nav className="menu1">
    <Link to="/" className="link1"><FaHome /> Home</Link>
    <Link to="/about" className="link2"><MdOutlineRoundaboutRight />About</Link>
    <Link to="/booking" className="link3"><TbBrandBooking />Booking</Link>
    
</nav>
          </nav>
        </section>
      </header>
      
   </main>
   
  );
}
