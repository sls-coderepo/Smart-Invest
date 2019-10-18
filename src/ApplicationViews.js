import {Route, Redirect} from 'react-router-dom'
import React, {Component} from 'react'
import Login from './auth/Login'

class ApplicationViews extends Component {
    render () {
        return (
            <React.Fragment>
                <Route path='/login' render={props => {
                    return <Login {...props}/>
                }}/>
            </React.Fragment>
        )
    }
}

export default ApplicationViews

