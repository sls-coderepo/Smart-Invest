import React, {Component} from 'react'
import {Alert, Row, Col, Card, CardBody, Input,InputGroup, InputGroupAddon, Button} from 'reactstrap'
import APIStock from '../../modules/API.AlphaVintageManager';
import APIIex from '../../modules/API.IEXManager'

class Dashboard extends Component {
    state = {
      
      }


    render(){
        return (
        <>
               
        <Row>
            <Col md="4" sm="4">
            <Card>
                <CardBody>

                </CardBody>
            </Card>
            </Col>
            <Col md="4" sm="4">
            <Card>
                <CardBody>

                </CardBody>
            </Card>
            </Col>
            <Col md="4" sm="4">
            <Card>
                <CardBody>

                </CardBody>
            </Card>
            </Col>
        </Row>
        </>
        )
    }
} 

export default Dashboard