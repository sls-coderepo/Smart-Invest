import {Route} from 'react-router-dom'
import React, {Component} from 'react'
import Login from './components/auth/Login' 
import SignUp from './components/auth/SignUp'

class ApplicationViews extends Component {
    render () {
        return (
            <React.Fragment>
                <Route path='/login' render={props => {
                    return <Login {...props}/>
                }}/> 
                <Route path='/signUp' render={props => {
                    return <SignUp {...props}/>
                }}/>
            </React.Fragment>
        )
    }
}

export default ApplicationViews

