import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import Reservation from "./Reservation";
import api from "../../../../api";

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
                        <i className="fa fa-calendar-alt card-header-icon"></i>
                        <span className="card-header-title">Reservations</span>
                        <Link to="/admin/reservations/new/"><i className="fa fa-plus float-right card-header-icon"></i></Link>
                    </div>
                    <div className="card-content">
                        {loading && <div className="text-center"><i className="fa fa-spinner fa-spin card-spinner"></i></div>}
                        {!loading && reservations.length > 0 &&
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Paid</th>
                                <th scope="col">Location</th>
                                <th scope="col"><i className="fa fa-edit edit-icon"/></th>
                                <th scope="col"><i className="fa fa-trash delete-icon"/></th>
                            </tr>
                            </thead>
                            <tbody>
                            {reservations.map((reservation) =>
                                <Reservation key={reservation.id} id={reservation.id} date={reservation.date} paid={reservation.paid} name={reservation.name} location={reservation.location}/>
                            )}
                            </tbody>
                        </table>
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
