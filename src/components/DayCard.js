
import React from 'react';
import Helpers from "../lib/Helpers";
var moment = require('moment');

const DayCard = ({ reading, degreeType }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000
  newDate.setTime(weekday)

  // const fahrenheit = Math.round(reading.main.temp)
  // const celsius = Math.round((fahrenheit - 32) * 5/9)

  const imgURL = `owf owf-${reading.weather[0].id} owf-5x`;
  console.log(imgURL);
  //console.log("degreeType:",degreeType);
  //console.log(reading.main);
  //console.log(reading.main.temp_min,reading.main.temp_max);
  return (
    <div className="col-sm-2">
      <div className="card">
        <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMMM D')}</p>
        <i className={imgURL}></i>
        <p>
        
        <span className="tmp_max text-danger">{degreeType === "celsius" ?
        Helpers.F2C(Math.round(reading.main.temp_max))+ "°C "  : Math.round(reading.main.temp_max) + "°F"}</span>
        &nbsp;-&nbsp;
        <span className="tmp_min text-primary">{degreeType === "celsius" ? Helpers.F2C(Math.round(reading.main.temp_min)) + "°C "
          : Math.round(reading.main.temp_min) + "°F "}</span>
        </p>
        <div className="card-body">
          <p className="card-text">{reading.weather[0].description}</p>
        </div>
      </div>
    </div>
  )
}

export default DayCard;