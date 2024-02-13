import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Hem</NavLink>
        </li>
        <li>
          <NavLink to="/about">Om oss</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Kontakt</NavLink>
        </li>
        <li>
          <NavLink to="/Booking">Booking</NavLink>
        </li>
      </ul>
    </nav>
  );
};