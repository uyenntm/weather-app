import React from "react";

const Search = ({ handleSubmit }) => {

  const handleFormSubmission = (event) => {
    event.preventDefault();
    handleSubmit(event.target.city.value);
  }

  return (
    <React.Fragment>
      <form className="input-group searchBar pb-3" onSubmit={handleFormSubmission}>
        <input
          placeholder="Enter a city"
          className="form-control"
          name="city"
          id="city"
        />

        <span className="input-group-btn">
          <button
            className="btn btn-secondary btn-submit "
          >
            Submit
          </button>
        </span>
      </form>
    </React.Fragment>
  );
};

export default Search;
