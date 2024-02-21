import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Booking from '../Pages/Booking';
import Contact from '../Pages/Contact';
import Admin from '../Pages/Admin';
import Formadmin from '../Components/Main/Formadmin';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/Bookingadmin" element={<Formadmin />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default AppRoutes;
