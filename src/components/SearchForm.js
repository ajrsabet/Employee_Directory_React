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
        <select name="filter">
  <option value="firstName">First Name</option>
  <option value="lastName">Last Name</option>
  <option value="email">Email</option>
  <option value="phone">Phone</option>
</select>
      </div>
    </form>
  );
}

export default SearchForm;
