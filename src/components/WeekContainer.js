import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import apiConfig from "../config/apikey";

const WEATHERURL = `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.open_weather_map_key}`;
class WeekContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      fullData: [],
      dailyData: [],
      degreeType: "fahrenheit"
    };
  }
  componentDidMount = () => {
    console.log(WEATHERURL);
    fetch(WEATHERURL)
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

  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value
    }, () => console.log(this.state))
  };

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => (
      <DayCard reading={reading} key={index} degreeType={this.state.degreeType} />
    ));
  };

  render() {
    return (
        <div className="container">
        <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
        <h5 className="display-5 text-muted">New York, US</h5>
        <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree}/>
          <div className="row justify-content-center">
            {this.formatDayCards()}
          </div>
        </div>
  
    );
  }
}

export default WeekContainer;
