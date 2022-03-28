import React from "react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = "6e680332d92c2a7b05700e2176fd2f71";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  async function searchLocation(e) {
    e.preventDefault();

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setData(response.data);
        console.log(response.data);
        console.log("OK");
      } else {
        console.log("Error!");
      }

      setLocation("");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <div class="hero-image">
        <div class="hero-text"></div>
      </div>
      <form onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          searchLocation(e);
        }
      }}>
        <div className="search">
          <input
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            type="text"
          />
          <button onClick={(e) => searchLocation(e)} type="submit">Search</button>
        </div>
      </form>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.main ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
      <p className="Footer">
        Made by <br />
        <a href="https://github.com/MalicknND" target="_blank" rel="noreferrer">
          Malick Siguy NDIAYE
        </a>
      </p>
    </div>
  );
}

export default App;
