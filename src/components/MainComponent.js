import React, { Component } from "react";

import { Navbar, NavbarBrand } from "reactstrap";
import StaffList from "./StaffListComponent";

import { STAFFS } from "../shared/staffs";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: STAFFS,
    };
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/stafflist"
            component={() => <StaffList staffs={this.state.person} />}
          />
          <Redirect to="/stafflist" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
