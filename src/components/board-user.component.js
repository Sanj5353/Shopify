import React, { Component } from "react";
import AuthService from "../services/auth.services";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Footer from "./Footer"

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //content: ""
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true})
  }

  render() {
    const { currentUser} =this.state;
    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
          
          <h1 className="user">Hello, <strong className="username">{currentUser.username}</strong></h1>
        
        
        <h2 className="user">Logged in via <strong className="username">{currentUser.email}</strong>
          </h2>
          
        
        
      
      </div>: null}
      
      </div>
    );
  }
}
