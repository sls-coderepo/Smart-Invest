import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {Table} from 'reactstrap'
import API from '../../modules/API.Manager'
import NumberFormat from 'react-number-format';
import APIIex from '../../modules/API.IEXManager';

class AlternateStock extends Component {
    state = {
       alternateStockList: [],
       alternateWithCurrentValueList: [],
       investment:{},
       loggedInUserId: sessionStorage.getItem('loggedInUserId')
      }
     
    getLatestQuote = (symbols) =>
    {
        return APIIex.getMarketBatch(symbols).then(data => {
            return data
        })
    }

    getData = () => {
        let stockInvestmentList = []
        API.getAlternateStocks(this.props.investmentId, this.state.loggedInUserId).then((response)=>{
            console.log(response)
            this.setState({
                alternateStockList: response
            })
        }).then(data => {
            let symbolArray = []
            this.state.alternateStockList.forEach((item) =>
                {
                    console.log(item)
                    symbolArray.push(item.symbol)
                }
            )
            
            if(symbolArray.length > 0)
            {
                const symbols = symbolArray.join();
                this.getLatestQuote(symbols).then((data)=>{
                    this.state.alternateStockList.forEach((item) =>
                   
                    { console.log(item)
                        let stockInvestment =
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
                                            change: data[item.symbol].quote.latestPrice*item.purchaseQty - item.totalPrice,
                                        };
                                        stockInvestmentList.push(stockInvestment)
                    }
                    
                )
               console.log(stockInvestmentList)
                }).then(() => Promise.all(stockInvestmentList)).then((values) => this.setState({alternateWithCurrentValueList:values}))
            }
        })
    }

     componentDidMount () {
        this.getData()
        API.get(this.props.investmentId, this.state.loggedInUserId, "investments").then(response => {console.log(response); this.setState({
               investment : response
        })})
     }
      
    render(){
        
        return (
            <>
            <h5>Alternate Routes for {this.state.investment.symbol}</h5>

            <Table striped size="sm">
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
                   {this.state.alternateWithCurrentValueList.map(alternate => {
                       return (<tr>
                           <td><Link to={`/portfolio/${alternate.symbol}`}>{alternate.symbol}</Link></td>
                           <td>{alternate.stockName}</td>
                           <td className="text-right"><NumberFormat value={alternate.purchasePrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></td>
                           <td className="text-right"><NumberFormat value={alternate.purchaseQty} displayType={'text'} thousandSeparator={true} decimalScale={2}/></td>
                           <td className="text-right"><NumberFormat value={alternate.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></td>
                           <td className="text-right"><NumberFormat value={alternate.latestPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></td>
                           <td className="text-right"><NumberFormat value={alternate.totalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></td>   
                           <td className="text-right"><NumberFormat value={alternate.change} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/></td>                          
                           <td className="text-right">{moment(alternate.purchaseDate).format("lll")}</td>
                       </tr>)
                   })}
                </tbody>
            </Table>
           
            </>

        

        
        )
    }
} 

export default AlternateStock