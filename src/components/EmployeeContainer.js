import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";

class EmployeeContainer extends Component {
  state = {
    result: [],
    // search: "",
    currentSort: "down",
    sortField: ""
  };

  // When this component mounts, search for the movie "The Matrix"
  componentDidMount() {
    API.search()
      .then(res => {
        this.setState({
          result: res.data.results.map((e, i) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            dob: e.dob.age,
            key: i
          }))
        })
      })
      .catch(err => console.log(err));
  }

  // searchEmployees = () => {

  // };

  // Sort types
  sortTypes = {
    up: {
      class: 'sort-up',
      fn: ((a, b) => a.firstName > b.firstName? 0:1)
    },
    down: {
      class: 'sort-down',
      fn: ((a, b) => a.firstName < b.firstName? 0:-1)
    },
    default: {
      class: 'sort',
      fn: (a, b) => 0
    }
  };
  
  // method called every time the sort button is clicked
	// it will change the currentSort value to the next one
	onSortChange = () => {
    // console.log(this.state.result.sort((a, b) => a.lastName > b.lastName ? 1:-1));     

    let nextSort;

		if (this.state.currentSort === 'down') nextSort = 'up';
		else if (this.state.currentSort === 'up') nextSort = 'default';
		else if (this.state.currentSort === 'default') nextSort = 'down';

		this.setState({
			currentSort: nextSort
		});
	};

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.filterEmployees(this.state.search);
  };

  render() {
    // const{ data } = this.state.result;
    // const{ currentSort } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <table className="col-md-12">
                <tr>
                  <th>Pic</th>
                  <th onClick={this.onSortChange}>First Name  
                  {/* <button onClick={this.onSortChange}> ^
								</button> */}
                  </th>
                  <th>Last Name </th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                </tr>
              {([...this.state.result].sort(this.sortTypes[this.state.currentSort].fn).map((item) =>
                <EmployeeCard
                  picture={item.picture}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  email={item.email}
                  phone={item.phone}
                  age={item.age}
                  key={item.key}
                />
              )
              )}
            </table>
          </div>
          <div className="col-md-4">
            <div heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeContainer;
