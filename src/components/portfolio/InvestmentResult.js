import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {Table} from 'reactstrap'
import API from '../../modules/API.Manager'


class InvestmentResult extends Component {
    state = {
        investments: []
    }

    
    getData = () => {
        API.getAll("Investments").then(data => {
            console.table(data)
            this.setState({
                investments: data
            })
        })
    }

    componentDidMount(){
        
        this.getData()
    }
    
    render(){
        return (
            <Table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Open Price</th>
                    <th>Qty</th>
                    <th>Purchase Amount</th>
                    <th>Purchase Date</th>
                </tr>
                </thead>
                <tbody>
                   {this.state.investments.map(investment => {
                       return (<tr>
                           <td><Link>{investment.symbol}</Link></td>
                           <td>{investment.stockName}</td>
                           <td>$ {investment.purchasePrice}</td>
                           <td>{investment.purchaseQty}</td>
                           <td>$ {investment.totalPrice}</td>
                           <td>{moment(investment.purchaseDate).format("ll")}</td>
                       </tr>)
                   })}
                </tbody>
            </Table>
        )
} 
}

export default InvestmentResult