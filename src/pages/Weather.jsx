import React, { useEffect } from "react";
import "./weather.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../context/GlobalProvider";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";

const Weather = () => {
  const { clear, clouds, drizzle, mist, rain, snow, humidity, wind } =
    useContext(Context);

  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  //object notation for details

  
  const [params, setParams] = useState({
    description: "",
    conditionIcon: "",
    temp: "",
    cityName: "",
    wind: "",
    humidity: "",
  });

  const [alert_message, setAlertMessage] = useState("");

  const api_url =
    "https://api.openweathermap.org/data/2.5/weather?units=metric";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${api_url}&appid=${process.env.REACT_APP_API_KEY}&q=nairobi`
        );

        const { name, main, weather, wind } = response.data;

        setParams({
          conditionIcon: weather[0].main,
          temp: main.temp,
          cityName: name,
          wind: wind.speed,
          humidity: main.humidity,
          description: weather[0].description,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error at useffect hook");
      }
    };
    fetchData();
  }, []);
//fetch weather widget
  const handleFetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_url}&appid=${process.env.REACT_APP_API_KEY}&q=${city}`
      );
      const { name, main, weather, wind } = response.data;

      setParams({
        description: weather[0].description,
        conditionIcon: weather[0].main,
        temp: main.temp,
        cityName: name,
        wind: wind.speed,
        humidity: main.humidity,
      });
      setLoading(false);
      setCity("");
    } catch (error) {
      setLoading(false);
      setAlertMessage("Sorry we could not find your area.");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      console.error(error.message);
    }
  };

  const weatherIcon = (iconName) => {
    switch (iconName) {
      case "Clouds":
        return <img src={clouds} />;
      case "Clear":
        return <img src={clear} />;
      case "Drizzle":
        return <img src={drizzle} />;
      case "Mist":
        return <img src={mist} />;
      case "Rain":
        return <img src={rain} />;
      case "Snow":
        return <img src={snow} />;
      default:
        return;
    }
  };

  return (
    <div className="weather-wrapper">
      <h3>rastaTech weather updates</h3>
      <div className="weather">
        {loading ? (
          <div className="loading">
            <div className="load"></div>
          </div>
        ) : (
          <>
            <div className="alert">{alert_message}</div>
            <div className="top-inputs">
              <form onSubmit={handleFetchWeather}>
                <input
                  type="text"
                  placeholder="country,city,town name..."
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  spellCheck="false"
                />
                <button type="submit">
                  <MagnifyingGlass size={30} />
                </button>
              </form>
            </div>
            <div className="desc">{params.description}</div>

            <div className="mid-info">
              {weatherIcon(params.conditionIcon)}
              <p>{params.temp} &deg;C</p>
              <p>{params.cityName}</p>
            </div>
            <div className="bottom-info">
              <div className="card">
                <img src={wind} alt="" />
                <div>
                  <small>Windspeed</small>
                  <p>{params.wind}km/h </p>
                </div>
              </div>
              <div className="card">
                <img src={humidity} alt="" />
                <div>
                  <small>Humidity</small>
                  <p>{params.humidity}%</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
