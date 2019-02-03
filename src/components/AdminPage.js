import React, { Component } from "react";
import { getHttp } from "../helpers/http";

class AdminPage extends Component {
  componentDidMount() {
    getHttp("/users")
      .then(() => {
        console.log("oops");
      })
      .catch(err => {
        console.log(err.status);
      });
  }
  render() {
    return (
      <div>
        <h2> Admin </h2>
        <p>Welcome to the Admin Page.</p>
      </div>
    );
  }
}

export default AdminPage;
