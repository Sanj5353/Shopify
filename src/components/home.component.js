import React, { Component } from "react";

import UserService from "../services/user.service";
import "./home.component.css";
//import shop from process.env.PUBLIC_URL+"/images/Shopify.png";


//const imgMyimageexample = require('../images/Shopify.png');
const divStyle = {
  //opacity: '0.6',
  width: '100%',
  height: '1000px',
  backgroundImage: `url(${process.env.PUBLIC_URL+"/images/Shopify.png"})`,
  backgroundSize: 'cover',
  align:'center'
};


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="cont">
        
        <div style={divStyle}>
          <br></br>
          <br></br>
          <br></br>
        <h1 className = "ShofifyText" align="center">Shopify - The Ultimate Mobile Shopping App</h1>
              </div>
      </div>
    );
  }
}
