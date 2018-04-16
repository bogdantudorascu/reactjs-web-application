import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment';

class Reservation extends React.Component {

    state = {
    }

    deleteReservation = () => {
        console.log("Deleting reservation");
    }

    render() {
        /** destructuring */
        const { id, date, paid, name, location } = this.props;
        const formattedDate = moment(date).format("DD/MM/YYYY");
        return (
            <tr>
                <th>{name}</th>
                <th>{formattedDate}</th>
                <th>{paid}</th>
                <th>{location}</th>
                <th scope="row"><Link to={`/admin/reservations/${id}`}><i className="fa fa-edit edit-icon cursor" /></Link></th>
                <th scope="row"><i className="fa fa-trash delete-icon cursor" onClick={this.deleteReservation} /></th>
            </tr>
        )
    }
}

Reservation.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    paid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
};

export default Reservation