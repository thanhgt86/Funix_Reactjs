import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  CardBody,
} from "reactstrap";

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
              <CardText>Ngày sinh: {staff.doB}</CardText>
              <CardText>Ngày vào công ty: {staff.startDate}</CardText>
              <CardText>Phòng ban: {staff.department}</CardText>
              <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
              <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    }
  }

  render() {
    const staff = this.props.staffs.map((person) => {
      return (
        <div key={person.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onStaffSelect(person)}></Card>
        </div>
      );
    });
    return (
      <div>
        <div className="row">{staff}</div>
        <div>
          <p>Bấm vào để xem thông tin nhân viên</p>
        </div>
      </div>
    );
  }
}

export default StaffList;
