import React, {Component} from 'react'
import NavBar from './components/nav/navBar'
import ApplicationViews from './ApplicationViews';
import Login from './components/auth/Login'


class SmartInvest extends Component {
    state = {
        user: false
    }
     isAuthenticated = () => localStorage.getItem("credentials") !== null
     
     setUser = (authObj) => {
         localStorage.setItem(
             "credentials",
             JSON.stringify(authObj)
         )
         this.state({
             user: this.isAuthenticated()
         })
     }

     clearUser = () => {
         localStorage.clear()
         this.setState({
             user: this.isAuthenticated()
         })
     }

     componentDidMount(){
         this.setState({
             user: this.isAuthenticated
         })
     }
  render() {
      return (
          <>
          <NavBar user={this.state.user} clear={this.clearUser}/>
          <div className="container pt-5">
          <ApplicationViews user={this.state.user} setUser={this.setUser}/>
          </div>
          </>
      )
  }
}

export default SmartInvest