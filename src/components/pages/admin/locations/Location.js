import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Location extends React.Component {

    componentDidMount() {
    }

    editLocation = () => {
        console.log(`will edit${this.props.id}`);
    }

    deleteLocation = () => {
        console.log(`will delete${this.props.id}`);
    }

    render() {
        /** destructuring */
        const { id, name } = this.props;
        return (
            <div className="col-12">
                <div className="location-card">
                    <p className="location-card-name">{name}</p>
                    <i className="fa fa-trash float-right delete-icon cursor" onClick={this.deleteLocation} />
                    <Link to={`/admin/locations/${id}`}><i className="fa fa-edit float-right edit-icon cursor" /></Link>
                    <div className="clearfix" />
                </div>
            </div>
        )
    }
}

Location.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

export default Location