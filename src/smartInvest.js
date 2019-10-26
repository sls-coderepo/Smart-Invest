import React, {Component} from 'react'
import NavBar from './components/nav/navBar'
import ApplicationViews from './ApplicationViews';


class SmartInvest extends Component {

    
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