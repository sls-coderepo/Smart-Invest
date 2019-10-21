import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

class SignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        userName: "",
        password: "",
        confirmPassword: ""
    }
    
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSignUp = evt => {
        evt.preDefault()
        let inputValue = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.emailAddress,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
    }



    render() {
        return(
            <Form>
                <Modal>
                    <ModalHeader></ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={this.handleSignUp}>
                         Register
                </Button>
                    </ModalFooter>
                </Modal>
              
            </Form> 
        )
    }
}

export default SignUp