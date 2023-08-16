import React, { Component } from "react";
import "../App.css";
import {
  Card,
  CardText,
  CardTitle,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

function Salary(props) {
  const salary = () => {
    if (props.isLoading) {
      return <Loading />;
    } else if (props.errMess) {
      return <h4 className="text-danger m-3">{props.errMess}</h4>;
    } else
      return props.salary.map((sal) => {
        return (
          <div className="col-md-4 col-sm-6 col-xs-12" key={sal.id}>
            <br />
            <Card className="salaryarea">
              <CardTitle className="mt-1 ml-1">{sal.name}</CardTitle>
              <CardBody>
                <CardText>Mã nhân viên: {sal.id}</CardText>
                <CardText>Hệ số lương: {sal.salaryScale}</CardText>
                <CardText>Số ngày làm thêm: {sal.overTime}</CardText>
                <Card className="bg-light">
                  <CardText className="offset-1 mt-1 mb-1 ">
                    Lương:{" "}
                    {Math.round(
                      sal.salaryScale * 3000000 + sal.overTime * 200000
                    )}
                  </CardText>
                </Card>
              </CardBody>
            </Card>
          </div>
        );
      });
  };
  return (
    <div className="container">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/stafflist">Nhân viên</Link>
        </BreadcrumbItem>

        <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
      </Breadcrumb>
      <div className="row">{salary()}</div> <br />
    </div>
  );
}

export default Salary;
