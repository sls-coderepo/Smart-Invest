import React, {Component} from 'react'
import {Row, Col, Button, Card, Table} from 'reactstrap'
import APIIex from '../../modules/API.IEXManager';
import API from '../../modules/API.Manager'
import StockPurchase from './StockPurchase';
import moment from 'moment'
import AlternateStock from './AlternateStock'
import {Line} from 'react-chartjs-2';
class PortfolioDetail extends Component {
    
    state = {
        stockDetails: {
            chart: {},
            company: {},
            logo: {},
            news: [],
            quote: {},
        },
        loggedInUserId: parseInt(sessionStorage.getItem("loggedInUserId")),
        isPurchaseModalOpen : false,
        investment:{},
        investmentId:0,
        chartData: {},
       
    }

    togglePurchaseModal = () => {
        this.setState(prevState => ({
            isPurchaseModalOpen : !prevState.isPurchaseModalOpen
      }))
    }
    
    
    handleAddToWatchListClick = () => {
            let stockWatch = {
            userId: parseInt(sessionStorage.getItem("loggedInUserId")),
            symbol : this.state.stockDetails.quote.symbol,
            stockName : this.state.stockDetails.quote.companyName

        }
       API.post(stockWatch, "watchlists").then(() => {
                this.props.history.push('/')
        })
    }

    handleSellStockClick () {

    }

    handleAddAlternateRouteClick (investmentId) {
        this.props.history.push(`/portfolio/${investmentId}/alternate`)
    }
    
    componentDidMount  ()  {
        APIIex.getDetailBatch(this.props.symbol).then(data => {
            this.setState({
                stockDetails: data
            })
         API.getInvestmentBySymbol(this.props.symbol, this.state.loggedInUserId).then(data => {
            this.setState({
                investment : data,
            })
        }).then(()=>{console.log(this.state.stockDetails); this.makeChartData()})
            //console.log(this.state.stockDetails.quote.companyName)
        });
    }

    makeChartData () {
        this.setState({
            chartData: {
                labels: this.state.stockDetails.chart.map(c=>c.label),
                datasets: [
                    {
                      label: '30 Days',
                      fill: true,
                      lineTension: 0.1,
                      backgroundColor: 'rgba(75,192,192,0.4)',
                      borderColor: 'rgba(75,192,192,1)',
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: 'rgba(75,192,192,1)',
                      pointBackgroundColor: '#fff',
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                      pointHoverBorderColor: 'rgba(220,220,220,1)',
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this.state.stockDetails.chart.map(c=>c.close)
                    }
                  ]
            }
        })
    }

    
    render(){
        return (
            <>
            <Row>
                <Col md="6">
                    <h1>{this.state.stockDetails.quote.companyName}</h1>
                    <h4 className="text-muted">{this.state.stockDetails.quote.primaryExchange} : {this.state.stockDetails.quote.symbol}</h4>
                </Col>
                <Col md="1"><h4>{this.state.stockDetails.quote.latestPrice}</h4></Col>
                <Col md="2">
                    <table>
                        <tbody>
                        <tr><td>{this.state.stockDetails.quote.change}</td></tr>
                        <tr><td>{this.state.stockDetails.quote.changePercent}%</td></tr>
                        </tbody>
                    </table>
                </Col>
                <Col md="3">
                {
                    (this.state.investment.length > 0) ?
                    ( <>
                        <h3> ${(parseFloat(this.state.stockDetails.quote.latestPrice)*parseFloat(this.state.investment[0].purchaseQty)).toFixed(2)}</h3>
                        
                        <small>${this.state.investment[0].totalPrice} ({(parseFloat(this.state.stockDetails.quote.latestPrice)*parseFloat(this.state.investment[0].purchaseQty) - this.state.investment[0].totalPrice).toFixed(2)})</small>
                    </>
                    ):null
                }
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md="6">
                    
                        <Table className="table-sm">
                            <tbody>
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
                            </tbody>
                        </Table>
                    
                </Col>
                <Col md="6">
                    
                        <Table className="table-sm">
                        <tbody>
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
                            </tbody>
                        </Table>
                    
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <Line data={this.state.chartData} height={50} />
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <div className="float-right p-2">
                        {
                            (this.state.investment.length > 0) ?
                            (   <>
                                <Button className="ml-2" onClick={() => this.handleSellStockClick()}>Sell Stock</Button> 
                                <Button className="ml-2" onClick={() => this.handleAddAlternateRouteClick(this.state.investment[0].id)}>Add Alternate Route</Button> 
                                </>
                            )
                            :
                            (
                                <>
                                <Button className="ml-2" onClick={() => this.handleAddToWatchListClick()}>Add to Watchlist</Button> 
                                <Button className="ml-2" onClick={() => {this.togglePurchaseModal()}}>Buy</Button> 
                                </>
                            )
                        }
                        
                    </div>
                </Col>
            </Row>
            {
                (this.state.investment.length > 0) ?
                ( <>
                        <Row className="mt-4">
                            <Col>
                                <AlternateStock investmentId={this.state.investment[0].id}  investment={this.state.investment}  {...this.props}/>
                            </Col>
                        </Row>
                        </>
                ):null
            }
            <Row className="mt-4">
                <Col md-6="true">
                    <Card className="px-2">
                        <ul className="list-unstyled">
                            {this.state.stockDetails.news.map(news => {
                            return (<li className="media my-2 py-2 border-bottom" key={news.url}>
                            <img src={news.image} className="mr-3"  width="80px" />
                            <div className="media-body">
                                <small>
                            <a className="mt-0 mb-1" href={news.url} target="_blank">{news.headline}</a>
                            </small>
                            </div>
                        </li>)
                        })}
                </ul>
                </Card>
                </Col>
                <Col md-6="true">
                <Card className="px-2">
                     <ul className="list-unstyled">
                    
                    <li className="media mt-2">
                        <img className="mr-3" src={this.state.stockDetails.logo.url} width="80px" alt="Generic placeholder image" />
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