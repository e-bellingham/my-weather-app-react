import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  const [rawTemperature, setRawTemperature] = useState(null);
  const fetchWeather = (selectedCity, currentUnit) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=535cacbb3f8a0df0aeb4790235b9541f&units=${currentUnit}`;
    axios.get(url).then((response) => {
      setRawTemperature(response.data.main.temp);
      updateWeatherData(response);
    });
  };
  const convertToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9) / 5 + 32;
  };
  const convertToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };
  function handleUnitChange(newUnit) {
    setUnit(newUnit);
  }

  let [city, setCity] = useState("Monterey");
  let [unit, setUnit] = useState("imperial");
  let [loaded, setLoading] = useState("false");
  let [weather, setWeather] = useState({
    temperature: null,
    windSpeed: null,
    windDirection: null,
    humidity: null,
    location: null,
    date: null,
    time: null,
    icon: null,
  });

  function updateWeatherData(response) {
    let timezoneOffset = response.data.timezone;
    let localTime = new Date((response.data.dt + timezoneOffset) * 1000);
    let formattedTime = localTime.toLocaleTimeString("en-US");
    let formattedDate = localTime.toLocaleDateString("en-US");
    setWeather({
      ...weather,
      windSpeed: response.data.wind.speed,
      windDirection: response.data.wind.deg,
      humidity: response.data.main.humidity,
      location: response.data.name,
      date: formattedDate,
      time: formattedTime,
      icon: `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
    });
    setLoading(true);
  }
  function handleSubmit(event) {
    event.preventDefault();
    fetchWeather(city);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city.."
          onChange={updateCity}
        />
        <button className="cityButton">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className="quick-links">
        <button
          className="cityButton"
          onClick={(e) => {
            e.preventDefault();
            fetchWeather("Monterey");
          }}
        >
          Monterey
        </button>{" "}
        <button
          className="cityButton"
          onClick={(e) => {
            e.preventDefault();
            fetchWeather("New York");
          }}
        >
          New York
        </button>{" "}
        <button
          className="cityButton"
          onClick={(e) => {
            e.preventDefault();
            fetchWeather("Paris");
          }}
        >
          Paris
        </button>{" "}
        <button
          className="cityButton"
          onClick={(e) => {
            e.preventDefault();
            fetchWeather("London");
          }}
        >
          London
        </button>
      </div>
    </div>
  );

  if (loaded) {
    let displayTemperature;
    if (unit === "imperial") {
      displayTemperature = convertToFahrenheit(rawTemperature);
    } else if (unit === "metric") {
      displayTemperature = convertToCelsius(rawTemperature);
    } else {
      displayTemperature = rawTemperature;
    }
    return (
      <div>
        {form}

        <h3>{weather.location}</h3>
        <h4>
          Date: {weather.date} | Time:{weather.time}
        </h4>

        <div className="threeColumns">
          <div className="currentWeather">
            <img
              src={weather.icon}
              alt="weather-icon"
              className="float-left"
              id="icon"
            />
          </div>
          <div className="currentWeatherInfo">
            <strong>{Math.round(displayTemperature)}</strong>
            <small className="units">
              <a
                href="/"
                className={unit === "imperial" ? "active-unit" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleUnitChange("imperial");
                }}
              >
                °F |
              </a>
              <a
                href="/"
                className={unit === "metric" ? "active-unit" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleUnitChange("metric");
                }}
              >
                °C
              </a>
            </small>
          </div>
          <div className="currentWeather">
            <ul className="currentWeatherInfo">
              <li>
                <span>Wind: </span>
                {Math.round(weather.windSpeed)} kts / {weather.windDirection}
              </li>
              <li>
                <span>Humidity: </span>
                {weather.humidity} %
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
