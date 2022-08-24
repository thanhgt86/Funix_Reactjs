import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  CardBody,
} from "reactstrap";

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onSelectedStaff: null
    }
  }

  onStaffSelect(staff) {
    this.setState({onSelectedStaff: staff})
  }

renderStaff(staff) {
  if (staff != null) {
    return (
      <div className="col-12 col-md-5 m-1">
<Card>
  <CardImg width='100%' src={staff.image} alt={staff.name} />
  
</Card>
      </div>
    )
  }
}

  render() {
    
    return ();
  }
}

export default StaffList;
