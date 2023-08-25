import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardTitle,
  Form,
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
import { Loading } from "./LoadingComponent";

const required = (val) => val && val.length && val !== "Select an Option";
const minLength = (len) => (val) => !val || val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;
const isNumber = (val) => !isNaN(Number(val));

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "Sale",
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: "/assets/images/alberto.png",
      isModalOpen: false,
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        annualLeave: false,
        overTime: false,
      },
    };

    this.handleSearchStaff = this.handleSearchStaff.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSearchStaff(event) {
    event.preventDefault();
    this.setState({
      search: event.target.nameSearch.value,
    });
    console.log(event.target);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleSubmit(values) {
    console.log(values);
    const newStaff = {
      name: values.name, //value.name follow model=".name"
      doB: values.doB,
      salaryScale: values.salaryScale,
      startDate: values.startDate,
      departmentId: this.props.department.filter(
        (depa) => depa.name === values.dep
      )[0].id,
      annualLeave: values.annualLeave,
      overTime: values.overTime,
      image: "/assets/images/alberto.png",
    };
    console.log(newStaff);
    this.props.addNewStaff(newStaff);
  }

  render() {
    const staff = () => {
      if (this.props.isLoading) {
        return <Loading />;
      } else if (this.props.errMess) {
        return <h4 className="text-danger m-3">{this.props.errMess}</h4>;
      } else
        return this.props.staffs
          .filter((staff) => {
            if (this.state.search === "") return staff;
            else if (
              staff.name.toLowerCase().includes(this.state.search.toLowerCase())
            )
              return staff;
          })
          .map((person) => {
            return (
              <div className="col-md-2 col-sm-4 col-xs-6 mb-3" key={person.id}>
                <Card>
                  <Link to={`/staffList/${person.id}`}>
                    <CardImg
                      width="100%"
                      src={person.image}
                      alt={person.name}
                    />
                    <CardTitle className="text-center my-2">
                      {person.name}
                    </CardTitle>
                  </Link>
                </Card>
              </div>
            );
          });
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-9 col-sm-3 mt-3">
            <h4>Nhân Viên</h4>
          </div>

          <div className="col-md-1 col-3 col-sm-3 mt-3">
            <Button outline color="success" onClick={this.toggleModal}>
              <span className="fa fa-plus fa-md"></span>
            </Button>
          </div>

          <Form
            className="col-md-8 col-12 col-sm-6 mt-3 mb-3"
            onSubmit={this.handleSearchStaff}
          >
            <div className="row">
              <div className="col-md-5 offset-md-2 col-9 col-sm-8">
                <Input
                  name="nameSearch"
                  type="text"
                  // value={this.state.search}
                  // onChange={this.handleChange}
                />
              </div>
              <div className="col-md-2 col-3 col-sm-3">
                <Button color="primary" type="submit">
                  Tìm Kiếm
                </Button>
              </div>
            </div>
          </Form>
        </div>
        <div className="row">{staff()}</div>

        <div className="mt-3">
          <p>Bấm vào để xem thông tin nhân viên</p>
        </div>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
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
                    placeholder="Nhập tên nhân viên"
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
                    placeholder="dd/mm/yyy"
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
                    placeholder="dd/mm/yyy"
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
                    placeholder="1"
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
                    placeholder="0"
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
                    placeholder="0"
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
                    Thêm
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

export default StaffList;
