import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

class StaffList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const staff = this.props.staffs.map((person) => {
      return (
        <div className="col-md-2 col-sm-4 col-xs-6">
          <Card key={person.id}>
            <Link to={`/staffList/${person.id}`}>
              <CardImg width="100%" src={person.image} alt={person.name} />
              <CardTitle className="text-center my-2">{person.name}</CardTitle>
            </Link>
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
      </div>
    );
  }
}

export default StaffList;
