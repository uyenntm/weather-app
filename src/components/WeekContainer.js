import React from "react";
import DayCard from "./DayCard";
import TodayCard from "./TodayCard";
//import TodayChart from "./TodayChart";
import DegreeToggle from "./DegreeToggle";
import Search from "./Search";
import apiConfig from "../config/apikey";
import constConfig from "../config/constant";
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
      todayData: [],
      degreeType: constConfig.F,
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
    this._asyncRequest = this.getWeatherCurrentLocation();
    //get weather of current location
  };

  //get weather of current location
  getWeatherCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        //console.log(position);
        let weather_url =
          WEATHER_URL +
          "&lat=" +
          position.coords.latitude +
          "&lon=" +
          position.coords.longitude;
        let forecast_url =
          FORECAST_URL +
          "&lat=" +
          position.coords.latitude +
          "&lon=" +
          position.coords.longitude;
        console.log("forecast:", forecast_url);

        console.log("weather:", weather_url);
        this.fetchWeather(weather_url, forecast_url);
      });
    }
  }
  //change C-> or F to C
  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.id
    });
  };

  //get weather data from api_url
  fetchWeather = (weather_url, forecast_url) => {
    console.log(weather_url);
    console.log(forecast_url);
    //get current weather data
    fetch(weather_url)
      .then(res => res.json())
      .then(data => {
        console.log("Current Weather:");
        console.log(data);
        this.setState({
          todayData: data
        });
      })
      .catch(err => {
        console.log(`Error fetching current weather for ${this.state.city}:`, err);
        this.setState({ error: "Error: Location not found", showError: true });

        //setError(err.message);
      });
    //get forecast_url data
    fetch(forecast_url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          city: data.city.name,
          showError: false,
          showLoading: false
        });
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
    let forecast_url =
      FORECAST_URL + `&q=${city.split(" ").join("%20")},${this.state.country}`;
    let weather_url =
      WEATHER_URL + `&q=${city.split(" ").join("%20")},${this.state.country}`;
    //console.log(api_url);
    this.fetchWeather(weather_url, forecast_url);
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

  formatTodayCards = () => {
    return (<TodayCard reading={this.state.todayData} degreeType={this.state.degreeType}/>)
     
  };

  render() {
    return (
      <div className="container">
        <h1 className="display-4 ">5-Day Forecast</h1>
        <Search handleSubmit={this.handleSubmit} />
        {this.state.showError ? <Error error={this.state.error} /> : ""}
        {this.state.showLoading ? (
          <LoadingScreen
            children=""
            loading={true}
            bgColor="#f1f1f1"
            spinnerColor="#9ee5f8"
            textColor="#676767"
            text="Loading..."
          ></LoadingScreen>
        ) : (
          ""
        )}
        <h5 className="display-5 text-muted">
          {Helpers.Capitalize(this.state.city)}
        </h5>

        <DegreeToggle
          degreeType={this.state.degreeType}
          updateForecastDegree={this.updateForecastDegree}
        />
        {/* <TodayChart></TodayChart> */}
        <div className="row justify-content-center">
        <ul className="list">
          {this.formatTodayCards()}
          {this.formatDayCards()}
          </ul>
        </div>
      </div>
    );
  }
}

export default WeekContainer;
