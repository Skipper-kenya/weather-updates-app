import React from "react";
import { createContext } from "react";
import clear from "../images/clear.png";
import clouds from "../images/clouds.png";
import drizzle from "../images/drizzle.png";
import mist from "../images/mist.png";
import rain from "../images/rain.png";
import snow from "../images/snow.png";
import humidity from "../images/humidity.png";
import wind from "../images/wind.png";

export const Context = createContext(null);

const GlobalProvider = ({ children }) => {
  const values = { clear, clouds, drizzle, mist, rain, snow, humidity, wind };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default GlobalProvider;
