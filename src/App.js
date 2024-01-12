import React from "react";
import Weather from "./pages/Weather";
import GlobalProvider from "./context/GlobalProvider";
//dev
//gt
//to check
function App() {
  //destination 
  return (
    <GlobalProvider>
      <>
        <Weather />
      </>
    </GlobalProvider>
  );
}

export default App;
