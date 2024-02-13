import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FaHome } from "react-icons/fa";
import { MdOutlineRoundaboutRight } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";
import '../Style/Mainpage.css';


export function Home() {
  return (
    <main>
      <div className="MainButtons">
        <Box sx={{ "& button": { m: 1 } }}>
          <Button variant="outlined" size="medium">
            Menu
          </Button>
          <Button variant="outlined" size="medium">
            Book now
          </Button>
        </Box>
      </div>
    
      
    </main>
  );
}
