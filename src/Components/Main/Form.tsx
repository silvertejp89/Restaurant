import { useState } from "react";
import "../../Styles/Main/Form.css";

const Form = () => {
  const [formState, setFormState] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    numberOfGuests: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bookingData = {
      restaurantId: "65ca2900434ff1a78715c30c",
      date: formState.date,
      time: formState.time,
      numberOfGuests: formState.numberOfGuests,
      customer: {
        name: formState.name,
        lastname: formState.lastname,
        email: formState.email,
        phone: formState.phone,
      },
    };

    fetch("https://school-restaurant-api.azurewebsites.net/booking/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking created:", data);
        setFormState({
          name: "",
          lastname: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          numberOfGuests: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form id="bookingForm" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <br />
      <input
        type="text"
        id="name"
        name="name"
        required
        onChange={handleChange}
        value={formState.name}
      />
      <br />
      <label htmlFor="lastname">Last Name:</label>
      <br />
      <input
        type="text"
        id="lastname"
        name="lastname"
        required
        onChange={handleChange}
        value={formState.lastname}
      />
      <br />
      <label htmlFor="email">Email:</label>
      <br />
      <input
        type="email"
        id="email"
        name="email"
        required
        onChange={handleChange}
        value={formState.email}
      />
      <br />
      <label htmlFor="phone">Phone:</label>
      <br />
      <input
        type="tel"
        id="phone"
        name="phone"
        required
        onChange={handleChange}
        value={formState.phone}
      />
      <br />
      <label htmlFor="date">Date:</label>
      <br />
      <input
        type="date"
        id="date"
        name="date"
        required
        onChange={handleChange}
        value={formState.date}
      />
      <br />
      <label htmlFor="time">Time:</label>
      <br />
      <select
        id="time"
        name="time"
        required
        onChange={handleChange}
        value={formState.time}
      >
        <option value="">Select a time</option>
        <option value="18:00">18:00 - 21:00</option>
        <option value="21:00">21:00 - 24:00</option>
      </select>
      <br />
      <label htmlFor="numberOfGuests">Number of Guests:</label>
      <br />
      <input
        type="number"
        id="numberOfGuests"
        name="numberOfGuests"
        required
        onChange={handleChange}
        value={formState.numberOfGuests}
        min="1"
        max="6"
      />
      <br />
      <input type="submit" value="Reserve" />
    </form>
  );
};

export default Form;
