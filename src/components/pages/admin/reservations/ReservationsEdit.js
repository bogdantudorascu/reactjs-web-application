import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import {Redirect} from "react-router-dom";
import ReservationForm from "./forms/ReservationForm";
import InlineError from "../../../messages/InlineMessage";
import api from "../../../../api";

class ReservationsEdit extends React.Component {
    state = {
        reservation: [],
        loading: true,
        errors: [],
        fireRedirect: false
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        if(Validator.isNumeric(id)){
            api.reservations.getReservation(id)
                .then(reservation => {
                    this.setState({reservation,loading: false})
                })
                .catch(err => {
                    this.setState({errors: ["Server error"],loading: false})
                })
        } else {
            this.setState({errors: ["Please enter a valid number"],loading: false})
        }
    }

    updateReservation = data => {
        this.setState({loading: true})
        api.reservations.updateReservation(data)
            .then(() => this.setState({fireRedirect: true}))
            .catch(err => this.setState({errors: ["Server error"],loading: false}))
            
    }


    render() {
        const {loading, reservation, errors, fireRedirect} = this.state;

        return (
            <div className="container">
                <div className="card-form">
                    <div className="card-header rose-box-shadow">
                        <i className="fa fa-calendar-alt card-header-icon" />
                        <span className="card-header-title">Edit reservation</span>
                    </div>
                    <div className="card-content">
                        {!loading
                        && errors.length !== 0
                        && <div className="alert alert-danger">
                            {errors.map((error, index) => <InlineError key={`resErr${index}`} text={error}/>)}
                        </div>  }

                        {loading && <div className="text-center"><i className="fa fa-spinner fa-spin card-spinner" /></div>}

                        {!loading
                        && errors.length === 0
                        && reservation.length !== 0
                        && <ReservationForm submit={this.updateReservation}
                                            id={reservation[0].id}
                                            name={reservation[0].name}
                                            date={reservation[0].date}
                                            paid={`${reservation[0].paid}`}
                                            location_Id={`${reservation[0].location_id}`}
                            />}

                        {!loading
                        && errors.length === 0
                        && reservation.length === 0
                        && <h5 className="text-center">No such reservation present</h5>}
                    </div>
                </div>

                {fireRedirect && <Redirect to="/admin/reservations"/>}
            </div>
        );
    }
}

ReservationsEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    })
};



export default ReservationsEdit;
