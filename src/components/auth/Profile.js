import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button,Card, CardBody, CardHeader, Row, Col} from 'reactstrap'
import API from '../../modules/API.Manager'
import Dialog from 'react-bootstrap-dialog'

class Profile extends Component {
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

    handleUpdate = evt => {
        evt.preventDefault()
        if(this.state.userName === '')
        {
            this.dialog.showAlert('Please enter a valid user name')
        }
        else{
            let updatedUser = {
                id: sessionStorage.getItem("loggedInUserId"),
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                userName: this.state.userName,
               
            }
            API.updatePartial(updatedUser, "users").then((response) => {
                    this.props.history.push('/portfolio')
            })
        }

    }

    componentDidMount() {
        let userId = sessionStorage.getItem("loggedInUserId")
        
        API.getUserById(userId).then(user => {
            console.log(user)
            this.setState({
                
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emailAddress,
                userName: user.userName,
            })
        })
    }

    render() {
        
        return(
            <>
           <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Card>
                    <CardHeader>Update Profile</CardHeader>
                    <CardBody>
                <Form>
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input type="text" required onChange={this.handleFieldChange} value={this.state.firstName} id="firstName"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input type="text" required onChange={this.handleFieldChange} value={this.state.lastName} id="lastName"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="emailAddress">Email</Label>
                    <Input type="text" required onChange={this.handleFieldChange} value={this.state.emailAddress} id="emailAddress"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="userName">User Name</Label>
                    <Input  disabled="disabled" type="text" required onChange={this.handleFieldChange} value={this.state.userName} id="userName"></Input>
                </FormGroup>
                <FormGroup>
                <Button onClick={this.handleUpdate}>
                         Update
                </Button>
                </FormGroup>
                </Form> 
                </CardBody>
                </Card>
            </Col>
            </Row>
           <Dialog ref={(el) => { this.dialog = el }} />
           </>
        )
    }
}

export default Profile