import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.css";
import SignInLogo from "../../components/SignInLogo";
import PaddingDiv from "../../components/PaddingDiv";

const API = require("../../utils/API");

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      form: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username === "") {
      this.props.triggerAlert(
        "Alert",
        "There is no username entered!",
        "CLOSE"
      );
    } else if (this.state.password === "") {
      this.props.triggerAlert(
        "Alert",
        "You forgot to enter a password!",
        "CLOSE"
      );
    } else {
      API.loginUser(this.state)
        .then(response => {
          if (response.status === 200) {
            console.log("login successful");
            this.props.updateAuthStatus(true);
            this.props.updateUserInfo(response.data);
            this.props.history.push("/main");
          }
          if (response.status === 401) {
            console.log("If Clause");
            console.log("please try again");
          }
        })
        .catch(err => {
          console.log("Catch function");
          this.props.triggerAlert(
            "Login failed",
            "Please check your information and try again.",
            "CLOSE"
          );
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6 logo">
            <PaddingDiv height={30} />
            <div className="Submarine-big">Submarine</div>
            <SignInLogo />
          </div>
          <div className="col-lg-6">
            <PaddingDiv height={65} />
            <div className="form-container">
              <form>
                <div className="dive-in">
                  <h2>Dive In!</h2>
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    name="username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="password"
                  />
                </div>
                <button className="buttons" onClick={this.handleSubmit}>
                  Log In
                </button>
                <div className="sign-up-link"><a href="/sign-up">Not a member? Sign up!</a></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
