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
import { postStaffs } from "../redux/ActionCreators";
import { patchStaffs } from "../redux/ActionCreators";
import { deleteStaffs } from "../redux/ActionCreators";
import { fetchDeparts } from "../redux/ActionCreators";
import { fetchSalary } from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  //state tổng thể từ store
  return {
    person: state.person,
    department: state.department,
    salary: state.salary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // giúp fetchStaffs luôn có sẵn trong Main Component
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },

  postStaffs: (staffs) => {
    dispatch(postStaffs(staffs));
  },

  patchStaffs: (staffs) => {
    dispatch(patchStaffs(staffs));
  },

  deleteStaffs: (id) => {
    dispatch(deleteStaffs(id));
  },

  fetchDeparts: () => {
    dispatch(fetchDeparts());
  },

  fetchSalary: () => {
    dispatch(fetchSalary());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }
  // bất cứ nội dung nào trong componentDidMount sẽ được thực thi ngay sau khi ngay sau khi Main Component gắn vào view của ứng dụng
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDeparts();
    this.props.fetchSalary();
  }

  render() {
    const PersonWithId = ({ match }) => {
      return (
        <PersonDetail
          person={
            this.props.person.person.filter(
              (staff) => staff.id === parseInt(match.params.personId, 10)
            )[0]
          }
          department={this.props.department.department}
          editStaff={this.props.patchStaffs}
          deleteStaff={this.props.deleteStaffs}
        />
      );
    };

    const DepartmentWithId = ({ match }) => {
      return (
        <StaffList
          staffs={this.props.person.person.filter(
            (staff) => staff.departmentId === match.params.departId
          )}
          errMess={this.props.person.errMess}
          isLoading={this.props.person.isLoading}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route
                exact
                path="/stafflist"
                component={() => (
                  <StaffList
                    addNewStaff={this.props.postStaffs}
                    staffs={this.props.person.person}
                    department={this.props.department.department}
                    errMess={this.props.person.errMess}
                    isLoading={this.props.person.isLoading}
                  />
                )}
              />

              <Route
                exact
                path="/stafflist/:personId"
                component={PersonWithId}
              />

              <Route
                exact
                path="/department"
                component={() => (
                  <Department
                    department={this.props.department.department}
                    staffs={this.props.person.person}
                    errMess={this.props.department.errMess}
                    isLoading={this.props.department.isLoading}
                  />
                )}
              />

              <Route
                exact
                path="/department/:departId"
                component={DepartmentWithId}
              />

              <Route
                exact
                path="/salary"
                component={() => (
                  <Salary
                    salary={this.props.salary.salary}
                    errMess={this.props.salary.errMess}
                    isLoading={this.props.salary.isLoading}
                  />
                )}
              />

              <Redirect to="/stafflist" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
