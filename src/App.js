import React, { Component } from "react";
import logo from "./logo.svg";
import { Navbar, NavbarBrand } from "reactstrap";
import StaffList from "./components/StaffListComponent";
import "./App.css";
import { STAFFS } from "./shared/staffs";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: STAFFS,
    };
  }
  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

export default App;
