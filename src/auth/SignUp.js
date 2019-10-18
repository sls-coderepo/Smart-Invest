import React, {Component} from 'react'
import {Form, FormGroup, Label, Input} from 'react-router-dom'

class SignUp extends Component {
    render() {
        return(
            <Form>
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input type="text" required onChange={this.handleFieldChange} id="firstName"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input type="text" required onChange={this.handleFieldChange} id="lastName"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="emailAddress">Email</Label>
                    <Input type="text" required onChange={this.handleFieldChange} id="emailAddress"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="userName">User Name</Label>
                    <Input type="text" required onChange={this.handleFieldChange} id="userName"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" required onChange={this.handleFieldChange} id="password"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input type="password" required onChange={this.handleFieldChange} id="confirmPassword"></Input>
                </FormGroup>
                <Button>
                         Register
                </Button>
            </Form> 
        )
    }
}

export default SignUp