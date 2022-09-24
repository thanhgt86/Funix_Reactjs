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

function Salary(props) {
  const salary = props.salary.map((sal) => {
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <br />
        <Card>
          <CardBody>
            <CardTitle>{sal.name}</CardTitle>
            <CardText>Mã nhân viên: {sal.id}</CardText>
            <CardText>Hệ số lương: {sal.salaryScale}</CardText>
            <CardText>Số ngày làm thêm: {sal.overTime}</CardText>
            <Card className="bg-light">
              <CardText className="offset-1">
                Lương:{" "}
                {Math.round(sal.salaryScale * 3000000 + sal.overTime * 200000)}
              </CardText>
            </Card>
          </CardBody>
        </Card>
      </div>
    );
  });
  return (
    <div className="container">
      {/* <Breadcrumb>
        <BreadcrumbItem></BreadcrumbItem>
      </Breadcrumb> */}
      <div className="row">{salary}</div>
    </div>
  );
}

export default Salary;
