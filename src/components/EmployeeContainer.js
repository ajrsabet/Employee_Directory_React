import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";

class EmployeeContainer extends Component {
  state = {
    result: [],
    filter: "",
    filterBy: "lastName",
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
            firstName: e.name.first,
            lastName: e.name.last,
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
      fn: ((a, b) => (a.firstName > b.firstName) ? 1 : 1)
    },
    down: {
      class: 'sort-down',
      fn: ((a, b) => (b.firstName > a.firstName) ? -1 : -1)
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
      <div className="container">
        <div className="navbar">
            <div heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                // handleFormSubmit={this.handleFormSubmit}
              />
            </div>
          </div>
        <div className="row">
            <table className="col-md-12">
              <thead>
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
              </thead>
              <tbody>
                {([...this.state.result].filter(el => el.lastName.toLowerCase().indexOf((this.state.filter).toLowerCase()) !== -1).sort(this.sortTypes[this.state.currentSort].fn).map((item) =>
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
              </tbody>
            </table>
        </div>
      </div>
    );
  }
}

export default EmployeeContainer;
