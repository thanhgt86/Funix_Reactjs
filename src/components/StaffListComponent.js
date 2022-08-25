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
            <CardBody></CardBody>
          </Card>
        </div>
      );
    }
  }

  render() {
    const staff = this.props.staffs.map((person) => {
      return (
        <div key={person.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onStaffSelect(person)}>
            <CardTitle>{person.name}</CardTitle>
          </Card>
        </div>
      );
    });
    return (
      <div>
        <div className="row">{staff}</div>
        <div className="row">
          <p>Bấm vào để xem thông tin nhân viên</p>
        </div>
      </div>
    );
  }
}

export default StaffList;
