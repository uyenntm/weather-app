
import React from 'react';
import constConfig from "../config/constant";
const DegreeToggle = ({degreeType=constConfig.F, updateForecastDegree}) => {
  //console.log("degreeType:",degreeType);
  //console.log("degree" + degreeType===constConfig.F?"degreeNotSelected":"");
  let cClassName = degreeType===constConfig.F?"degreeNotSelected":"";
  //console.log("c:", cClassName);
  let fClassName = degreeType===constConfig.C? "degreeNotSelected":"";
  //console.log("f:", fClassName);
  return (
    <React.Fragment>
    <div className="form-check form-check-inline pb-3">
        <label className="form-check-label" htmlFor={constConfig.C}>
        <a href="#" className={"degree "+cClassName} id={constConfig.C} onClick={updateForecastDegree}
        value={constConfig.C}>°C</a>
        </label>
      </div> |
      <div className="form-check form-check-inline pl-3 pb-3">
        <label className="form-check-label" htmlFor={constConfig.F}>
        <a href="#" className={"degree "+fClassName} id={constConfig.F} onClick={updateForecastDegree}
        value={constConfig.F}>°F</a>
        </label>
      </div>
    </React.Fragment>
  )
}

export default DegreeToggle;
