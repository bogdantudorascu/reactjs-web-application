import React from "react";
import PropTypes from "prop-types";
import {
    Navbar,
    Nav,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { NavLink as RouterNavLink } from "react-router-dom";
import {logout} from "../../actions/auth";

class AdminNavigation extends React.Component {
    state = {
        isOpen: false
    };

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    logout = () => {
        this.props.logout();
    }
    render() {
        const { user } = this.props;

        return (
            <div className="img-background">
                <Navbar light expand="lg" className="nav-background">
                    <NavbarBrand tag={RouterNavLink} activeClassName="active" to="/">
                        Website
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    activeClassName="active"
                                    to="/admin/reservations"
                                >
                                    Reservations
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    activeClassName="active"
                                    to="/admin/locations/"
                                >
                                    Locations
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle nav>
                                    {user.email}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {/* <DropdownItem>My Account</DropdownItem> */}
                                    {/* <DropdownItem divider /> */}
                                    <DropdownItem onClick={this.logout}>Logout</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>



                </Navbar>
            </div>
        );
    }
}

AdminNavigation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string
    }),
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { logout })(AdminNavigation);
