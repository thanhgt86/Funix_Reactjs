import React, { Component } from "react";
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
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

function Department(props) {
  console.log(props);
  const depa = props.department.map((depart) => {
    return (
      <div className="col-md-2 col-sm-4 col-xs-6">
        <Card>
          <CardBody>
            <CardTitle>{depa.name}</CardTitle>
            <CardText>{depa.numberOfStaff}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  });
}

export default Department;
