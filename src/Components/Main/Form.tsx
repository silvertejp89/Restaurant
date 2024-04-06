import { useEffect, useState } from "react";
import "../../Styles/Main/Form.css";
import { useNavigate } from "react-router-dom";

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

  const [maxCapacity] = useState(15); // Hårdkodad maxkapacitet för bord
  const [bookedTables, setBookedTables] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Gör en fetch på alla bokningar när komponenten monteras och uppdatera bookedTables
    fetchAllBookings();
  }, [formState.date, formState.time]); // Uppdatera bokningar när datum eller tid ändras

  const fetchAllBookings = async () => {
    try {
      const response = await fetch(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65ca2900434ff1a78715c30c"
      );
      const data = await response.json();

      // Filtrera bokningar baserat på det angivna datumet och tiden i formuläret
      const filteredBookings = data.filter(
        (booking: { date: string; time: string }) =>
          booking.date === formState.date && booking.time === formState.time
      );

      console.log("Filtrerade bokningar: ", filteredBookings);

      // Räkna antalet bokade bord för det angivna datumet och tiden
      const totalBookedTables = filteredBookings.reduce(
        (acc: number, booking: { numberOfGuests: string }) =>
          acc + Math.ceil(parseInt(booking.numberOfGuests) / 6),
        0
      );

      console.log("antal bokade bord totalt: ", totalBookedTables);
      setBookedTables(totalBookedTables);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchAllBookings();
    // Räkna ut antalet önskade bord baserat på antalet gäster
    const desiredTables = Math.ceil(parseInt(formState.numberOfGuests) / 6);

    console.log("önskade bord: ", desiredTables);
    console.log("tillgängliga bord: ", maxCapacity - bookedTables);

    // Jämför antalet önskade bord med tillgängliga bord
    if (desiredTables <= maxCapacity - bookedTables) {
      // Om tillräckligt med bord är tillgängliga, gör bokningen
      try {
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

        const response = await fetch(
          "https://school-restaurant-api.azurewebsites.net/booking/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
          }
        );

        if (!response.ok) {
          throw new Error("Error creating booking");
        }

        console.log("Booking created:", response);
        alert(
          `You have booked a table for ${formState.numberOfGuests} guests, at ${formState.time}, ${formState.date}. Thank you for dining with us!`
        );

        // Uppdatera bokade bord efter att bokningen har gjorts
        setBookedTables(bookedTables + desiredTables);

        setFormState({
          name: "",
          lastname: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          numberOfGuests: "",
        });

        navigate("/");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Om inte tillräckligt med bord är tillgängliga, visa ett felmeddelande
      alert(
        `Not enough tables available for ${formState.numberOfGuests} guests at ${formState.time}, ${formState.date}. Please choose a different time or reduce the number of guests.`
      );
    }
  };

  return (
    <form id="bookingForm" onSubmit={handleSubmit}>
      <h2>What day would you like to visit?</h2>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        required
        onChange={handleChange}
        value={formState.date}
      />
      <label htmlFor="time">Time:</label>
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
      <label htmlFor="numberOfGuests">Number of Guests:</label>
      <input
        type="number"
        id="numberOfGuests"
        name="numberOfGuests"
        required
        onChange={handleChange}
        value={formState.numberOfGuests}
        min="1"
        max="90"
      />
      <h2>Please fill in contact information:</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        onChange={handleChange}
        value={formState.name}
      />
      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        required
        onChange={handleChange}
        value={formState.lastname}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        onChange={handleChange}
        value={formState.email}
      />
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        required
        onChange={handleChange}
        value={formState.phone}
      />
      <label htmlFor="gdpr">I consent to storing of my data</label>
      <input type="checkbox" id="gdpr" required />
      <input type="submit" value="Make Booking" />
    </form>
  );
};

export default Form;
