import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReservationForm from "./forms/ReservationForm";
import api from "../../../../api";

class ReservationsAdd extends React.Component {
    state = {

    }

    componentDidMount() {

    }

    addReservation = data => {
        api.reservations.addReservation(data).then(reservation => console.log(reservation))
    }


    render() {
        return (
            <div className="container">
                <div className="card-form">
                    <div className="card-header rose-box-shadow">
                        <i className="fa fa-calendar-alt card-header-icon"> </i>
                        <span className="card-header-title"> Add Reservation</span>
                    </div>
                    <div className="card-content">
                        <ReservationForm submit={this.addReservation}/>
                    </div>
                </div>
            </div>
        );
    }
}



export default ReservationsAdd;
