import React, { Component } from "react";
import logo from "./logo.svg";
import { Navbar, NavbarBrand } from "reactstrap";
import StaffList from "./components/StaffListComponent";
import "./App.css";
import { DEPARTMENTS, ROLE, STAFFS } from "./shared/staffs";
class App extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   dishes: DISHES,
    // };
  }
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary" className="ml-auto">
          <div>
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        {/* <StaffList /> */}
      </div>
    );
  }
}

export default App;
