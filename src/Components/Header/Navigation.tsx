import React from "react";
import "../../Styles/Header/Navigation.css";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <div className="topnav">
      <section className="p-menu1">
        <nav id="navbar" className="navigation" role="navigation">
          <input id="toggle1" type="checkbox" />
          <label className="hamburger1" htmlFor="toggle1">
            <div className="top"></div>
            <div className="meat"></div>
            <div className="bottom"></div>
          </label>

          <nav className="menu1">
            <Link className="link1" to="/">
              Home
            </Link>
            <Link className="link3" to="/Contact">
              Contact
            </Link>
            <Link className="link1" to="/booking">
              Booking
            </Link>
            <Link className="link3" to="/Admin">
              Admin
            </Link>
          </nav>
        </nav>
      </section>
    </div>
  );
};

export default Navigation;
