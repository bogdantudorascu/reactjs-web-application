import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import Location from "./Location";
import api from "../../../../api";

class LocationsPage extends React.Component {
    state = {
        locations: [],
        loading: true
    }

    componentDidMount() {
        api.locations.getLocations()
            .then(locations => {
                if(locations) {
                    this.setState({locations, loading: false})
                }
            })
            .catch(err =>
                console.log(err.response.data)
            );
    }

    render() {
        const { isAuthenticated } = this.props;
        const { locations, loading } = this.state;
        return (
            <div className="container">
                <div className="card-form">
                    <div className="card-header rose-box-shadow">
                        <i className="fa fa-map-marker-alt card-header-icon"> </i>
                        <span className="card-header-title">Locations</span>
                        <Link to="/admin/locations/new/"><i className="fa fa-plus float-right card-header-icon"></i></Link>
                    </div>
                    <div className="card-content">
                        {loading && <div className="text-center"><i className="fa fa-spinner fa-spin card-spinner"></i></div>}

                        {!loading && locations.length > 0 &&
                            <div className="row">
                                {locations.map((reservation) =>
                                    <Location key={reservation.id} id={reservation.id} name={reservation.name}/>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


LocationsPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email
    };
}


export default connect(mapStateToProps)(LocationsPage);
