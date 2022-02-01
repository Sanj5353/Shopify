
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import React, { Component } from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { isEmail } from "validator";

import AuthService from "../services/auth.services";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#7272cd' }
    const marginTop = { marginTop: 5 }
    return (
      
<div className="cont">
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
               <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
            {!this.state.successful && (
             // <div>
             <Grid container direction={"column"} spacing={1}>
                 <Grid item>
                <TextField fullWidth label='Name' placeholder="Enter your name" value={this.state.username} onChange={this.onChangeUsername} validations={[required, vusername]}InputLabelProps={{ style: { fontSize: 12 } }}
                    InputProps={{ style: { fontSize: 12 } }}/>
                </Grid>
                <Grid item>
                <TextField fullWidth label='Email' placeholder="Enter your email" value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]} InputLabelProps={{ style: { fontSize: 12 } }}
                    InputProps={{ style: { fontSize: 12 } }}/>
                </Grid>
                <Grid item>
                <TextField fullWidth label='Password' placeholder="Enter your password" value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]} InputLabelProps={{ style: { fontSize: 12 } }}
                    InputProps={{ style: { fontSize: 12 } }}/>
                    </Grid>
                    <Grid item>
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" InputLabelProps={{ style: { fontSize: 12 } }}
                    InputProps={{ style: { fontSize: 12 } }}/>
                    </Grid>
                    
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    
<               Button type='submit' variant='contained' color='primary' style={{ fontSize: "11.5px" }}>Sign up</Button>
</Grid>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
             </Paper>
        </Grid>
          </Form>
          </div>
    );
  }
}
