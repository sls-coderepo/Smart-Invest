import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import API from '../../modules/API.Manager'
import Dialog from 'react-bootstrap-dialog'

class SignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        userName: "",
        password: "",
        confirmPassword: "",
       
    }
    
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSignUp = evt => {
        evt.preventDefault()

        if(this.state.userName === '')
        {
            this.dialog.showAlert('Please enter a valid user name')
        }
        else if(this.state.password === '')
        {
            this.dialog.showAlert('Please enter a valid password')
        }
        else if(this.state.password !== this.state.confirmPassword)
        {
            this.dialog.showAlert('Password and Confirm Password did not match')
        }
        else{
            let newUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                userName: this.state.userName,
                password: this.state.password,
            }
            API.post(newUser, "users").then((response) => {
                this.props.toggleSignUp()
                this.props.setUser(response.id, response.firstName);
                this.props.history.push('/')
            })
        }

    }

    render() {
        const closeBtn = <Button className="close" onClick={this.props.toggleSignup}>&times;</Button>
        return(
            <>
            <Form>
                <Modal isOpen={this.props.isSignupModalOpen} fade={false} toggle={this.props.toggleSignup} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggleSignUp}>Register</ModalHeader>
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
                         Save
                </Button>
                    </ModalFooter>
                </Modal>
            </Form> 
             <Dialog ref={(el) => { this.dialog = el }} />  
             </>
        )
    }
}

export default SignUp