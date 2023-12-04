import React, { Component } from "react";
import axios from "axios";
import "./WeatherForecast.css";

export default class WeatherForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
    };
  }

  componentDidMount() {
    this.fetchForecastData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.fetchForecastData();
    }
  }
  fetchForecastData() {
    const apiKey = `0f8bc384a7c31b717a18cfe38a95ae06`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      this.props.city
    )}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      this.setState({ forecast: response.data.list });
    });
  }

  formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  render() {
    const { forecast } = this.state;
    if (forecast.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast
            .filter((_, index) => index % 8 === 0)
            .map((day, index) => (
              <div key={index} className="col">
                <div className="WeatherForecast-day">
                  {this.formatDay(day.dt)}
                </div>
                <img
                  src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                />
                <div className="WeatherForecast-temperatures">
                  <span className="WeatherForecast-temperature-max">
                    {Math.round(day.main.temp_max)}
                    <small>°C </small>/
                  </span>
                  <span className="WeatherForecast-temperature-min">
                    {" "}
                    {Math.round(day.main.temp_min)}
                    <small>°C</small>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
