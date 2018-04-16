import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import api from "../../api";

class DashboardPage extends React.Component {
    componentDidMount() {

    }

    getAll = () => {
        api.reservations.getAll().catch(err =>
            console.log(err.response.data)
            // this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  render() {
    const { isConfirmed } = this.props;
    return (
      <div className="container-fluid">
        {!isConfirmed && <ConfirmEmailMessage />}

          <button onClick={() => this.getAll()}>
              Get reservations
          </button>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: state.user.confirmed
  };
}

export default connect(mapStateToProps)(DashboardPage);
