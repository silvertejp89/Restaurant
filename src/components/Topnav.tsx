import { FaHome } from "react-icons/fa";
import { MdOutlineRoundaboutRight } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";

export function Topnav() {
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
            <Link to="/" className="link1">
              <FaHome /> Home
            </Link>
            <Link to="/about" className="link2">
              <MdOutlineRoundaboutRight /> About
            </Link>
            <Link to="/booking" className="link3">
              <TbBrandBooking /> Booking
            </Link>
          </nav>
        </nav>
      </section>
    </div>
  );
}
