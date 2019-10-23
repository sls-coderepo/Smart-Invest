import {Route} from 'react-router-dom'
import React, {Component} from 'react'
import Login from './components/auth/Login' 
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import Portfolio from './components/portfolio/Portfolio'
import PortfolioDetail from './components/portfolio/PortfolioDetail'

class ApplicationViews extends Component {
    render () {
        return (
            <React.Fragment>
               <Route exact path="/" render={props => {
                    return <Dashboard {...props}/>
                }}/> 
                <Route path='/login' render={props => {
                    return <Login {...props}/>
                }}/> 
                <Route path='/signUp' render={props => {
                    return <SignUp {...props}/>
                }}/>
                <Route exact path='/portfolio' render={props => {
                    return <Portfolio {...props}/>
                }}/> 
                <Route path='/portfolio/:symbol' render={props => {
                    return <PortfolioDetail symbol={props.match.params.symbol} {...props}/>
                }}/> 
            </React.Fragment>
        )
    }
}

export default ApplicationViews

