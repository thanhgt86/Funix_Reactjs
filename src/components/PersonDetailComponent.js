import React, { Component } from "react";
import { CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

class PersonDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-4 col-xs-12">
              <CardImg width="100%" src={staff.image} alt={staff.name} />
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12">
              <p>
                <strong>Họ và tên: {staff.name}</strong>
              </p>
              <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
              <p>
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </p>
              <p>Phòng ban: {staff.department}</p>
              <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
              <p>Số ngày làm thêm: {staff.overTime}</p>
            </div>
            <hr />
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/stafflist">Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{this.props.person.name}</BreadcrumbItem>
        </Breadcrumb>
        <div>{this.renderStaff(this.props.person)}</div> <br />
      </div>
    );
  }
}

export default PersonDetail;
