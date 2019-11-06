import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {Table, Row, Col} from 'reactstrap'
import API from '../../modules/API.Manager'
import NumberFormat from 'react-number-format';
import APIIex from '../../modules/API.IEXManager';
import { Pie } from "react-chartjs-2"
import { rootCertificates } from 'tls';


class InvestmentResult extends Component {
    state = {
        investments: [],
        investmentsWithCurrentValueList: [],
        loggedInUserId: sessionStorage.getItem('loggedInUserId'),
        chartData: {},
        totalPurchaseAmount: 0.00,
        totalCurrentAmount:0.00,
        change: 0.00
        
    }

    
    getLatestQuote = (symbols) =>
    {
         return APIIex.getMarketBatch(symbols).then(data => {
            return data
        })
    }

    getRandomColor = () => {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

       
    getData = () => {
        let stockInvestmentList = []
        API.getInvestments(this.state.loggedInUserId).then(data => {
            this.setState({
                investments: data
            })
        }).then(data => {
            let symbolArray = this.state.investments.map(a=> a.symbol);

            if(symbolArray.length > 0)
            {
                const symbols = symbolArray.join(); //making comma separated symbols to pass into API
                this.getLatestQuote(symbols).then( data => {
                    this.state.investments.forEach((item) =>
                    {
                        let stockInvestment =
                                        {
                                            id:item.id,
                                            symbol:item.symbol,
                                            stockName:item.stockName,
                                            purchasePrice:item.purchasePrice,
                                            purchaseQty:item.purchaseQty,
                                            totalPrice:item.totalPrice,
                                            change:data[item.symbol].quote.latestPrice*item.purchaseQty -  item.totalPrice ,
                                            purchaseDate:item.purchaseDate,
                                            latestPrice:data[item.symbol].quote.latestPrice,
                                            totalAmount:data[item.symbol].quote.latestPrice*item.purchaseQty,
                                        };
                                        stockInvestmentList.push(stockInvestment)
                    }
                )
                }).then(() => Promise.all(stockInvestmentList)).then((values) => 
                {
                        this.setState({
                        totalPurchaseAmount: values.map(i=>parseFloat(i.totalPrice)).reduce((a,b)=> a+b,0),
                        totalCurrentAmount: values.map(i=>parseFloat(i.totalAmount)).reduce((a,b)=> a+b,0),
                        investmentsWithCurrentValueList:values,
                        chartData: {
                            labels: symbolArray,
                            datasets: [{
                                data: values.map(s=>s.totalPrice),
                                backgroundColor: values.map(s=>this.getRandomColor())
                                //backgroundColor:["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9", "#c45850","#d34"]
                            }]
                        }
                    })
                }                       
                ).then(()=>{this.setState({change: this.state.totalCurrentAmount - this.state.totalPurchaseAmount})})
            }
        })
    }


    componentDidMount  () {
        this.getData()
    }
    
    render(){
      
        return (
            <>
            <h4>Portfolio</h4>
            <Table striped>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th className="text-right">Rate</th>
                    <th className="text-right">Qty</th>
                    <th className="text-right">Purchase Amount</th>
                    <th className="text-right">Current Rate</th>
                    <th className="text-right">Current Amount</th>
                    <th className="text-right">Change</th>
                    <th className="text-right">Purchase Date</th>
                </tr>
                </thead>
                <tbody>
                   {this.state.investmentsWithCurrentValueList.map(investment => {
                       return (<tr>
                           <td><Link to={`/portfolio/${investment.symbol}`}>{investment.symbol}</Link></td>
                           <td>{investment.stockName}</td>
                           <td className="text-right"><NumberFormat value={investment.purchasePrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></td>
                           <td className="text-right"><NumberFormat value={investment.purchaseQty} displayType={'text'} thousandSeparator={true} decimalScale={2}/></td>
                           <td className="text-right"><NumberFormat value={investment.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></td>
                           <td className="text-right"><NumberFormat value={investment.latestPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></td>
                           <td className="text-right"><NumberFormat value={investment.totalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></td>    
                           <td className="text-right" style={{color: investment.change > 0 ? "green" : "red"}}><NumberFormat value={investment.change} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></td>                                           
                           <td className="text-right">{moment(investment.purchaseDate).format("lll")}</td>
                       </tr>)
                   })}
                </tbody>
            </Table>

            <Row mt-5="true">
                <Col md-6="true">
                    <Table striped>
                        <tr>
                            <td><b>Total Purchase Amount</b></td>
                            <td className="text-right"><b><NumberFormat value={this.state.totalPurchaseAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></b></td>
                        </tr>
                        <tr>
                            <td><b>Total Current Amount</b></td>
                            <td className="text-right"><b><NumberFormat value={this.state.totalCurrentAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></b></td>
                        </tr>
                        <tr>
                            <td><b>Total Changes</b></td>
                            <td className="text-right" style={{color: this.state.change > 0 ? "green" : "red"}}><b><NumberFormat value={this.state.change} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></b></td>
                        </tr>
                    </Table>
                </Col>
                <Col md-6="true">
                <Pie
                    data={this.state.chartData}
                    options={{
                        legend: {
                            display: true,
                            position: "right"
                        }
                    }}
                />
                </Col>
            </Row>
            
            </>
        )
} 
}

export default InvestmentResult