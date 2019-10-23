import React, { Component } from "react";
import { Link, withRouter} from "react-router-dom";
import Login from '../auth/Login'
import SignUp from '../auth/SignUp'
import 'bootstrap/dist/css/bootstrap.css';
import {NavbarToggler, Navbar, NavbarBrand, NavLink, Collapse, Nav, NavItem} from 'reactstrap'


class NavBar extends Component {
    state = {
        isLoginModalOpen : false,
        isSignupModalOpen : false
    }

    toggleLogin = () => {
        this.setState(prevState => ({
        isLoginModalOpen : !prevState.isLoginModalOpen
      }))
    }

    toggleSignUp = () => {
        this.setState(prevState => ({
        isSignupModalOpen : !prevState.isSignupModalOpen
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
                  <NavLink onClick={() => {this.toggleLogin()}}>Login</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink onClick={() => {this.toggleSignUp()}}>Signup</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/portfolio">Portfolio</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/logout">Logout</NavLink>
            </NavItem>
          </Nav>
          </Collapse>
      </Navbar>
      <Login isLoginModalOpen = {this.state.isLoginModalOpen}
             toggleLogin = {this.toggleLogin}
                           {...this.props}/>
             
      <SignUp isSignupModalOpen = {this.state.isSignupModalOpen} 
              toggleSignUp = {this.toggleSignUp}
                             {...this.props}/>
      </>
    );
  }
}

export default withRouter(NavBar);
