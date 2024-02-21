import { useEffect, useState } from "react";
import "../../Styles/Main/Admin.css";
import { Link } from "react-router-dom";

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
  const [isVisible, setIsVisible] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  useEffect(() => {
    // Anropa fetchBookings när komponenten mountar
    fetchBookings();
  }, []); // Tomt beroendearray för att köra useEffect en gång när komponenten mountar

  const fetchBookings = async () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
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
        setIsVisible(true);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      const response = await fetch(
        `https://school-restaurant-api.azurewebsites.net/booking/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting booking");
      }
      fetchBookings();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const confirmDelete = (id: string) => {
    if (window.confirm("Do you want to delete this booking?")) {
      deleteBooking(id);
    }
  };

  const startEditing = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const handleEditChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editingBooking) {
      setEditingBooking({
        ...editingBooking,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingBooking) {
      try {
        //här någonstans ska det kollas bokningar.
        const response = await fetch(
          `https://school-restaurant-api.azurewebsites.net/booking/update/${editingBooking._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: editingBooking._id,
              restaurantId: "65ca2900434ff1a78715c30c",
              date: editingBooking.date,
              time: editingBooking.time,
              numberOfGuests: editingBooking.numberOfGuests,
              customerId: editingBooking.customerId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Error updating booking");
        }
        fetchBookings();
        setEditingBooking(null);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="Admin">
      {/* <button onClick={fetchBookings}>
        {isVisible ? "Close Bookings" : "Show Bookings"}
      </button> */}
      {/* {isVisible && ( */}
      <h2>Admin - Bookings:</h2>
      <ul>
        {bookings.map((customerBooking) => (
          <div key={customerBooking.customerId}>
            <li className="customer-id">
              Name: {customerBooking.customerData.name}{" "}
              {customerBooking.customerData.lastname}, Email:{" "}
              {customerBooking.customerData.email}, Phone:{" "}
              {customerBooking.customerData.phone},
            </li>
            {customerBooking.bookings.map((booking) => (
              <li key={booking._id}>
                Date: {booking.date}
                <br /> Time: {booking.time}
                <br /> Number of Guests: {booking.numberOfGuests}
                <br /> Number of Tables:
                {Math.ceil(parseInt(booking.numberOfGuests) / 6)}
                <br />
                <button
                id="adminButtonEdit"
                  style={{ fontSize: "12px", padding: "5px" }}
                  onClick={() => startEditing(booking)}
                >
                  Edit
                </button>
                <button
                id="adminButtonDelete"
                  style={{ fontSize: "12px", padding: "5px" }}
                  onClick={() => confirmDelete(booking._id)}
                >
                  Delete
                </button>
              </li>
            ))}
           
          </div>
          
        ))}
        <button> <Link to="/Bookingadmin"  id="adminButton" style={{ fontSize: "25px", padding: "5px" }}>Lägg till bokning</Link></button>
      </ul>
      {/* )} */}
      {editingBooking && (
        
        <form
          onSubmit={handleEditSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label>
            Date:
            <input
              type="text"
              name="date"
              value={editingBooking.date}
              onChange={handleEditChange}
              style={{ margin: "10px" }}
            />
          </label>
          <label>
            Time:
            <select
              name="time"
              value={editingBooking.time}
              onChange={handleEditChange}
              style={{ margin: "10px" }}
            >
              <option value="18:00">18:00</option>
              <option value="21:00">21:00</option>
            </select>
          </label>
          <label>
            NoG:
            <input
              type="number"
              name="numberOfGuests"
              value={editingBooking.numberOfGuests}
              onChange={handleEditChange}
              style={{ margin: "10px" }}
              min="1"
              max="90"
            />
          </label>
          <button
            style={{ fontSize: "12px", padding: "5px", margin: "10px" }}
            type="submit"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default Admin;
