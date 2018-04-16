/* eslint-disable react/no-did-mount-set-state */
import React from "react";
import PropTypes from "prop-types";

class LocationForm extends React.Component {
    state = {
        data: {
            id: "",
            name: ""
        },
        errors: {},
        loading: false
    };

    componentDidMount() {
        const {id, name} = this.props;
        if(id) {
            this.setState({data: {id, name}})
        }
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            let data = {}
            if(this.state.id) data = this.state.data;
            else data = {name: this.state.name};
            this.props.submit(data)
                .catch(err => console.log(err)
                // this.setState({ errors: err.response.data.errors, loading: false })
            );
        }
    };

    validate = data => {
        const errors = {};

        if(!data.name) errors.name = "Name cannot be empty";

        return errors;
    };

    render() {
        const { data, errors} = this.state;


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

                <button className="btn btn-fill c-green green-box-shadow">Submit</button>
            </form>
        );
    }
}

LocationForm.propTypes = {
    submit: PropTypes.func.isRequired,
    id: PropTypes.string,
    name: PropTypes.string
};

export default LocationForm;
