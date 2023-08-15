import React, { Component } from "react";
import { Card, CardText, CardTitle, CardBody } from "reactstrap";
import { Loading } from "./LoadingComponent";

function Department(props) {
  const depa = () => {
    if (props.isLoading) {
      return <Loading />;
    } else if (props.errMess) {
      return <h4 className="text-danger m-3">{props.errMess}</h4>;
    } else
      return props.department.map((depart) => {
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
  };

  return (
    <div className="container">
      <br />
      <h4>Departments: </h4>
      <br />

      <div className="row">{depa()}</div>
      <br />
    </div>
  );
}

export default Department;
