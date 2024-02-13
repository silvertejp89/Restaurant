import { useState, useEffect } from "react";

type Booking = {
  _id: string;
  date: string;
  time: string;
  numberOfGuests: string;
  customerId: string;
};

type CustomerData = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
};

type CustomerBooking = {
  customerId: string;
  customerData: CustomerData;
  bookings: Booking[];
};

const Admin = () => {
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65ca2900434ff1a78715c30c"
      );
      const data: Booking[] = await response.json();
      const uniqueCustomers = [
        ...new Set(data.map((item: Booking) => item.customerId)),
      ];
      const customerBookings: CustomerBooking[] = await Promise.all(
        uniqueCustomers.map(async (customerId: string) => {
          const response = await fetch(
            `https://school-restaurant-api.azurewebsites.net/customer/${customerId}`
          );
          const customerData: CustomerData[] = await response.json();
          return {
            customerId,
            customerData: customerData[0],
            bookings: data.filter(
              (item: Booking) => item.customerId === customerId
            ),
          };
        })
      );
      setBookings(customerBookings);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <button onClick={fetchBookings}>View Bookings</button>
      <ul>
        {bookings.map((customerBooking) => (
          <div key={customerBooking.customerId}>
            <li>
              Customer ID: {customerBooking.customerId}, Name:{" "}
              {customerBooking.customerData.name}{" "}
              {customerBooking.customerData.lastname}, Email:{" "}
              {customerBooking.customerData.email}, Phone:{" "}
              {customerBooking.customerData.phone}
            </li>
            {customerBooking.bookings.map((booking) => (
              <li key={booking._id}>
                Booking ID: {booking._id}, Date: {booking.date}, Time:{" "}
                {booking.time}, Number of Guests: {booking.numberOfGuests}
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
