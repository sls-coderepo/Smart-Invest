import React, {Component} from 'react'
import {Card, CardBody, CardDeck, CardTitle, CardImg, CardText, CardFooter, Button,  Jumbotron} from 'reactstrap'


class Dashboard extends Component {
    state = {
      
      }


    render(){
        return (
    <>
      <Jumbotron>
        <h1 className="display-3">Invest With No Fears!</h1>
        <p className="lead">Smart Invest lets you play with the numbers and adjust based on your predictions. </p>
        <hr className="my-2" />
        <p>Learn how to be smart with Smart Invest, Grow your savings for future.</p>
       
      </Jumbotron>
      
    <CardDeck>
        <Card>
                <CardImg top width="100%" src="/images/analyze_1.jpg" alt="" />
            <CardBody>
                <CardTitle><h4>Analyze</h4></CardTitle>
                <CardText>Analyze data from trusted real time stock market.</CardText>
            </CardBody>
            <CardFooter>
                <Button  color="secondary">Learn More</Button>
            </CardFooter>
        </Card>
        <Card>
                <CardImg top width="100%" src="../images/investment.jpg" alt="Card image cap" />
            <CardBody>
                <CardTitle><h4>Invest</h4></CardTitle>
                <CardText>Invest your savings confidently to work for you.</CardText>
            </CardBody>
            <CardFooter>
                <Button  color="secondary">Learn More</Button>
            </CardFooter>
        </Card>
        <Card>
                <CardImg top width="100%" src="/../images/grow1.jpg" alt="Card image cap" />
            <CardBody>
                <CardTitle><h4>Grow</h4></CardTitle>
                <CardText>Watch it grow day by day.</CardText>
            </CardBody>
            <CardFooter>
                <Button color="secondary">Learn More</Button>
            </CardFooter>
        </Card>
    </CardDeck>
    
    </>
        )
    }
} 

export default Dashboard