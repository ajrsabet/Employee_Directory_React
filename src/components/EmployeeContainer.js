import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";

class EmployeeContainer extends Component {
  state = {
    result: [],
    filter: "",
    currentSort: "default",
    sortField: ""
  };

  // When this component mounts, load employees
  componentDidMount() {
    API.search()
      .then(res => {
        console.log(res);

        this.setState({
          result: res.data.results.map((e, i) => ({
            name: e.name.first + " " + e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            age: e.dob.age,
            key: i
          }))
        })
      })
      .catch(err => console.log(err));
  }

  // Sort types
  sortTypes = {
    up: {
      class: 'sort-up',
      fn: ((a, b) => (a.name > b.name) ? 1 : -1)
    },
    down: {
      class: 'sort-down',
      fn: ((a, b) => (a.name > b.name) ? -1 : 1)
    },
    default: {
      class: 'sort',
      fn: ((a, b) => 0)
    }
  };

  // method called every time the sort button is clicked
  // it will change the currentSort value to the next one
  onSortChange = () => {
    // console.log(this.state.filter);     

    let nextSort;

    if (this.state.currentSort === 'down') nextSort = 'up';
    else if (this.state.currentSort === 'up') nextSort = 'default';
    else if (this.state.currentSort === 'default') nextSort = 'down';
    console.log(this.state.currentSort);
    console.log(this.state.result);

    // console.log(nextSort);     

    this.setState({
      currentSort: nextSort
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   this.filterEmployees(this.state.search);
  // };

  handleInputChange = event => {
    // event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
    // this.filterEmployees(this.state.search);
  };

  // filterEmployees = el => el.toLowerCase().indexOf(filter.toLowerCase()) !== -1

  render() {
    // const{ data } = this.state.result;
    // const{ currentSort } = this.state;
    return (
      <div>
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div heading="Search">
            <SearchForm
              value={this.state.search}
              handleInputChange={this.handleInputChange}
            // handleFormSubmit={this.handleFormSubmit}
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <table className="col-md-12">
              <thead>
                <tr>
                  <th>Pic</th>
                  <th>Name
                  <i class="fas fa-sort" onClick={this.onSortChange}></i>
                  </th>
                  {/* <th>Last Name </th> */}
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {([...this.state.result].filter(el => el.name.toLowerCase().indexOf((this.state.filter).toLowerCase()) !== -1).sort(this.sortTypes[this.state.currentSort].fn).map((item) =>
                  <EmployeeCard
                    picture={item.picture}
                    name={item.name}
                    email={item.email}
                    phone={item.phone}
                    age={item.age}
                    key={item.key}
                  />
                )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeContainer;
