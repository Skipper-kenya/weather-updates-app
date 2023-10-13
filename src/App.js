import React from "react";
import Weather from "./pages/Weather";
import GlobalProvider from "./context/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <>
        <Weather />
      </>
    </GlobalProvider>
  );
}

export default App;
