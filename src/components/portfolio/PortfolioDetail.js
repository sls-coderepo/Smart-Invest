import React, {Component} from 'react'
import {Row, Col, Button} from 'reactstrap'
import APIIex from '../../modules/API.IEXManager';
import API from '../../modules/API.Manager'
import StockPurchase from './StockPurchase';

class PortfolioDetail extends Component {
    
    state = {
        stockDetails: {},
        isPurchaseModalOpen : false,
       
    }

    togglePurchaseModal = () => {
        this.setState(prevState => ({
            isPurchaseModalOpen : !prevState.isPurchaseModalOpen
      }))
    }
    
    
    handleClick = () => {
            let stockWatch = {
            userId: parseInt(localStorage.getItem("loggedInUserId")),
            symbol : this.state.stockDetails.symbol,
            stockName : this.state.stockDetails.companyName

        }
       API.post(stockWatch, "watchlists").then(() => {
                this.props.history.push('/')
        })
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
                <Button className="ml-2" onClick={() => this.handleClick()}>Add to Watchlist</Button> 
                <Button className="ml-2" onClick={() => {this.togglePurchaseModal()}}>Buy</Button> 
            </div>
            <StockPurchase isPurchaseModalOpen = {this.state.isPurchaseModalOpen}
                           togglePurchaseModal = {this.togglePurchaseModal}
                           setUser = {this.setUser}
                           {...this.props}/>
            </>
        )
    }
} 

export default PortfolioDetail