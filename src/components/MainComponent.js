import React, { Component } from "react";
import StaffList from "./StaffListComponent";
import PersonDetail from "./PersonDetailComponent";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Department from "./Department";
import Salary from "./Salary";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    person: state.person,
    department: state.department,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.addStaff = this.addStaff.bind(this);
  }

  addStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff };
    this.setState({
      person: [...this.props.person, newStaff],
    });
    console.log(newStaff);
    console.log(this.props.person);
  };

  render() {
    const PersonWithId = ({ match }) => {
      console.log(match);
      return (
        <PersonDetail
          person={
            this.props.person.filter(
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
              <StaffList
                addNewStaff={this.addStaff}
                staffs={this.props.person}
              />
            )}
          />

          <Route exact path="/stafflist/:personId" component={PersonWithId} />
          <Route
            exact
            path="/department"
            component={() => <Department department={this.props.department} />}
          />

          <Route
            exact
            path="/salary"
            component={() => <Salary salary={this.props.person} />}
          />

          <Redirect to="/stafflist" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
