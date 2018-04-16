import React from "react";
import PropTypes from "prop-types";
import { connect} from "react-redux";
import { Route, Redirect,withRouter } from "react-router-dom";
import AdminNavigation from "../navigation/AdminNavigation";


const AdminRoute = ({ loaded, isAuthenticated, component: Component, ...rest }) => (

        <Route
            {...rest}
            render={props =>
                <div>
                    {!loaded && <div className="text-center"><i className="fa fa-spinner fa-spin admin-panel-spinner" /></div>}
                    {loaded && isAuthenticated &&
                    <div>
                        <AdminNavigation/>
                        <Component {...props} />
                    </div>
                    }

                    {loaded && !isAuthenticated && <Redirect to="/login" />}
                </div>
            }
        />
    );

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
    loaded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
        loaded: state.user.loaded,
        isAuthenticated: state.user.admin
  };
}

export default withRouter(connect(mapStateToProps)(AdminRoute));
