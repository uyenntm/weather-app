
import React from 'react';

const Search = ({ updateCity,handleSubmit,handleKey}) => {
  return (
    <React.Fragment>
             <form  className="input-group searchBar pb-3">
      <input 
        placeholder="Enter a city"
        className="form-control" name="city" id="city"
        onChange={updateCity} 
       />
       
     <span className="input-group-btn">
        <button type="button" className="btn btn-secondary btn-submit " onClick={handleSubmit}
        >Submit</button>
     </span>
      </form>
    
    </React.Fragment>
  )
}

export default Search;
