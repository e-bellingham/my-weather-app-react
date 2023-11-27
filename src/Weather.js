import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
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

  useEffect(() => {
    fetchWeather(city);
  }, [city, unit]);

  function fetchWeather(selectedCity) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=535cacbb3f8a0df0aeb4790235b9541f`;
    axios.get(url).then((response) => {
      updateWeatherData(response);
      fetchTemperature(selectedCity, unit);
    });
  }
  function fetchTemperature(selectedCity, currentUnit) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=535cacbb3f8a0df0aeb4790235b9541f&units=${currentUnit}`;
    axios.get(url).then((response) => {
      setWeather((prevWeather) => ({
        ...prevWeather,
        temperature: response.data.main.temp,
      }));
      setLoading(true);
    });
  }

  function updateWeatherData(response) {
    let date = new Date(response.data.dt * 1000);
    let formattedTime = date.toLocaleTimeString("en-US");
    let formattedDate = date.toLocaleDateString("en-US");
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
            <strong>{Math.round(weather.temperature)}</strong>
            <small className="units">
              <a
                className={unit === "imperial" ? "active-unit" : ""}
                onClick={() => setUnit("imperial")}
              >
                °F |
              </a>

              <a
                className={unit === "metric" ? "active-unit" : ""}
                onClick={() => setUnit("metric")}
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
