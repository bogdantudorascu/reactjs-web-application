import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import {Redirect} from "react-router-dom";
import LocationForm from "./forms/LocationForm";
import InlineError from "../../../messages/InlineMessage";
import api from "../../../../api";

class LocationsEdit extends React.Component {
    state = {
        location: [],
        loading: true,
        errors: [],
        fireRedirect: false
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        if(Validator.isNumeric(id)){
            api.locations.getLocation(id)
                .then(location => {
                    this.setState({location,loading: false})
                })
                .catch(err => {
                    this.setState({errors: ["Server error"],loading: false})
                })
        } else {
            this.setState({errors: ["Please enter a valid number"],loading: false})
        }
    }

    updateLocation = data => {
        this.setState({loading: true})
        api.locations.updateLocation(data)
            .then(() => {
                this.setState({fireRedirect: true})
            })
            .catch(err => this.setState({errors: ["Server error"],loading: false})
                // this.setState({errors: err.response.data.errors,loading: false})
            )
    }


    render() {
        const {loading, location, errors, fireRedirect} = this.state;
        return (
            <div className="container">
                <div className="card-form">
                    <div className="card-header rose-box-shadow">
                        <i className="fa fa-calendar-alt card-header-icon" />
                        <span className="card-header-title">Edit location</span>
                    </div>
                    <div className="card-content">
                        {!loading
                        && errors.length !== 0
                        && <div className="alert alert-danger">
                            {errors.map((error, index) => <InlineError key={`locErr${index}`} text={error}/>)}
                        </div>  }

                        {loading && <div className="text-center"><i className="fa fa-spinner fa-spin card-spinner" /></div>}

                        {!loading
                            && errors.length === 0
                            && location.length !== 0
                            && <LocationForm submit={this.updateLocation} id={location[0].id} name={location[0].name}/>}

                        {!loading
                            && errors.length === 0
                            && location.length === 0
                            && <h5 className="text-center">No such location present</h5>}
                    </div>
                </div>

                {fireRedirect && <Redirect to="/locations"/>}
            </div>
        );
    }
}

LocationsEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    })
};



export default LocationsEdit;
