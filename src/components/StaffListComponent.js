import React, { Component } from "react";
import { DEPARTMENTS } from "../shared/staffs";
// import { LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import {
  Card,
  CardImg,
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
} from "reactstrap";
import { Loading } from "./LoadingComponent";

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

  handleSubmit() {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      department: {
        id: DEPARTMENTS.filter((dept) => dept.name === this.state.department)[0]
          .id,
      },

      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: this.state.image,
    };
    console.log(newStaff);
    this.props.addNewStaff(newStaff);
  }

  validate(name, doB, salaryScale, startDate, annualLeave, overTime) {
    const errors = {
      name1: "",
      doB1: "",
      salaryScale1: "",
      startDate1: "",
      annualLeave1: "",
      overTime1: "",
    };

    if (this.state.touched.name && name.length < 3)
      errors.name1 = "Yêu cầu Nhập, Name should be >= 3 characters.";
    else if (this.state.touched.name && name.length > 21)
      errors.name1 = "Yêu cầu Nhập, Name should be <= 20 characters.";

    if (this.state.touched.doB && doB.length < 3) errors.doB1 = "Yêu cầu nhập.";

    if (this.state.touched.salaryScale && salaryScale < 1)
      errors.salaryScale1 = "Hệ số lương >=1";

    if (this.state.touched.startDate && startDate.length < 3)
      errors.startDate1 = "Yêu cầu nhập.";

    if (this.state.touched.annualLeave && annualLeave < 0)
      errors.annualLeave1 = "AnnualLeave >= 0";

    if (this.state.touched.overTime && overTime < 0)
      errors.overTime1 = "Thời gian làm thêm >= 0 ";

    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.salaryScale,
      this.state.startDate,
      this.state.annualLeave,
      this.state.overTime
    );

    const staff = () => {
      if (this.props.isLoading) {
        return <Loading />;
      } else if (this.props.errMess) {
        return <h4 className="text-danger mt-3">{this.props.errMess}</h4>;
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
        <div className="row justify-content-center">{staff()}</div>

        <div className="mt-3">
          <p>Bấm vào để xem thông tin nhân viên</p>
        </div>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nhập tên nhân viên"
                    value={this.state.name}
                    valid={errors.name1 === ""}
                    invalid={errors.name1 !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name1}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    placeholder="dd/mm/yyyy"
                    value={this.state.doB}
                    valid={errors.doB1 === ""}
                    invalid={errors.doB1 !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB1}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    placeholder="dd/mm/yyyy"
                    value={this.state.startDate}
                    valid={errors.startDate1 === ""}
                    invalid={errors.startDate1 !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate1}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input
                    type="select"
                    id="department"
                    name="department"
                    value={this.state.department}
                    onChange={this.handleInputChange}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    id="salaryScale"
                    name="salaryScale"
                    value={this.state.salaryScale}
                    valid={errors.salaryScale1 === ""}
                    invalid={errors.salaryScale1 !== ""}
                    onBlur={this.handleBlur("salaryScale")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.salaryScale1}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    id="annualLeave"
                    name="annualLeave"
                    value={this.state.annualLeave}
                    valid={errors.annualLeave1 === ""}
                    invalid={errors.annualLeave1 !== ""}
                    onBlur={this.handleBlur("annualLeave")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.annualLeave1}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    id="overTime"
                    name="overTime"
                    value={this.state.overTime}
                    valid={errors.overTime1 === ""}
                    invalid={errors.overTime1 !== ""}
                    onBlur={this.handleBlur("overTime")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.overTime1}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={{ size: 10, offset: 5 }}>
                  <Button type="submit" color="success">
                    Thêm
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default StaffList;
