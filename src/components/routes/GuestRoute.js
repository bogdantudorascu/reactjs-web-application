import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect,withRouter } from "react-router-dom";
import Navigation from "../navigation/Navigation";

const GuestRoute = ({  component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        <div>
            <Navigation/>
            <Component {...props} />
        </div>
    }
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default withRouter(connect(mapStateToProps)(GuestRoute));
