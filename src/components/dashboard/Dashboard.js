import React, {Component} from 'react'
import { Row, Col, Card, CardBody, Jumbotron} from 'reactstrap'


class Dashboard extends Component {
    state = {
      
      }


    render(){
        return (
    <>
      <Jumbotron>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
       
      </Jumbotron>
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