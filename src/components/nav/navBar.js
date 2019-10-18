import React, { Component } from "react";
import { Link, withRouter} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import {NavbarToggler, Navbar, NavbarBrand, NavLink, Collapse, Nav, NavItem} from 'reactstrap'


class NavBar extends Component {
    state = {
        isOpen: true
    }

    toggle = () => {
        this.setState = {
            isOpen: !this.state.isOpen
        }
    }

  render() {
    
    return (
        <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink data-toggle="modal" data-target="#exampleModal">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signUp">Signup</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default withRouter(NavBar);
