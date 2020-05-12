import React, { useEffect } from "react";
import { ClientRegister } from "./views/FormContainer/ClientRegister";
import { PlaceSelector } from "./components/Inputs/PlaceSelector";

function App() {
  return (
    <div className="App">
      <PlaceSelector />
      <ClientRegister />
    </div>
  );
}

export default App;
