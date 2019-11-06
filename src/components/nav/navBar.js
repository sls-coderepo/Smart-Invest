import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import Login from '../auth/Login'
import SignUp from '../auth/SignUp'
import 'bootstrap/dist/css/bootstrap.css';
import {NavbarToggler, Navbar, NavbarBrand, NavLink, Collapse, Nav, NavItem} from 'reactstrap'
import './navBar.css'


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

    handleLogout = ()=> {
      this.props.clearUser();
      this.props.history.push('/');
    }

  render() {
  
    return (
      <>
      <Navbar expand="md">
          <NavbarBrand href="/">SMART INVEST</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            { this.props.isLoggedIn ?
            (
              <>
              <NavItem>
                <NavLink>Welcome {this.props.loggedInUserName}!</NavLink>
              </NavItem> 
              <NavItem>
                <NavLink href="/portfolio" >Portfolio</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
                <NavItem>
                    <NavLink  onClick={() => {this.handleLogout()}} >Logout</NavLink>
              </NavItem>
              </>
            ) :
            (
              <>
              <NavItem>
                  <NavLink onClick={() => {this.toggleLogin()}}>Login</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink onClick={() => {this.toggleSignUp()}}>Signup</NavLink>
              </NavItem>
              </>
            )
            }
             
          </Nav>
          </Collapse>
      </Navbar>
     
      <Login isLoginModalOpen = {this.state.isLoginModalOpen}
             toggleLogin = {this.toggleLogin}
             setUser = {this.props.setUser}
                       {...this.props}/>
             
      <SignUp isSignupModalOpen = {this.state.isSignupModalOpen} 
              toggleSignUp = {this.toggleSignUp}
              setUser= {this.props.setUser}
                      {...this.props}/>
      </>
    );
  }
}

export default withRouter(NavBar);
