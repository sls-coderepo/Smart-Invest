import React, {Component} from 'react'
import {Card, CardBody, CardDeck, CardTitle, CardImg, CardText, CardFooter, Button,  Jumbotron} from 'reactstrap'


class Dashboard extends Component {
    state = {
      
      }


    render(){
        return (
    <>
      <Jumbotron>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead"></p>
        <hr className="my-2" />
        <p></p>
       
      </Jumbotron>
      
    <CardDeck>
        <Card>
                <CardImg top width="100%" src="/images/analyze.jpg" alt="" />
            <CardBody>
                <CardTitle><h4>Analyze</h4></CardTitle>
                <CardText></CardText>
            </CardBody>
            <CardFooter>
                <Button  color="secondary">Learn More</Button>
            </CardFooter>
        </Card>
        <Card>
                <CardImg top width="100%" src="../images/investment.jpg" alt="Card image cap" />
            <CardBody>
                <CardTitle><h4>Invest</h4></CardTitle>
                <CardText></CardText>
            </CardBody>
            <CardFooter>
                <Button  color="secondary">Learn More</Button>
            </CardFooter>
        </Card>
        <Card>
                <CardImg top width="100%" src="/../images/grow1.jpg" alt="Card image cap" />
            <CardBody>
                <CardTitle><h4>Grow</h4></CardTitle>
                <CardText></CardText>
            </CardBody>
            <CardFooter>
                <Button  color="secondary">Learn More</Button>
            </CardFooter>
        </Card>
    </CardDeck>
    
    </>
        )
    }
} 

export default Dashboard