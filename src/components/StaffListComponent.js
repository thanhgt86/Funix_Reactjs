import React, { Component } from "react";
import { LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardTitle,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Col,
} from "reactstrap";

class StaffList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const searchStaff = this.props.staffs.filter();
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
        <div className="row">
          <div className="col-md-3 col-12 col-sm-4 mt-3">
            <h4>Nhân Viên</h4>
          </div>

          <Form className="col-md-9 col-12 col-sm-8 mt-3 mb-3">
            <div className="row">
              <div className="col-md-5 offset-md-5 col-9 col-sm-8">
                <Input name="search" id="search" type="text" />
              </div>
              <div className="col-md-2 col-3 col-sm-3">
                <Button type="submit" color="primary">
                  Tìm Kiếm
                </Button>
              </div>
            </div>
          </Form>
        </div>

        <div className="row">{staff}</div>
        <div className="mt-3">
          <p>Bấm vào để xem thông tin nhân viên</p>
        </div>
      </div>
    );
  }
}

export default StaffList;
