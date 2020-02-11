import React from "react";


function SearchForm(props) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="filter">Filter:</label>
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="filter"
          type="text"
          className="form-control"
          placeholder="Search Employees"
          id="filter"
        />
      </div>
    </form>
  );
}

export default SearchForm;
