import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import Search from "./Search";
import apiConfig from "../config/apikey";
import Helpers from "../lib/Helpers";
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
const WEATHERURL = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=${apiConfig.open_weather_map_key}`;
//const WEATHERURL = `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.open_weather_map_key}`;
class WeekContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      dailyData: [],
      degreeType: "fahrenheit",
      city: "",
      country: "US"
     
    };
    this.getWeatherCurrentLocation();
  }
  componentDidMount = () => {
    console.log("componentDidMount:");
    //get weather of current location
   
    
  };

  //get weather of current location
 getWeatherCurrentLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        let api_url =WEATHERURL + "&lat=" + position.coords.latitude + "&lon=" 
        + position.coords.longitude;
        //console.log(api_url);
        this.fetchWeather(api_url);
    });
  }
 }
//  //capitalize the first letter of a word
//   Capitalize = str => {
//     var splitStr = str.toLowerCase().split(" ");
//     for (var i = 0; i < splitStr.length; i++) {
//       // You do not need to check if i is larger than splitStr length, as your for does that for you
//       // Assign it back to the array
//       splitStr[i] =
//         splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
//     }
//     // Directly return the joined string
//     return splitStr.join(" ");
//   };
  //change C-> or F to C
  updateForecastDegree = event => {
    this.setState(
      {
        degreeType: event.target.value
      }
    );
  };

  updateCity = event => {
    this.setState(
      {
        city: event.target.value
      }
    );
  };
  //get weather data from api_url
  fetchWeather = api_url => {
    console.log(api_url);
    fetch(api_url)
      .then(res => res.json())
      .then(data => {
        this.setState({city:data.city.name});
        console.log("fetch data:",data.list);
        const dailyData = data.list.filter(reading =>
          reading.dt_txt.includes("09:00:00")
        );
        console.log("daily data:",dailyData);
        this.setState(
          {
            fullData: data.list,
            dailyData: dailyData
          }
        );
      });
  };

  //handle user submit request onlick button
  handleSubmit = event => {
    console.log("HandleSubmit");
   //remove space between name of city
    let api_url =
      WEATHERURL +
      `&q=${this.state.city.split(' ').join('%20')},${this.state.country}`;
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
        <Search updateCity={this.updateCity} handleSubmit={this.handleSubmit} />
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
