import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Reservation from "./Reservation";
import ReservationForm from "../admin/reservations/forms/ReservationForm";
import api from "../../../api";

class ReservationsPage extends React.Component {
    state = {
        reservations: [],
        loading: true
    }

    componentDidMount() {
        api.reservations.getReservations()
            .then(reservations => {
                if(reservations) {
                    this.setState({reservations, loading: false})
                    console.log(typeof reservations)
                    console.log(reservations)
                }
            })
            .catch(err =>
                    console.log(err.response.data)
            );
    }

    render() {
        const { isAuthenticated } = this.props;
        const { reservations, loading } = this.state;
        return (
            <div className="container">
                <div className="card-form">
                    <div className="card-header rose-box-shadow">
                        <i className="fa fa-calendar-alt card-header-icon"> </i>
                        <span className="card-header-title">Reservations</span>
                    </div>
                    <div className="card-content">
                        {loading && <div className="text-center"><i className="fa fa-spinner fa-spin card-spinner"></i></div>}
                        {!loading && reservations.length > 0 &&
                            <div className="row">
                                {reservations.map((reservation) =>
                                    <Reservation key={reservation.id} date={reservation.date} paid={reservation.paid} name={reservation.name} location={reservation.location} isAuthenticated={isAuthenticated}/>
                                )}
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}


ReservationsPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email
    };
}


export default connect(mapStateToProps)(ReservationsPage);
