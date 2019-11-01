import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import API from '../../modules/API.Manager';
import Dialog from 'react-bootstrap-dialog'

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
        if(this.state.userName === '')
        {
            this.dialog.showAlert('Please enter a valid user name')
        }
        else if(this.state.password === '')
        {
            this.dialog.showAlert('Please enter a valid password')
        }
        else
        {
            let credentials = {
                userName: this.state.userName, 
                password: this.state.password
            }
            API.getLoginUser(credentials).then((response) => {
                if(response.length === 0)
                {
                    this.dialog.showAlert('Invalid login.')
                }
                else{
                    this.props.toggleLogin()
                    this.props.setUser(response[0].id, response[0].firstName)
                    this.props.history.push('/portfolio')
                }
            })
            
        }
        
    }

     render() {
        const closeBtn = <button className="close" onClick={this.props.toggleLogin}>&times;</button>;
        return(
            <>
            <Form >
                <Modal  isOpen={this.props.isLoginModalOpen} fade={false} toggle={this.props.toggleLogin} className={this.props.className}>
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
                <Button onClick={this.handleLogin}>
                         Login
                </Button>
               
                </ModalFooter>
                </Modal>
            </Form>
            <Dialog ref={(el) => { this.dialog = el }} />  
            </>
        )
    } 
}

 export default Login  