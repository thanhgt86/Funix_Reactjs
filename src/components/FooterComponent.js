import React from "react";
import { Link } from "react-router-dom";
function Footer(props) {
  return (
    <div className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4 offset-1 col-sm-2">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="col-7 col-sm-5">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay road
              <br />
              Clear Water Bay, kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone fa-lg"></i>: +852 1234
              <br />
              <i className="fa fa-fax fa-lg"></i>: +852 8765 43
              <br />
              <i className="fa fa-envelope fa-lg"></i>:{" "}
              <a href="#">confusion@food.net</a>
            </address>
          </div>

          <div className="col-12 col-sm-4 align-self-center">
            <div className="text-center">
              <a className="btn btn-social-icon btn-google" href="#">
                <i className="fa fa-google" aria-hidden="true"></i>
              </a>
              <a className="btn btn-social-icon btn-facebook" href="#">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a className="btn btn-social-icon btn-linkedin" href="#">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
              <a className="btn btn-social-icon btn-twitter" href="#">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-auto">
            <p>Copyright 2022 by Ristorante con Fusion</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
