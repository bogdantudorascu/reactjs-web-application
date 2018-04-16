import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirm } from "../../../actions/auth";

class ConfirmationPage extends React.Component {
  state = {
    loading: true,
    success: false,
      response: '',
      errors: {}
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then( response => {
        this.setState({ loading: false, response })
      })
        .catch(err => {
          this.setState({ errors: err.response.data.errors, loading: false})
        }

        )
  }

  render() {
    const { loading, response,errors } = this.state;

    return (
      <div className="container-fluid">
        {loading && (
          <div className="alert alert-info">Validating your account...</div>
        )}

        {!loading &&
          !!response && (
            <div className="alert alert-success">
                {response} Now you can go to your
              <Link to="/dashboard"> dashboard</Link>
            </div>
          )}

        {!loading &&
          errors.global && (
            <div className="alert alert-danger">
                {errors.global}
            </div>
          )}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);
