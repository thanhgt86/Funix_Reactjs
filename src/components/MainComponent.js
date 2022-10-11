import React, { Component } from "react";
import StaffList from "./StaffListComponent";
import PersonDetail from "./PersonDetailComponent";
import { STAFFS } from "../shared/staffs";
import { DEPARTMENTS } from "../shared/staffs";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import Department from "./Department";
import Salary from "./Salary";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: STAFFS,
      department: DEPARTMENTS,
    };
    this.addStaff = this.addStaff.bind(this);
  }

  addStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff };
    this.setState({
      person: [...this.state.person, newStaff],
    });
    console.log(newStaff);
    console.log(this.state.person);
  };

  render() {
    const PersonWithId = ({ match }) => {
      console.log(match);
      return (
        <PersonDetail
          person={
            this.state.person.filter(
              (staff) => staff.id === parseInt(match.params.personId, 10)
            )[0]
          }
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/stafflist"
            component={() => (
              <StaffList onAdd={this.addStaff} staffs={this.state.person} />
            )}
          />

          <Route exact path="/stafflist/:personId" component={PersonWithId} />
          <Route
            exact
            path="/department"
            component={() => <Department department={this.state.department} />}
          />

          <Route
            exact
            path="/salary"
            component={() => <Salary salary={this.state.person} />}
          />

          <Redirect to="/stafflist" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
