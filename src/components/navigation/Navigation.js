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
import * as actions from "../../actions/auth";

class Navigation extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {

    return (
        <div className="img-background">
      <Navbar light expand="lg" className="nav-background">
        <NavbarBrand tag={RouterNavLink} activeClassName="active" to="/">
          Reservations
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                tag={RouterNavLink}
                activeClassName="active"
                to="/admin/reservations"
              >
                AdminPanel
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </div>
    );
  }
}


export default Navigation
