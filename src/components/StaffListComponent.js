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
      columDefault: "col-12 col-md-6 col-lg-4 mt-3",
    };
  }

  onStaffSelect(staff) {
    this.setState({ onSelectedStaff: staff });
  }

  onColumnSelect(col) {
    this.setState({
      columDefault: col,
    });
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
        <div className={this.state.columDefault}>
          <Card key={person.id} onClick={() => this.onStaffSelect(person)}>
            <CardTitle>{person.name}</CardTitle>
          </Card>
        </div>
      );
    });
    return (
      <div>
        <div className="row m-3">
          <button
            onClick={() => this.onColumnSelect("col-md-2 mt-3")}
            className="btn btn-warning mr-3"
          >
            6 cột
          </button>

          <button
            onClick={() => this.onColumnSelect("col-md-3 mt-3")}
            className="btn btn-warning mr-3"
          >
            4 cột
          </button>
        </div>
        <div className="row">{staff}</div>
        <div>
          <p>Bấm vào để xem thông tin nhân viên</p>
        </div>
        <div className="row">
          {this.renderStaff(this.state.onSelectedStaff)}
        </div>
      </div>
    );
  }
}

export default StaffList;
