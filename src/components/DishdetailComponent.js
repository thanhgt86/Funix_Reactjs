import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Input,
  Form,
  FormGroup,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      rating: "1",
      yourname: "",
      comment: "",
      touched: {
        yourname: false,
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;
    console.log(event.target);
    this.setState({
      [name]: value,
    });
  }

  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleSubmit() {
    alert(
      `this state is [ rating: ${this.state.rating}, your Name: ${this.state.yourname}, comment: ${this.state.comment} ]`
    );
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  validate(yourname) {
    const errors = {
      yourname1: "",
    };

    if (this.state.touched.yourname && yourname.length < 3) {
      errors.yourname1 = "Must be greater than 2 characters.";
    } else if (this.state.touched.yourname && yourname.length > 16) {
      errors.yourname1 = "Must be 15 characters or less. ";
    }

    return errors;
  }

  RenderDish(dish1) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish1.image} value={dish1.name} />
          <CardBody>
            <CardTitle>{dish1.name}</CardTitle>
            <CardText>{dish1.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  RenderComments(comments1) {
    if (comments1 != null) {
      return (
        <div className="col-12 col-md-6 m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comments1.map((comment) => {
              return (
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>
                    -- {comment.author},{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    const errors = this.validate(this.state.yourname);
    if (this.props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home">Home</Link>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>

              <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{this.props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            {this.RenderDish(this.props.dish)}
            <div className="col">
              {this.RenderComments(this.props.comments2)}
              <Button
                outline
                color="primary"
                className="offset-1"
                onClick={this.toggleModal}
              >
                <span className="fa fa-paper-plane fa-lg"></span> Submit Comment
              </Button>
            </div>
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    type="select"
                    name="rating"
                    id="rating"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="yourname">Your Name</Label>
                  <Input
                    type="text"
                    name="yourname"
                    id="yourname"
                    placeholder="Your Name"
                    value={this.state.yourname}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur("yourname")}
                    valid={errors.yourname1 === ""}
                    invalid={errors.yourname1 !== ""}
                  />
                  <FormFeedback>{errors.yourname1}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="comment">Comment</Label>
                  <Input
                    type="textarea"
                    id="commnent"
                    name="comment"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
