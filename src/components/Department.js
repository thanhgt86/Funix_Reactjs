import React, { Component } from "react";
import { Card, CardText, CardTitle, CardBody } from "reactstrap";

function Department(props) {
  console.log(props);
  const depa = props.department.map((depart) => {
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <Card className="departarea">
          <CardBody>
            <CardTitle>{depart.name}</CardTitle>
            <CardText>Số lượng nhân viên: {depart.numberOfStaff}</CardText>
          </CardBody>
        </Card>{" "}
        <br />
      </div>
    );
  });

  return (
    <div className="container">
      <br />
      <h4>Departments: </h4>
      <br />

      <div className="row">{depa}</div>
      <br />
    </div>
  );
}

export default Department;
