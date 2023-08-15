import React, { Component } from "react";
import StaffList from "./StaffListComponent";
import PersonDetail from "./PersonDetailComponent";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Department from "./Department";
import Salary from "./Salary";
import { connect } from "react-redux";
import { fetchStaffs } from "../redux/ActionCreators";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  //state tổng thể từ store
  return {
    person: state.person,
    department: state.department,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // giúp fetchStaffs luôn có sẵn trong Main Component
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.addStaff = this.addStaff.bind(this);
  }
  // bất cứ nội dung nào trong componentDidMount sẽ được thực thi ngay sau khi ngay sau khi Main Component gắn vào view của ứng dụng
  componentDidMount() {
    this.props.fetchStaffs();
  }

  addStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff };
    this.setState({
      person: [...this.props.person.person, newStaff],
    });
    console.log(newStaff);
  };

  render() {
    const PersonWithId = ({ match }) => {
      console.log(match);
      console.log(this.props.person);
      return (
        <PersonDetail
          person={
            this.props.person.person.filter(
              (staff) => staff.id === parseInt(match.params.personId, 10)
            )[0]
          }
          staffsLoading={this.props.person.person.isLoading}
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
                staffs={this.props.person.person}
                errMess={this.props.person.errMess}
                isLoading={this.props.person.isLoading}
              />
            )}
          />

          <Route exact path="/stafflist/:personId" component={PersonWithId} />
          <Route
            exact
            path="/department"
            component={() => (
              <Department department={this.props.department.department} />
            )}
          />

          <Route
            exact
            path="/salary"
            component={() => <Salary salary={this.props.person.person} />}
          />

          <Redirect to="/stafflist" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
