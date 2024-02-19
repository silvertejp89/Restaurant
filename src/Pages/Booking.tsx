import React from "react";
import Form from "../Components/Main/Form";

//--------------------------------------------

//hämta önskat datum och tid från formuläret och sätt i filtrering nedan.
//Räkna ut antal desiredTables baserat på antal gäster.

//Gör en fetch på alla bokningar
//filtrera bokningarna på datum och tid som angetts i formulär
//Räkna samman antal bookedTables i bokningarna
//availableTables = Maxkapaciteten för bord(hårdkodad) minus bookedTables.

//Jämför desiredTables med availableTables.

//--------------------------------------------

const Booking: React.FC = () => {
  return <Form />;
};

export default Booking;
