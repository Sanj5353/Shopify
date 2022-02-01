import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
      /*AuthService.getCartItems(this.state.username).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );*/
    } else {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    
      const paperStyle={padding:20, height:'65vh', width:280, margin:"20px auto"}
      const avatarStyle={backgroundColor: '#7272cd'}
      const bStyle={margin:'5px 0'}
    return(
      <div className="cont">
      <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2 style={bStyle}>Sign In</h2>
                </Grid>
                <Grid container direction={"column"} spacing={1}>
                   <Grid item>
                     <TextField   label="Username" placeholder="Enter username" fullWidth required value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
                InputLabelProps={{ style: { fontSize: 12 } }}
                  InputProps={{ style: { fontSize: 12 } }}></TextField>
                   </Grid>
                   <Grid item>
                     <TextField label="Password" placeholder="Enter password" fullWidth required type="password"value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
                InputLabelProps={{ style: { fontSize: 12 } }}
                  InputProps={{ style: { fontSize: 12 } }}></TextField>
                   </Grid>
                </Grid>
                <FormGroup>
                   <FormControlLabel control={<Checkbox defaultChecked/>} label="Remember me" />
                </FormGroup>
                <Button className="btnsign" type="submit" variant="contained" fullWidth color="primary" style={{ fontSize:'11.5px' }}>Sign in</Button>
                <Typography>
                <Link href="#" underline="hover">Forgot Password?</Link>
                </Typography>
                
                
                <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
               
                
            </Paper>
        </Grid>
        </Form></div>
    )
}
}