import React, {Component} from 'react'
import {Row, Col, Button, Card, Table} from 'reactstrap'
import {Link} from 'react-dom'
import APIIex from '../../modules/API.IEXManager';
import API from '../../modules/API.Manager'
import StockPurchase from './StockPurchase';
import moment from 'moment'

class PortfolioDetail extends Component {
    
    state = {
        stockDetails: {
            chart: {},
            company: {},
            logo: {},
            news: [],
            quote: {},
        },
        
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
        console.log("componentDidMount")
        APIIex.getDetailBatch(this.props.symbol).then(data => {
            this.setState({
                stockDetails: data
            })
            //console.log(this.state.stockDetails.quote.companyName)
        });
		
    }
    
    render(){
        console.log("render")
        return (
            <>
            <Row>
                <Col md="6">
                    <h1>{this.state.stockDetails.quote.companyName}</h1>
                    <h4 className="text-muted">{this.state.stockDetails.quote.primaryExchange} : {this.state.stockDetails.quote.symbol}</h4>
                </Col>
                <Col md="1"><h4>{this.state.stockDetails.quote.latestPrice}</h4></Col>
                <Col md="2">
                    ^ <table>
                        <tr><td>{this.state.stockDetails.quote.change}</td></tr>
                        <tr><td>{this.state.stockDetails.quote.changePercent}%</td></tr>
                    </table>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md="6">
                    
                        <Table className="table-sm">
                            <tr>
                                <td>Previous Close</td>
                                <td>{this.state.stockDetails.quote.previousClose}</td>
                            </tr>
                            <tr>
                                <td>Previous Volume</td>
                                <td>{this.state.stockDetails.quote.previousVolume}</td>
                            </tr>
                            <tr>
                                <td>Avg. Volume</td>
                                <td>{this.state.stockDetails.quote.avgTotalVolume}</td>
                            </tr>
                            <tr>
                                <td>Market Cap</td>
                                <td>{this.state.stockDetails.quote.marketCap}</td>
                            </tr>
                        </Table>
                    
                </Col>
                <Col md="6">
                    
                        <Table className="table-sm">
                            <tr>
                                <td>52 Week Range</td>
                                <td>{this.state.stockDetails.quote.week52Low} - {this.state.stockDetails.quote.week52High}</td>
                            </tr>
                            <tr>
                                <td>YTD Change</td>
                                <td>{this.state.stockDetails.quote.ytdChange}</td>
                            </tr>
                            <tr>
                                <td>P/E Ratio</td>
                                <td>{this.state.stockDetails.quote.peRatio}</td>
                            </tr>
                            <tr>
                                <td>Last Trade Time</td>
                                <td>{moment(this.state.stockDetails.quote.lastTradeTime).format("lll")}</td>
                            </tr>
                        </Table>
                    
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md-6>
                    <Card className="px-2">
                        <ul class="list-unstyled">
                        {this.state.stockDetails.news.map(news => {
                            return (<li class="media my-2 py-2 border-bottom">
                            <img src={news.image} class="mr-3"  width="80px" />
                            <div class="media-body">
                            <a class="mt-0 mb-1" href={news.url} target="_blank">{news.headline}</a>
                            
                            </div>
                        </li>)
                        })}
                </ul>
                </Card>
                </Col>
                <Col md-6>
                <Card className="px-2">
                     <ul class="list-unstyled">
                    
                    <li class="media mt-2">
                        <img class="mr-3" src={this.state.stockDetails.logo.url} width="80px" alt="Generic placeholder image" />
                        <p>{this.state.stockDetails.company.companyName}<br />
                        CEO: {this.state.stockDetails.company.CEO}</p>
                    </li>
                    
                    </ul>
                     
                      
                     <small>{this.state.stockDetails.company.description}<br />
                         Employees: {this.state.stockDetails.company.employees}<br />
                         Sector: {this.state.stockDetails.company.sector}<br />
                         Industry: {this.state.stockDetails.company.industry}<br />
                         <a href={this.state.stockDetails.company.website}  target="_blank">{this.state.stockDetails.company.website}</a> <br />
                          <h6>Address:</h6>
                         {this.state.stockDetails.company.address}<br/>
                             {this.state.stockDetails.company.city} {"  "} 
                             {this.state.stockDetails.company.zip} {"  "} 
                             {this.state.stockDetails.company.country}<br />
                        <h6>Phone: {this.state.stockDetails.company.phone}</h6>
                     </small>
                      
                </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <div className="float-right p-2">
                        <Button className="ml-2" onClick={() => this.handleClick()}>Add to Watchlist</Button> 
                        <Button className="ml-2" onClick={() => {this.togglePurchaseModal()}}>Buy</Button> 
                    </div>
                </Col>
            </Row>
            
            <StockPurchase isPurchaseModalOpen = {this.state.isPurchaseModalOpen}
                           togglePurchaseModal = {this.togglePurchaseModal}
                           setUser = {this.setUser}
                           quote = {this.state.stockDetails.quote}
                           {...this.props}/>
            </>
        )
    }
} 

export default PortfolioDetail