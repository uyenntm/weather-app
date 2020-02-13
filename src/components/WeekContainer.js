import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import Search from "./Search";
import apiConfig from "../config/apikey";
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
const WEATHERURL = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&`;
//const WEATHERURL = `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.open_weather_map_key}`;
class WeekContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      fullData: [],
      dailyData: [],
      degreeType: "fahrenheit",
      city: ""
    };
  }
  // componentDidMount = () => {
  //   console.log(WEATHERURL);
  //   fetch(WEATHERURL)
  //     .then(res => res.json())
  //     .then(data => {
  //       const dailyData = data.list.filter(reading =>
  //         reading.dt_txt.includes("18:00:00")
  //       );
  //       this.setState(
  //         {
  //           fullData: data.list,
  //           dailyData: dailyData
  //         },
  //         () => console.log(this.state)
  //       );
  //     });
  // };
  Capitalize = str => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  };
  updateForecastDegree = event => {
    this.setState(
      {
        degreeType: event.target.value
      },
      () => console.log(this.state)
    );
  };

  updateCity = event => {
    this.setState(
      {
        city: event.target.value
      },
      () => console.log(this.state)
    );
  };

  handleSubmit = event => {
    console.log("HandleSubmit");
    let api_url =
      WEATHERURL +
      `q=${this.state.city}&appid=${apiConfig.open_weather_map_key}`;
    console.log(api_url);
    fetch(api_url)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter(reading =>
          reading.dt_txt.includes("18:00:00")
        );
        this.setState(
          {
            fullData: data.list,
            dailyData: dailyData
          },
          () => console.log(this.state)
        );
      });
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
        <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
        <Search updateCity={this.updateCity} handleSubmit={this.handleSubmit} />
        <h5 className="display-5 text-muted">
          {this.Capitalize(this.state.city)}
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
