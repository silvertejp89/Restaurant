import { useEffect, useState } from "react";
import "../../Styles/Main/Form.css";

//--------------------------------------------

//hämta önskat datum och tid från formuläret och sätt i filtrering nedan.
//Räkna ut antal desiredTables baserat på antal gäster.

//Gör en fetch på alla bokningar
//filtrera bokningarna på datum och tid som angetts i formulär
//Räkna samman antal bookedTables i bokningarna
//availableTables = Maxkapaciteten för bord(hårdkodad) minus bookedTables.

//Jämför desiredTables med availableTables.

//--------------------------------------------

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

  const [maxCapacity, setMaxCapacity] = useState(15);
  const [bookedTables, setBookedTables] = useState(0);

  useEffect(() => {
    //fetchen på alla bokningar när komponenten monteras
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const response = await fetch(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65ca2900434ff1a78715c30c"
      );
      const data = await response.json();

      //Filtrera efter datum och tid.
      const filteredBookings = data.filter(
        (booking: { date: string; time: string }) =>
          booking.date === formState.date && booking.time === formState.time
      );

      //räkna antalet bord
      const totalBookedTables = filteredBookings.reduce(
        (totalGuests: number, booking: { numberOfGuests: string }) =>
          totalGuests + parseInt(booking.numberOfGuests),
        0
      );

      setBookedTables(totalBookedTables);
    } catch (error) {
      console.error("Ajsing bajsing", error);
    }
  };

  //-----------------------------------------------------------------------

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Räkna ut anralet önskade bord baserat på antalet gäster
    const desiredTables = Math.ceil(parseInt(formState.numberOfGuests) / 6);

    //Jämför antalet önskade bord med antalet tillgängliga bord:
    if (desiredTables <= maxCapacity - bookedTables) {
      //if tillräckligt med bord gör bokning:
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
          "You have booked a table for ${formState.numberOfGuests} guests, at ${formState.time}, ${formState.date}. Thank you for dining with us!"
        );

        //kolla närmare...
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
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert(
        `Not enough tables available for ${formState.numberOfGuests} guests at ${formState.time}, ${formState.date}. Please choose a different time or reduce the number of guests.`
      );
    }
  };

  return <form id="bookingForm" onSubmit={handleSubmit}></form>;
};

//     fetch("https://school-restaurant-api.azurewebsites.net/booking/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(bookingData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Booking created:", data);
//         alert(
//           `You have booked a table for ${formState.numberOfGuests} guests, at ${formState.time}, ${formState.date}. Thank you for dining with us!`
//         );
//         setFormState({
//           name: "",
//           lastname: "",
//           email: "",
//           phone: "",
//           date: "",
//           time: "",
//           numberOfGuests: "",
//         });
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <form id="bookingForm" onSubmit={handleSubmit}>
//       <label htmlFor="name">Name:</label>
//       <br />
//       <input
//         type="text"
//         id="name"
//         name="name"
//         required
//         onChange={handleChange}
//         value={formState.name}
//       />
//       <br />
//       <label htmlFor="lastname">Last Name:</label>
//       <br />
//       <input
//         type="text"
//         id="lastname"
//         name="lastname"
//         required
//         onChange={handleChange}
//         value={formState.lastname}
//       />
//       <br />
//       <label htmlFor="email">Email:</label>
//       <br />
//       <input
//         type="email"
//         id="email"
//         name="email"
//         required
//         onChange={handleChange}
//         value={formState.email}
//       />
//       <br />
//       <label htmlFor="phone">Phone:</label>
//       <br />
//       <input
//         type="tel"
//         id="phone"
//         name="phone"
//         required
//         onChange={handleChange}
//         value={formState.phone}
//       />
//       <br />
//       <label htmlFor="date">Date:</label>
//       <br />
//       <input
//         type="date"
//         id="date"
//         name="date"
//         required
//         onChange={handleChange}
//         value={formState.date}
//       />
//       <br />
//       <label htmlFor="time">Time:</label>
//       <br />
//       <select
//         id="time"
//         name="time"
//         required
//         onChange={handleChange}
//         value={formState.time}
//       >
//         <option value="">Select a time</option>
//         <option value="18:00">18:00 - 21:00</option>
//         <option value="21:00">21:00 - 24:00</option>
//       </select>
//       <br />
//       <label htmlFor="numberOfGuests">Number of Guests:</label>
//       <br />
//       <input
//         type="number"
//         id="numberOfGuests"
//         name="numberOfGuests"
//         required
//         onChange={handleChange}
//         value={formState.numberOfGuests}
//         min="1"
//         max="6"
//       />
//       <br />
//       <input type="submit" value="Reserve" />
//     </form>
//   );
// };

export default Form;
