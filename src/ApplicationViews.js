import {Route} from 'react-router-dom'
import React, {Component} from 'react'
import Login from './components/auth/Login' 
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import Portfolio from './components/portfolio/Portfolio'
import PortfolioSearch from './components/portfolio/Search'
import PortfolioDetail from './components/portfolio/PortfolioDetail'
import Profile from './components/auth/Profile';

class ApplicationViews extends Component {
    render () {
        return (
            <React.Fragment>
               <Route exact path="/" render={props => {
                    return <Dashboard {...props}/>
                }}/> 
                <Route exact path="/profile" render={props => {
                    return <Profile {...props}/>
                }}/> 
                <Route path='/login' render={props => {
                    return <Login  {...props}/>
                }}/> 
                <Route path='/signUp' render={props => {
                    return <SignUp  {...props}/>
                }}/>
                <Route exact path='/portfolio' render={props => {
                    return <Portfolio {...props}/>
                }}/> 
                <Route exact path='/portfolioSearch' render={props => {
                    return <PortfolioSearch {...props}/>
                }}/> 
                <Route path='/portfolio/:symbol' render={props => {
                    return <PortfolioDetail symbol={props.match.params.symbol} {...props}/>
                }}/> 
            </React.Fragment>
        )
    }
}



export default ApplicationViews

