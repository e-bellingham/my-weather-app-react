import "./App.css";
import Weather from "./Weather";
import WeatherForecast from "./WeatherForecast";
function App() {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Weather />
      <WeatherForecast />
      <footer>
        Coded by Elizabeth Bellingham and open souced on{" "}
        <a
          href="https://github.com/e-bellingham/my-weather-app-react"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </footer>
    </div>
  );
}

export default App;
