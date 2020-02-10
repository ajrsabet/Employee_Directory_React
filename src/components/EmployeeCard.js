import React from "react";

function EmployeeCard(props) {
  return (
    <tr>
      <td >
        <img alt={props.name} className="img-fluid" src={props.picture} style={{ margin: "0 auto", width: "80%" }} />
      </td> 
      <td >{props.name}</td>
      {/* <td >{props.lastName}</td> */}
      <td >{props.email}</td>
      <td >{props.phone}</td>
      <td >{props.age}</td>
    </tr>
  );
}

export default EmployeeCard;
