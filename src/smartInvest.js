import React, {Component} from 'react'
import NavBar from './components/nav/navBar'
import ApplicationViews from './ApplicationViews';


  class SmartInvest extends Component {
    state = {
      isLoggedIn: sessionStorage.getItem("loggedInUserId") !== null,
      loggedInUserId: '',
      loggedInUserName: '',
  }
 
  setUser = (userId, userName) => {
    sessionStorage.setItem('loggedInUserId', userId);
    sessionStorage.setItem('loggedInUserName', userName);
    this.setState({ loggedInUserId: userId, loggedInUserName: userName, isLoggedIn: true });
  }

  clearUser = () =>
  {
    sessionStorage.removeItem('loggedInUserId');
    sessionStorage.removeItem('loggedInUserName');
    this.setState({
      loggedInUserId: '', 
      loggedInUserName: '',
      isLoggedIn: false 
    })
  }

  componentDidMount () {
    let isLoggedIn = sessionStorage.getItem("loggedInUserId") !== null
    if(isLoggedIn)
    {
       this.setState({
        loggedInUserId: sessionStorage.getItem('loggedInUserId'),
        loggedInUserName: sessionStorage.getItem('loggedInUserName'),
       })
    }
    
  }


    
  render() {
      return (
          <>
            <NavBar 
                  loggedInUserId={this.state.loggedInUserId}
                  isLoggedIn={this.state.isLoggedIn}
                  loggedInUserName={this.state.loggedInUserName}
                  setUser = {this.setUser}
                  clearUser = {this.clearUser}
                  />
            <div className="container pt-5" style={{"min-height":"780px"}}>
              <ApplicationViews loggedInUserId={this.state.loggedInUserId}/>
            </div>
            <div className="bg-secondary text-center mt-4 p-3">
                <p>&copy; Smart Invest</p>
            </div>
          </>
      )
  }
}

export default SmartInvest