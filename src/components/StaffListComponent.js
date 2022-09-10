import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  CardBody,
} from "reactstrap";

import dateFormat from "dateformat";

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onSelectedStaff: null,
    };
  }

  onStaffSelect(staff) {
    this.setState({ onSelectedStaff: staff });
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardBody>
              <CardTitle>Họ và tên: {staff.name}</CardTitle>
              <CardText>
                Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </CardText>
              <CardText>Phòng ban: {staff.department.name}</CardText>
              <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
              <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const staff = this.props.staffs.map((person) => {
      return (
        <div className="col-md-2 col-sm-4 col-xs-6">
          <Card key={person.id} onClick={() => this.onStaffSelect(person)}>
            <CardImg width="100%" src={person.image} alt={person.name} />
            <CardTitle className="mx-auto my-2">{person.name}</CardTitle>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <h3>Nhân Viên</h3> <hr />
        <div className="row">{staff}</div>
        <div className="mt-3">
          <p>Bấm vào để xem thông tin nhân viên</p>
        </div>
        <div className="row mt-3">
          {this.renderStaff(this.state.onSelectedStaff)}
        </div>
      </div>
    );
  }
}

export default StaffList;
