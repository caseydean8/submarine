import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./nav.css";

class Navbar extends Component {
  redirect = () => {
    console.log("Callback function hit");
    this.props.history.push("/");
  };

  render() {
    return (
      <nav style={{ marginLeft: 0, marginRight: 0 }}>
        <div className="row justify-content-between">
          <div className="col-lg-3 col-md-4">
            <h1>
              <a className="font" href="/">
                Submarine
              </a>
            </h1>
          </div>
          <div className="col-xl-6 col-lg-8 col-md-9 col-sm-12">
            <button
              className="buttons"
              onClick={event => this.props.handleLogout(event, this.redirect)}
            >
              Logout
            </button>
            <a href="/main" title="Subscriptions">
              <button className="buttons">
                Subscriptions
              </button>
            </a>
            <a href="/stats" title="Statistics">
              <button className="buttons">
                Statistics
              </button>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
