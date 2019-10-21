import React, { Component } from "react";
import { Link, withRouter} from "react-router-dom";
import Login from '../auth/Login'
import SignUp from '../auth/SignUp'
import 'bootstrap/dist/css/bootstrap.css';
import {NavbarToggler, Navbar, NavbarBrand, NavLink, Collapse, Nav, NavItem} from 'reactstrap'


class NavBar extends Component {
    state = {
        isSignupModalOpen: false
    }

    toggleSignUp = () => {
      this.setState(prevState => ({
        isSignupModalOpen: !prevState.isSignupModalOpen
      }))
    }

  render() {
    
    return (
      <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">SMART INVEST</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink data-toggle="modal" data-target="#exampleModal">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => {this.toggleSignUp()}}>Signup</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/logout">Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <SignUp isSignupModalOpen={this.state.isSignupModalOpen} 
              toggleSignUp={this.toggleSignUp}
                           {...this.props}/>
      </>
    );
  }
}

export default withRouter(NavBar);
