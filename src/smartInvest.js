import React, {Component} from 'react'
import NavBar from './components/nav/navBar'
import ApplicationViews from './ApplicationViews';
import APIManager from './modules/API.Manager'
import Login from './components/auth/Login'


class SmartInvest extends Component {

    
    /* 
    checkLoginData = () => {
        APIManager.getRecord(this.state.query)
             .then(userList => {
                 if (userList.length) {
                 localStorage.setItem('credentials', JSON.stringify(userList));
                 this.setState({
            user: this.isAuthenticated()
          });
        } else {
          alert("Input data is not valid. Try again!");
        }
      })
    } */



    
  render() {
      return (
          <>
            <NavBar />
            <div className="container pt-5">
              <ApplicationViews />
            </div>
          </>
      )
  }
}

export default SmartInvest