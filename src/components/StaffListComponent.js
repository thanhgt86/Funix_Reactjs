import React, { Component } from "react";
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
    };
    console.log(this.props.staffs);
    this.handleSearchStaff = this.handleSearchStaff.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  // handleChange(event) {
  //   // event.preventDefault();
  //   this.setState({
  //     search: event.target.value,
  //   });
  //   console.log(event.target);
  // }

  render() {
    const staff = this.props.staffs
      .filter((staff) => {
        if (this.state.search === "") return staff;
        else if (
          staff.name.toLowerCase().includes(this.state.search.toLowerCase())
        )
          return staff;
      })
      .map((person) => {
        return (
          <div className="col-md-2 col-sm-4 col-xs-6 mb-3">
            <Card key={person.id}>
              <Link to={`/staffList/${person.id}`}>
                <CardImg width="100%" src={person.image} alt={person.name} />
                <CardTitle className="text-center my-2">
                  {person.name}
                </CardTitle>
              </Link>
            </Card>
          </div>
        );
      });

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
        <div className="row">{staff}</div>

        <div className="mt-3">
          <p>Bấm vào để xem thông tin nhân viên</p>
        </div>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
          <ModalBody>
            <Form>
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
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="birthyear" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="birthyear"
                    name="birthyear"
                    placeholder="dd/mm/yyyy"
                    value={this.state.doB}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="birthyear" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="birthyear"
                    name="birthyear"
                    placeholder="dd/mm/yyyy"
                    value={this.state.startDate}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="birthyear" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input
                    type="select"
                    id="birthyear"
                    name="birthyear"
                    value={this.state.department}
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
                <Label htmlFor="birthyear" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    id="birthyear"
                    name="birthyear"
                    value={this.state.salaryScale}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="birthyear" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    id="birthyear"
                    name="birthyear"
                    value={this.state.annualLeave}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="birthyear" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    id="birthyear"
                    name="birthyear"
                    value={this.state.overTime}
                  />
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
