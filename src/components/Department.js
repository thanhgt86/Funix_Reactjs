import React, { Component } from "react";
import { Card, CardText, CardTitle, CardBody } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";

function Department(props) {
  //Tính toán số lượng nhân viên của từng phòng có xét trường hợp edit dữ liệu
  const countNumberOfStaff = (departId) => {
    let numberOfStaff = 0;
    props.staffs.forEach((item) => {
      if (item.departmentId === departId) {
        numberOfStaff += 1;
      }
    });
    return numberOfStaff;
  };

  const depa = () => {
    if (props.isLoading) {
      return <Loading />;
    } else if (props.errMess) {
      return <h4 className="text-danger m-3">{props.errMess}</h4>;
    } else
      return props.department.map((depart) => {
        return (
          <div className="col-md-4 col-sm-6 col-xs-12" key={depart.id}>
            <Link to={`/department/${depart.id}`}>
              <Card className="departarea">
                <CardBody>
                  <CardTitle>{depart.name}</CardTitle>
                  <CardText>
                    Số lượng nhân viên: {countNumberOfStaff(depart.id)}
                  </CardText>
                </CardBody>
              </Card>{" "}
            </Link>
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
