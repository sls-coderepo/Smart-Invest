import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {Table} from 'reactstrap'
import API from '../../modules/API.Manager'
import NumberFormat from 'react-number-format';
import APIIex from '../../modules/API.IEXManager';


class InvestmentResult extends Component {
    state = {
        investments: [],
        investmentsWithCurrentValueList: []
    }

    getLatestQuote = (symbols) =>
    {
        return APIIex.getMarketBatch(symbols).then(data => {
            return data
        })
    }
    
    getData = () => {
        var stockInvestmentList = []
        API.getAll("Investments").then(data => {
            this.setState({
                investments: data
            })
        }).then(data => {
            let symbolArray = []
            this.state.investments.forEach((item) =>
                {
                    symbolArray.push(item.symbol)
                }
            )
            if(symbolArray.length>0)
            {
                const symbols= symbolArray.join();
                this.getLatestQuote(symbols).then((data)=>{
                    this.state.investments.forEach((item) =>
                    {
                        var stockInvestment =
                                        {
                                            id:item.id,
                                            symbol:item.symbol,
                                            stockName:item.stockName,
                                            purchasePrice:item.purchasePrice,
                                            purchaseQty:item.purchaseQty,
                                            totalPrice:item.totalPrice,
                                            purchaseDate:item.purchaseDate,
                                            latestPrice:data[item.symbol].quote.latestPrice,
                                            totalAmount:data[item.symbol].quote.latestPrice*item.purchaseQty,
                                        };
                                        stockInvestmentList.push(stockInvestment)
                    }
                )
                }).then(() => Promise.all(stockInvestmentList)).then((values) => this.setState({investmentsWithCurrentValueList:values}))
            }
        })
    }



    componentDidMount(){
        this.getData()
    }
    
    render(){
        return (
            <>
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
                           <td className="text-right">{moment(investment.purchaseDate).format("ll")}</td>
                       </tr>)
                   })}
                </tbody>
            </Table>
           
            </>
        )
} 
}

export default InvestmentResult