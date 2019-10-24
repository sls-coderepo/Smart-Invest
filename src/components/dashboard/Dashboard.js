import React, {Component} from 'react'
import { Row, Col, Card, CardBody} from 'reactstrap'
import WatchList from '../portfolio/WatchList'

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
        <WatchList />
       
        </>
        )
    }
} 

export default Dashboard