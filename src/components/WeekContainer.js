import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import Search from "./Search";
import apiConfig from "../config/apikey";
import Helpers from "../lib/Helpers";
import Error from "./Error";
import LoadingScreen from "react-loading-screen";
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=${apiConfig.open_weather_map_key}`;
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${apiConfig.open_weather_map_key}`;
//const WEATHERURL = `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.open_weather_map_key}`;
class WeekContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      dailyData: [],
      degreeType: "fahrenheit",
      city: "",
      country: "US",
      showError: false,
      showLoading: true,
      error: ""
    };
    console.log("constructor");
  }
  componentDidMount = () => {
    console.log("componentDidMount:");
    //get weather of current location
    this.getWeatherCurrentLocation();
  };

  //get weather of current location
  getWeatherCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        //console.log(position);
        let api_url =
          FORECAST_URL +
          "&lat=" +
          position.coords.latitude +
          "&lon=" +
          position.coords.longitude;
        console.log(api_url);
        console.log(
          "weather:",
          WEATHER_URL +
            "&lat=" +
            position.coords.latitude +
            "&lon=" +
            position.coords.longitude
        );
        this.fetchWeather(api_url);
      });
    }
  }
  //change C-> or F to C
  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value
    });
  };

  //get weather data from api_url
  fetchWeather = api_url => {
    console.log(api_url);
    fetch(api_url)
      .then(res => res.json())
      .then(data => {
        this.setState({ city: data.city.name, showError: false, showLoading:false});
        console.log("fetch data:", data.list);
        const dailyData = data.list.filter(reading =>
          reading.dt_txt.includes("00:00:00")
        );
        console.log("daily data:", dailyData);
        this.setState({
          fullData: data.list,
          dailyData: dailyData
        });
      })
      .catch(err => {
        console.log(`Error fetching forecast for ${this.state.city}:`, err);
        this.setState({ error: "Error: Location not found", showError: true });

        //setError(err.message);
      });
  };

  //handle user submit request onlick button
  handleSubmit = (city = "") => {
    console.log("HandleSubmit:", city);
    //remove space between name of city
    let api_url =
      FORECAST_URL + `&q=${city.split(" ").join("%20")},${this.state.country}`;
    //console.log(api_url);
    this.fetchWeather(api_url);
  };

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => (
      <DayCard
        reading={reading}
        key={index}
        degreeType={this.state.degreeType}
      />
    ));
  };

  render() {
    return (
      <div className="container">
        <h1 className="display-1 jumbotron">5-Day Forecast</h1>
        <Search handleSubmit={this.handleSubmit} />
        {this.state.showError ? <Error error={this.state.error} /> : ""}
        {this.state.showLoading ? 
          <LoadingScreen
            loading={true}
            bgColor="#f1f1f1"
            spinnerColor="#9ee5f8"
            textColor="#676767"
            text="Loading..."
          ></LoadingScreen>
         : 
          ""
        }
        <h5 className="display-5 text-muted">
          {Helpers.Capitalize(this.state.city)}
        </h5>

        <DegreeToggle
          degreeType={this.state.degreeType}
          updateForecastDegree={this.updateForecastDegree}
        />
        <div className="row justify-content-center">
          {this.formatDayCards()}
        </div>
      </div>
    );
  }
}

export default WeekContainer;
