import React, {Component} from 'react'
import {Row, Col, Card, CardBody, CardHeader, Button} from 'reactstrap'
import APIStock from '../../modules/API.AlphaVintageManager';
import APIIex from '../../modules/API.IEXManager';

class PortfolioDetail extends Component {
    
    state = {
        stockDetails: {}
    }

    componentDidMount() {
        
        console.log(this.props.symbol)

        APIIex.get(this.props.symbol).then(data => {
            console.log(data);
            this.setState({
                stockDetails: data
            })
        });
		/* APIStock.get(this.props.symbol).then(data => {
			this.setState({
				
				loadingStatus: false
			});
		}); */
    }
    
    render(){
        return (
            <>
            <Row>
                <Col md="4">
                    <h1>{this.state.stockDetails.symbol}</h1>
                    <h4 className="text-muted">{this.state.stockDetails.companyName}</h4>
                </Col>
                <Col md="2"><h3>{this.state.stockDetails.latestPrice}</h3></Col>
            </Row>
            <div className="float-right p-2">
                <Button className="ml-2">Add to Watchlist</Button> 
                <Button className="ml-2">Buy</Button> 
            </div>
            </>
        )
    }
} 

export default PortfolioDetail