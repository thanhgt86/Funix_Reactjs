import React, { Component } from "react";
import { CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  Form,
  FormGroup,
  FormFeedback,
  Button,
  Label,
  Input,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length && val !== "Select an Option";
const minLength = (len) => (val) => !val || val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;
const isNumber = (val) => !isNaN(Number(val));

class PersonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    console.log(values);
    const newStaff = {
      id: this.props.person.id,
      name: values.name, //value.name follow model=".name"
      doB: values.doB,
      salaryScale: values.salaryScale,
      startDate: values.startDate,
      department: values.dep,
      annualLeave: values.annualLeave,
      overTime: values.overTime,
      image: "/assets/images/alberto.png",
    };
    console.log(newStaff);
    this.props.editStaff(newStaff);
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className="row">
          <div className="col-md-3 col-sm-4 col-xs-12">
            <CardImg width="100%" src={staff.image} alt={staff.name} />
          </div>
          <div className="col-md-9 col-sm-8 col-xs-12">
            <p>
              <strong>Họ và tên: {staff.name}</strong>
            </p>
            <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
            <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
            <p>
              Phòng ban:{" "}
              {this.props.department.filter(
                (depa) => depa.id === staff.departmentId
              )[0] && //phải nhận được đối tượng thì mới lấy name
                this.props.department.filter(
                  (depa) => depa.id === staff.departmentId
                )[0].name}
            </p>
            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
            <p>Số ngày làm thêm: {staff.overTime}</p>
          </div>
          <hr />
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/stafflist">Nhân Viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              {this.props.person && this.props.person.name}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div>{this.renderStaff(this.props.person)}</div> <br />
        <div className="row">
          <Button
            outline
            color="success"
            style={{ marginLeft: "10%" }}
            onClick={this.toggleModal}
          >
            Sửa
          </Button>
          <Button outline color="danger" style={{ marginLeft: "10px" }}>
            Xóa
          </Button>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Sửa thông tin</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="name">Tên</Label>
                  <Control.text
                    model=".name"
                    id="name"
                    className="form-control"
                    name="name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 30 characters or less",
                      isNumber: "Must be a number",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="doB">Ngày sinh</Label>

                  <Control
                    type="date"
                    model=".doB"
                    id="doB"
                    className="form-control"
                    name="doB"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="startDate">Ngày vào công ty</Label>

                  <Control
                    type="date"
                    model=".startDate"
                    id="startDate"
                    className="form-control"
                    name="startDate"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="dep">Phòng ban</Label>
                  <Control.select
                    model=".dep"
                    name="dep"
                    id="dep"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  >
                    <option>Select an Option</option>
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".dep"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="salaryScale">Hệ số lương</Label>
                  <Control.text
                    model=".salaryScale"
                    name="salaryScale"
                    className="form-control"
                    validators={{
                      required,
                      isNumber: isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".salaryScale"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: " Must be a number",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                  <Control.text
                    model=".annualLeave"
                    name="annualLeave"
                    className="form-control"
                    validators={{
                      required,
                      isNumber: isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".annualLeave"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: " Must be a number",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="overTime">Số ngày đã làm thêm</Label>
                  <Control.text
                    model=".overTime"
                    name="overTime"
                    className="form-control"
                    validators={{
                      required,
                      isNumber: isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".overTime"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: " Must be a number",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Button type="submit" color="success">
                    Update
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default PersonDetail;
