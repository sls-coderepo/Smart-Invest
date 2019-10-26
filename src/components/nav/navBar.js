import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import Login from '../auth/Login'
import SignUp from '../auth/SignUp'
import 'bootstrap/dist/css/bootstrap.css';
import {NavbarToggler, Navbar, NavbarBrand, NavLink, Collapse, Nav, NavItem} from 'reactstrap'


class NavBar extends Component {
    state = {
        isLoggedIn: localStorage.getItem("loggedInUserId") !== null,
        loggedInUserId: '',
        loggedInUserName: '',
        isLoginModalOpen : false,
        isSignupModalOpen : false
    }

    isAuthenticated = () => localStorage.getItem("loggedInUserId") !== null

    setUser = (userId, userName) => {
      localStorage.setItem('loggedInUserId', userId);
      localStorage.setItem('loggedInUserName', userName);
      this.setState({ loggedInUserId: userId, loggedInUserName: userName, isLoggedIn: true });
    }

    clearUser = () =>
    {
      localStorage.removeItem('loggedInUserId');
      localStorage.removeItem('loggedInUserName');
      this.setState({
        loggedInUserId: '', 
        isLoggedIn: false 
      })
    }

    handleLogout = ()=> {
      this.clearUser();
      this.props.history.push('/');
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
            { this.state.isLoggedIn ?
            (
              <>
              <NavItem><NavLink>Welcome {this.state.loggedInUserName}!</NavLink></NavItem> 
              <NavItem>
                <NavLink href="/portfolio">Portfolio</NavLink>
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
             setUser = {this.setUser}
                       {...this.props}/>
             
      <SignUp isSignupModalOpen = {this.state.isSignupModalOpen} 
              toggleSignUp = {this.toggleSignUp}
              setUser= {this.setUser}
                      {...this.props}/>
      </>
    );
  }
}

export default withRouter(NavBar);
