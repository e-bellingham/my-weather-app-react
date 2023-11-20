import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({
    temperature: null,
    windSpeed: null,
    windDirection: null,
    humidity: null,
    location: null,
    date: null,
    time: null,
  });
  let [loaded, setLoading] = useState("flase");

  function displayWeather(response) {
    setLoading(true);
    let date = new Date(response.data.dt * 1000);
    let formattedDate = date.toLocaleDateString("en-US");

    setWeather({
      temperature: response.data.main.temp,
      windSpeed: response.data.wind.speed,
      windDirection: response.data.wind.deg,
      humidity: response.data.main.humidity,
      location: response.data.name,
      date: formattedDate,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=535cacbb3f8a0df0aeb4790235b9541f&units=imperial`;
    axios.get(url).then(displayWeather);
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
        <button className="city-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div>
        {form}

        <h3 className="dateDayTime">
          {weather.location} | {weather.date}|<span></span>
        </h3>
        <div className="threeColumns">
          <div className="currentWeather">
            {" "}
            <img
              src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
              alt="clear-weather"
              className="float-left"
              id="icon"
            />
          </div>
          <div className="currentWeatherInfo">
            <strong>{Math.round(weather.temperature)}</strong>
            <small className="units">
              <a href="/" id="fahrenheit-link">
                °F{" "}
              </a>
              |<a href="/"> °C </a>
            </small>
          </div>
          <div className="currentWeather">
            <ul className="currentWeatherInfo">
              <li>
                <span>Wind: </span>
                {Math.round(weather.windSpeed)}/{weather.windDirection}
              </li>
              <li>
                <span>Humidity: </span>
                {weather.humidity}
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
