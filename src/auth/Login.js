import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {Link} from 'react-router-dom'

class Login extends Component {
    state = {
        userName: "",
        password: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = evt => {
        evt.preventDefault()
        let credentials = {userName: this.state.userName, password: this.state.password}
        this.props.setUser(credentials)
        this.props.history.push('/')
    }

    render() {
        return(
               
            <Form>
                <FormGroup>
                    <Label htmlFor="userName">User Name</Label>
                    <Input type="text" required onChange={this.handleFieldChange} id="userName"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" required onChange={this.handleFieldChange} id="password"></Input>
                </FormGroup>
                <Button>
                         Save
                </Button>
            </Form>  
        )
    }
}

export default Login