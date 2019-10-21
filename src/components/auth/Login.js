import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {Link} from 'react-router-dom'

class Login extends Component {
    state = {
        userName: "",
        password: "",
                
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

    /* toggle = () => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }))
    } */

     render() {
        const closeBtn = <button className="close" onClick={this.props.toggleLogin}>&times;</button>;
        return(
            <Form>
                <Modal  isOpen={this.props.isLoginModalOpen} fade={false} toggle={this.props.isLoginModalOpen} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggleLogin}>Login</ModalHeader>
                    <ModalBody>
                <FormGroup>
                    <Label htmlFor="userName">User Name</Label>
                    <Input type="text" required onChange={this.handleFieldChange} id="userName"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" required onChange={this.handleFieldChange} id="password"></Input>
                </FormGroup>
                </ModalBody>
                <ModalFooter>
                <Button>
                         Save
                </Button>
               
                </ModalFooter>
                </Modal>
            </Form>  
        )
    } 
}

 export default Login  