import React from "react";
import moment from 'moment';
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import Validator from "validator";
import 'react-datepicker/dist/react-datepicker.css';
import api from "../../../../../api";

class ReservationForm extends React.Component {
    state = {
        data: {
            id: "",
            date: moment(),
            paid: "",
            name: "",
            location_id: ""
        },
        locations: [],
        errors: {},
        loading: false
    };

    componentDidMount() {
        const {id, name, date, paid, location_id} = this.props;
        console.log(this.props);
        if(id){
            this.setState({data: {id,name,paid,location_id, date: moment(date)}})
        }
        api.locations.getLocations()
            .then(locations => {
                if(locations.length > 0){
                    this.setState({locations})
                    if(!id)
                        this.setState({data: { ...this.state.data, location_id : locations[0].id }})
                }

            })
            .catch(err =>
                console.log(err.response.data)
            );
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        console.log(this.state.data)
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            // const date = moment(this.state.data.date).format('YYYY/MM/DD');
            this.props
                .submit(this.state.data)
                // .catch(err => console.log(err)
                //     // this.setState({ errors: err.response.data.errors, loading: false })
                // );
        }
    };

    handleDateChange= (date) => {
        this.setState({
            data: { ...this.state.data, date }
        });
    }

    validate = data => {
        const errors = {};
        if(!data.date) errors.date = "Date cannot be empty";
        else if(data.date && Validator.toDate(data.date.toString()) == null) errors.date = "Invalid date format";
        else if(!data.date) errors.date = "Please input a date";

        if(!data.name) errors.name = "Name cannot be empty";

        if(!data.location_id) errors.location = "Location cannot be empty";

        if(!data.paid) errors.paid = "Sum cannot be empty";
        else if (!Validator.isDecimal(data.paid,{decimal_digits: '1,2'}) && data.paid.length < 7) errors.paid = "Invalid number format";
        return errors;
    };

    render() {
        const { data, errors, locations } = this.state;

        const locationsSelection = locations.map(location => (
            <option key={location.id} value={location.id}>
                {location.name}
            </option>
        ));

        return (
                <form onSubmit={this.onSubmit}>

                    {errors.global && (
                        <div className="alert alert-danger">{errors.global}</div>
                    )}

                    <div className="form-group">
                        <label htmlFor="paid">Name</label>
                        <input type="text"
                               id="name"
                               name="name"
                               value={data.name}
                               onChange={this.onChange}
                               className={
                                   errors.name ? "form-control is-invalid" : "form-control"
                               }/>
                        <div className="invalid-feedback">{errors.name}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <DatePicker
                            id="date"
                            dateFormat="DD/MM/YYYY"
                            className={
                                errors.date ? "form-control is-invalid" : "form-control"
                            }
                            selected={this.state.data.date}
                            onChange={this.handleDateChange}
                        />
                        {errors.date && <div className="form-control is-invalid" style={{display: "none"}} />}
                        <div className="invalid-feedback">{errors.date}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="paid">Sum</label>
                        <input type="text"
                               id="paid"
                               name="paid"
                               value={data.paid}
                               onChange={this.onChange}
                               className={
                                   errors.paid ? "form-control is-invalid" : "form-control"
                               }/>
                        <div className="invalid-feedback">{errors.paid}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="locations">Location</label>
                        <select className={
                                errors.location ? "form-control is-invalid" : "form-control"
                                }
                                id="locations" value={data.location_id} onChange={this.onChange} name="location_id">
                            {locationsSelection}
                        </select>
                        <div className="invalid-feedback">{errors.location}</div>
                    </div>
                    <button className="btn btn-fill c-green green-box-shadow">Submit</button>
                </form>
        );
    }
}

ReservationForm.propTypes = {
    submit: PropTypes.func.isRequired,
    id: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
    paid: PropTypes.string,
    location_id: PropTypes.string
};

export default ReservationForm;
