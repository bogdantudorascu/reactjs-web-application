import React from "react";
// import PropTypes from "prop-types";
import LocationForm from "./forms/LocationForm";
import api from "../../../../api";

class LocationsAdd extends React.Component {
    state = {

    }

    componentDidMount() {
    }

    addLocation = data => {
        api.locations.addLocation(data).then(location => console.log(location))
    }


    render() {
        return (
            <div className="container">
                <div className="card-form">
                    <div className="card-header rose-box-shadow">
                        <i className="fa fa-calendar-alt card-header-icon" />
                        <span className="card-header-title">Add location</span>
                    </div>
                    <div className="card-content">
                        <LocationForm submit={this.addLocation}/>
                    </div>
                </div>
            </div>
        );
    }
}




export default LocationsAdd;
