import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';

class Reservation extends React.Component {

    state = {
        id: ''
    }



    render() {
        /** destructuring */
        const { date, paid, name, location, isAuthenticated } = this.props;
        const formattedDate = moment(date).format("DD/MM/YYYY");
        return (
            <div className="col-md-3">
                <div className="reservation-card">
                    <h3 className="rname">{name}</h3>
                    <p className="reservation-p c-gray">
                        <i className="fas fa-calendar-alt reservations-icon"> </i>
                        {formattedDate}
                    </p>
                    <hr className="card-separator"/>
                    {isAuthenticated &&
                        <div>
                            <p className="reservation-p c-gray">{paid} lei</p>
                            <hr className="card-separator"/>
                        </div>
                    }
                    <p className="reservation-p c-gray"><i className="fas fa-map-marker-alt  reservations-icon"></i>{location}</p>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
}

Reservation.propTypes = {
    date: PropTypes.string.isRequired,
    paid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool
};

export default Reservation